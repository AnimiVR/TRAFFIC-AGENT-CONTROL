import { supabase } from './simpleSupabase';
import { getCurrentUser } from './wallet/utils';

export interface MissionData {
  id: string;
  code: string;
  description: string;
  type: string;
  location: string;
  difficulty: string;
  points_reward: number;
  status: 'available' | 'in_progress' | 'completed';
  created_at?: string;
}

export interface UserMission {
  id?: string;
  user_id: string;
  mission_id: string;
  status: 'joined' | 'in_progress' | 'completed';
  points_earned: number;
  joined_at?: string;
  completed_at?: string;
}

export class MissionService {
  private static instance: MissionService;
  
  public static getInstance(): MissionService {
    if (!MissionService.instance) {
      MissionService.instance = new MissionService();
    }
    return MissionService.instance;
  }

  /**
   * Get all available missions
   */
  async getAvailableMissions(): Promise<MissionData[]> {
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching missions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching missions:', error);
      return [];
    }
  }

  /**
   * Join a mission by code
   */
  async joinMission(missionCode: string): Promise<boolean> {
    try {
      console.log('🔍 MissionService.joinMission called with code:', missionCode);
      const user = getCurrentUser();
      console.log('Current user:', user);
      
      if (!user) {
        console.error('No user logged in');
        return false;
      }

      // First, get the mission by code
      console.log('Looking for mission with code:', missionCode);
      const { data: mission, error: missionError } = await supabase
        .from('missions')
        .select('id')
        .eq('code', missionCode)
        .single();

      if (missionError || !mission) {
        console.error('Mission not found:', missionError);
        return false;
      }

      // Check if user already joined this mission
      const { data: existingMission, error: checkError } = await supabase
        .from('user_missions')
        .select('*')
        .eq('user_id', user.id)
        .eq('mission_id', mission.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing mission:', checkError);
        return false;
      }

      if (existingMission) {
        console.log('User already joined this mission');
        return false;
      }

      // Join the mission
      const { error } = await supabase
        .from('user_missions')
        .insert({
          user_id: user.id,
          mission_id: mission.id,
          status: 'joined',
          points_earned: 0
        });

      if (error) {
        console.error('Error joining mission:', error);
        return false;
      }

      console.log('✅ Mission joined successfully');
      return true;
    } catch (error) {
      console.error('Error joining mission:', error);
      return false;
    }
  }

  /**
   * Complete a mission and award points
   */
  async completeMission(missionCode: string): Promise<boolean> {
    try {
      const user = getCurrentUser();
      if (!user) {
        console.error('No user logged in');
        return false;
      }

      // Get mission details by code
      const { data: mission, error: missionError } = await supabase
        .from('missions')
        .select('*')
        .eq('code', missionCode)
        .single();

      if (missionError || !mission) {
        console.error('Error fetching mission:', missionError);
        return false;
      }

      // Update user mission status
      const { error: updateError } = await supabase
        .from('user_missions')
        .update({
          status: 'completed',
          points_earned: mission.points_reward,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('mission_id', mission.id);

      if (updateError) {
        console.error('Error updating mission status:', updateError);
        return false;
      }

      // Get current user data
      const { data: currentUser, error: userError } = await supabase
        .from('users')
        .select('total_points, experience_points')
        .eq('id', user.id)
        .single();

      if (userError || !currentUser) {
        console.error('Error fetching user data:', userError);
        return false;
      }

      // Update user's total points
      const { error: pointsError } = await supabase
        .from('users')
        .update({
          total_points: (currentUser.total_points || 0) + mission.points_reward,
          experience_points: (currentUser.experience_points || 0) + mission.points_reward
        })
        .eq('id', user.id);

      if (pointsError) {
        console.error('Error updating user points:', pointsError);
        return false;
      }

      // Add points transaction
      const { error: transactionError } = await supabase
        .from('points_transactions')
        .insert({
          user_id: user.id,
          mission_id: mission.id,
          amount: mission.points_reward,
          type: 'earned',
          description: `Completed mission: ${mission.code}`,
          metadata: {
            mission_type: mission.type,
            difficulty: mission.difficulty,
            timestamp: new Date().toISOString()
          }
        });

      if (transactionError) {
        console.error('Error adding points transaction:', transactionError);
        // Don't return false here, mission completion was successful
      }

      console.log(`✅ Mission completed! Earned ${mission.points_reward} points`);
      return true;
    } catch (error) {
      console.error('Error completing mission:', error);
      return false;
    }
  }

  /**
   * Get user's missions
   */
  async getUserMissions(): Promise<UserMission[]> {
    try {
      const user = getCurrentUser();
      if (!user) {
        return [];
      }

      const { data, error } = await supabase
        .from('user_missions')
        .select(`
          *,
          missions (
            code,
            description,
            type,
            location,
            difficulty,
            points_reward
          )
        `)
        .eq('user_id', user.id)
        .order('joined_at', { ascending: false });

      if (error) {
        console.error('Error fetching user missions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user missions:', error);
      return [];
    }
  }

  /**
   * Get user's total points
   */
  async getUserPoints(): Promise<number> {
    try {
      const user = getCurrentUser();
      if (!user) {
        return 0;
      }

      const { data, error } = await supabase
        .from('users')
        .select('total_points')
        .eq('id', user.id)
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
}

// Export singleton instance
export const missionService = MissionService.getInstance();
