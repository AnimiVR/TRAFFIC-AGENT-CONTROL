import { getCurrentUser } from './wallet/utils';
import { supabase } from './simpleSupabase';

export interface SimpleMission {
  code: string;
  description: string;
  type: string;
  location: string;
  difficulty: string;
  points_reward: number;
}

export class SimpleMissionService {
  private static instance: SimpleMissionService;
  
  public static getInstance(): SimpleMissionService {
    if (!SimpleMissionService.instance) {
      SimpleMissionService.instance = new SimpleMissionService();
    }
    return SimpleMissionService.instance;
  }

  /**
   * Get missions from database
   * Lấy tất cả missions từ Supabase
   */
  async getMissionsFromDatabase(): Promise<SimpleMission[]> {
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('code, description, type, location, difficulty, points_reward')
        .eq('status', 'active')
        .order('points_reward', { ascending: false });

      if (error) {
        console.error('Error fetching missions from database:', error);
        return this.getFallbackMissions();
      }

      return data || this.getFallbackMissions();
    } catch (error) {
      console.error('Error fetching missions:', error);
      return this.getFallbackMissions();
    }
  }

  /**
   * Get sample missions (fallback if database fails)
   * Chỉ có một mission đơn giản làm fallback
   */
  getSampleMissions(): SimpleMission[] {
    return this.getFallbackMissions();
  }

  /**
   * Fallback missions khi không kết nối được database
   */
  private getFallbackMissions(): SimpleMission[] {
    return [
      { 
        code: 'CLICK_MISSION', 
        description: 'Click vào nút Join Mission để nhận điểm', 
        type: 'Intelligence', 
        location: 'Website', 
        difficulty: 'Medium', 
        points_reward: 1 
      }
    ];
  }

  /**
   * Join a mission (simplified - no database)
   * Now awards points immediately upon joining
   */
  async joinMission(missionCode: string): Promise<boolean> {
    try {
      console.log('🔍 SimpleMissionService.joinMission called with code:', missionCode);
      const user = getCurrentUser();
      console.log('Current user:', user);
      
      if (!user) {
        console.error('No user logged in');
        return false;
      }

      // Check if mission exists in database first, then fallback to sample
      let missions = await this.getMissionsFromDatabase();
      let mission = missions.find(m => m.code === missionCode);
      
      // If not found in database, try sample missions
      if (!mission) {
        missions = this.getSampleMissions();
        mission = missions.find(m => m.code === missionCode);
      }
      
      if (!mission) {
        console.error('Mission not found:', missionCode);
        return false;
      }

      // Check if user already joined this mission
      const joinedMissions = JSON.parse(localStorage.getItem('joinedMissions') || '[]');
      if (joinedMissions.includes(missionCode)) {
        console.log('User already joined this mission:', missionCode);
        return false;
      }

      // Get current user points from database
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('total_points, experience_points')
        .eq('id', user.id)
        .single();

      if (userDataError || !userData) {
        console.error('Error fetching user data:', userDataError);
        return false;
      }

      const currentPoints = userData.total_points || 0;
      const newPoints = currentPoints + mission.points_reward;
      
      // Update user points in Supabase database
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          total_points: newPoints,
          experience_points: newPoints 
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating user points in database:', updateError);
        return false;
      }
      
      // Update user points in localStorage
      const updatedUser = { ...user, total_points: newPoints };
      localStorage.setItem('traffic_agent_user', JSON.stringify(updatedUser));
      
      // Track joined mission
      joinedMissions.push(missionCode);
      localStorage.setItem('joinedMissions', JSON.stringify(joinedMissions));
      
      console.log('✅ Mission found:', mission);
      console.log(`✅ Mission joined successfully! Earned ${mission.points_reward} points immediately!`);
      console.log(`💰 Total points: ${currentPoints} → ${newPoints}`);
      
      // Debug: Check localStorage after update
      const debugUser = JSON.parse(localStorage.getItem('traffic_agent_user') || '{}');
      console.log('🔍 Updated user in localStorage:', debugUser);
      console.log('🔍 Updated total_points:', debugUser.total_points);
      
      return true;
    } catch (error) {
      console.error('Error joining mission:', error);
      return false;
    }
  }

  /**
   * Complete a mission (simplified - no database)
   */
  async completeMission(missionCode: string): Promise<boolean> {
    try {
      console.log('🔍 SimpleMissionService.completeMission called with code:', missionCode);
      const user = getCurrentUser();
      
      if (!user) {
        console.error('No user logged in');
        return false;
      }

      // Find mission points from database first, then fallback to sample
      let missions = await this.getMissionsFromDatabase();
      let mission = missions.find(m => m.code === missionCode);
      
      // If not found in database, try sample missions
      if (!mission) {
        missions = this.getSampleMissions();
        mission = missions.find(m => m.code === missionCode);
      }
      
      if (!mission) {
        console.error('Mission not found:', missionCode);
        return false;
      }

      console.log(`✅ Mission ${missionCode} completed! Earned ${mission.points_reward} points (simplified)`);
      return true;
    } catch (error) {
      console.error('Error completing mission:', error);
      return false;
    }
  }

  /**
   * Sync user data from database to localStorage
   */
  async syncUserFromDatabase(): Promise<void> {
    try {
      const user = getCurrentUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('users')
        .select('total_points, experience_points, level')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error syncing user from database:', error);
        return;
      }

      if (data) {
        // Update localStorage with latest data from database
        const updatedUser = { 
          ...user, 
          total_points: data.total_points || 0,
          experience_points: data.experience_points || 0,
          level: data.level || 1
        };
        localStorage.setItem('traffic_agent_user', JSON.stringify(updatedUser));
        console.log('✅ User data synced from database:', data);
      }
    } catch (error) {
      console.error('Error syncing user data:', error);
    }
  }

  /**
   * Get user points (from database with localStorage fallback)
   */
  async getUserPoints(): Promise<number> {
    try {
      const user = getCurrentUser();
      console.log('🔍 getUserPoints - Current user:', user);
      if (!user) {
        console.log('🔍 getUserPoints - No user found, returning 0');
        return 0;
      }

      // Get points from Supabase database
      const { data, error } = await supabase
        .from('users')
        .select('total_points')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user points from database:', error);
        // Fallback to localStorage
        const userData = JSON.parse(localStorage.getItem('traffic_agent_user') || '{}');
        const points = userData.total_points || 0;
        console.log('🔍 getUserPoints - Fallback to localStorage:', points);
        return points;
      }

      const points = data?.total_points || 0;
      console.log('🔍 getUserPoints - From database:', points);
      
      // Update localStorage with latest data
      const updatedUser = { ...user, total_points: points };
      localStorage.setItem('traffic_agent_user', JSON.stringify(updatedUser));
      
      return points;
    } catch (error) {
      console.error('Error getting user points:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const simpleMissionService = SimpleMissionService.getInstance();
