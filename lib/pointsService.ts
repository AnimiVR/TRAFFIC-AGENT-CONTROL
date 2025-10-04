import { supabase } from './supabase';
import { walletAuthService } from './walletAuth';

export class PointsService {
  private static instance: PointsService;
  
  public static getInstance(): PointsService {
    if (!PointsService.instance) {
      PointsService.instance = new PointsService();
    }
    return PointsService.instance;
  }

  /**
   * Get user's current points
   */
  async getUserPoints(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('total_points')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user points:', error);
        return 0;
      }

      return data.total_points || 0;
    } catch (error) {
      console.error('Error fetching user points:', error);
      return 0;
    }
  }

  /**
   * Get user's points transactions
   */
  async getUserTransactions(userId: string, limit: number = 10): Promise<unknown[]> {
    try {
      const { data, error } = await supabase
        .from('points_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching user transactions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      return [];
    }
  }

  /**
   * Add points to user
   */
  async addPoints(
    userId: string, 
    amount: number, 
    type: 'earned' | 'bonus' | 'refund' = 'earned',
    description: string,
    missionId?: string
  ): Promise<boolean> {
    try {
      // Get current user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('total_points, experience_points')
        .eq('id', userId)
        .single();

      if (userError || !userData) {
        console.error('Error fetching user data:', userError);
        return false;
      }

      // Update user's total points
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          total_points: (userData.total_points || 0) + amount,
          experience_points: (userData.experience_points || 0) + amount
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating user points:', updateError);
        return false;
      }

      // Add transaction record
      const { error: transactionError } = await supabase
        .from('points_transactions')
        .insert({
          user_id: userId,
          mission_id: missionId,
          amount: amount,
          type: type,
          description: description,
          metadata: {
            timestamp: new Date().toISOString(),
            source: 'points_service'
          }
        });

      if (transactionError) {
        console.error('Error adding points transaction:', transactionError);
        return false;
      }

      // Update local session if current user
      const currentUser = walletAuthService.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, total_points: currentUser.total_points + amount };
        // Update session
        const sessionData = localStorage.getItem('wallet_session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          session.user = updatedUser;
          localStorage.setItem('wallet_session', JSON.stringify(session));
        }
      }

      return true;
    } catch (error) {
      console.error('Error adding points:', error);
      return false;
    }
  }

  /**
   * Get leaderboard data
   */
  async getLeaderboard(limit: number = 10): Promise<unknown[]> {
    try {
      const { data, error } = await supabase
        .from('leaderboards')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  /**
   * Check and award achievements
   */
  async checkAchievements(userId: string): Promise<void> {
    try {
      // Get user data
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError || !user) {
        console.error('Error fetching user for achievements:', userError);
        return;
      }

      // Get user's completed missions count
      const { data: missions, error: missionsError } = await supabase
        .from('user_missions')
        .select('mission_id')
        .eq('user_id', userId)
        .eq('status', 'completed');

      if (missionsError) {
        console.error('Error fetching user missions:', missionsError);
        return;
      }

      const completedMissions = missions?.length || 0;

      // Get all achievements
      const { data: achievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true);

      if (achievementsError || !achievements) {
        console.error('Error fetching achievements:', achievementsError);
        return;
      }

      // Get user's existing achievements
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', userId);

      if (userAchievementsError) {
        console.error('Error fetching user achievements:', userAchievementsError);
        return;
      }

      const existingAchievementIds = userAchievements?.map(ua => ua.achievement_id) || [];

      // Check each achievement
      for (const achievement of achievements) {
        if (existingAchievementIds.includes(achievement.id)) {
          continue; // Already earned
        }

        let shouldAward = false;

        switch (achievement.condition_type) {
          case 'points':
            shouldAward = user.total_points >= achievement.condition_value;
            break;
          case 'missions_completed':
            shouldAward = completedMissions >= achievement.condition_value;
            break;
          case 'level':
            shouldAward = user.level >= achievement.condition_value;
            break;
        }

        if (shouldAward) {
          // Award achievement
          const { error: awardError } = await supabase
            .from('user_achievements')
            .insert({
              user_id: userId,
              achievement_id: achievement.id
            });

          if (!awardError) {
            console.log(`🎉 Achievement earned: ${achievement.name}`);
            
            // Show notification
            const event = new CustomEvent('showNotification', {
              detail: {
                type: 'achievement',
                title: '🏆 Achievement Unlocked!',
                message: achievement.name,
                description: achievement.description,
                duration: 7000,
                icon: achievement.icon_url || '🏆'
              }
            });
            window.dispatchEvent(event);
          }
        }
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }
}

// Export singleton instance
export const pointsService = PointsService.getInstance();
