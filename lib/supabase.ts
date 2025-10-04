import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Types for our database
export interface User {
  id: string;
  email?: string;
  wallet_address: string;
  username: string;
  avatar_url?: string;
  total_points: number;
  level: number;
  experience_points: number;
  created_at: string;
  updated_at: string;
}

export interface Mission {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'Intelligence' | 'Cyber' | 'Surveillance' | 'Extraction' | 'Interception' | 'Counter-Intel';
  location: string;
  difficulty: 'Medium' | 'High' | 'Critical';
  base_points: number;
  max_participants: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  created_at: string;
  expires_at?: string;
}

export interface UserMission {
  id: string;
  user_id: string;
  mission_id: string;
  status: 'joined' | 'in_progress' | 'completed' | 'failed' | 'abandoned';
  points_earned: number;
  completion_time?: number;
  joined_at: string;
  started_at?: string;
  completed_at?: string;
}

export interface PointsTransaction {
  id: string;
  user_id: string;
  mission_id?: string;
  amount: number;
  type: 'earned' | 'spent' | 'bonus' | 'penalty' | 'refund';
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon_url?: string;
  points_required: number;
  mission_type?: string;
  condition_type: string;
  condition_value: number;
  is_active: boolean;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}
