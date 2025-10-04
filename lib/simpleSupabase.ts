import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SimpleUser {
  id?: string;
  wallet_address: string;
  username: string;
  created_at?: string;
}

export class SimpleSupabaseService {
  private static instance: SimpleSupabaseService;
  
  public static getInstance(): SimpleSupabaseService {
    if (!SimpleSupabaseService.instance) {
      SimpleSupabaseService.instance = new SimpleSupabaseService();
    }
    return SimpleSupabaseService.instance;
  }

  /**
   * Get user by wallet address
   */
  async getUserByWallet(walletAddress: string): Promise<SimpleUser | null> {
    try {
      console.log('Looking for user with wallet:', walletAddress);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress);

      if (error) {
        console.error('Error fetching user:', error);
        return null;
      }

      if (!data || data.length === 0) {
        console.log('No user found with this wallet address');
        return null;
      }

      console.log('✅ User found:', data[0]);
      return data[0];
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  /**
   * Create new user
   */
  async createUser(walletAddress: string, username: string): Promise<SimpleUser | null> {
    try {
      console.log('Creating new user with wallet:', walletAddress);
      console.log('Username:', username);
      
      const { data, error } = await supabase
        .from('users')
        .insert({
          wallet_address: walletAddress,
          username: username,
          total_points: 1, // Welcome point
          level: 1,
          experience_points: 1
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        return null;
      }

      console.log('✅ User created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  /**
   * Save user to local storage (simple session)
   */
  saveUserToLocalStorage(user: SimpleUser): void {
    localStorage.setItem('traffic_agent_user', JSON.stringify(user));
    console.log('✅ User saved to local storage');
  }

  /**
   * Get user from local storage
   */
  getUserFromLocalStorage(): SimpleUser | null {
    try {
      const userData = localStorage.getItem('traffic_agent_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      return null;
    }
  }

  /**
   * Clear user from local storage
   */
  clearUserFromLocalStorage(): void {
    localStorage.removeItem('traffic_agent_user');
    console.log('✅ User cleared from local storage');
  }
}

// Export singleton instance
export const simpleSupabaseService = SimpleSupabaseService.getInstance();
