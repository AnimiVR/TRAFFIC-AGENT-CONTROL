'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/simpleSupabase';
import { getCurrentUser } from '@/lib/wallet/utils';

interface LeaderboardUser {
  id: string;
  username: string;
  total_points: number;
  experience_points: number;
  level: number;
  created_at: string;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [sortBy, setSortBy] = useState<'total_points' | 'level' | 'created_at'>('total_points');
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');

  // Load leaderboard data
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('users')
          .select('id, username, total_points, experience_points, level, created_at')
          .order(sortBy, { ascending: false });

        // Apply time filter
        if (timeFilter !== 'all') {
          const now = new Date();
          let startDate: Date;
          
          if (timeFilter === 'week') {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          } else { // month
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          }
          
          query = query.gte('created_at', startDate.toISOString());
        }

        const { data, error } = await query.limit(50);

        if (error) {
          console.error('Error loading leaderboard:', error);
          return;
        }

        // Add rank to users
        const rankedUsers = data?.map((user, index) => ({
          ...user,
          rank: index + 1
        })) || [];

        setUsers(rankedUsers);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [sortBy, timeFilter]);

  // Get current user's rank
  const getCurrentUserRank = () => {
    if (!currentUser) return null;
    return users.find(user => user.id === currentUser.id);
  };

  const currentUserRank = getCurrentUserRank();

  // Get rank badge color
  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600';
    if (rank <= 10) return 'bg-gradient-to-r from-blue-400 to-blue-600';
    return 'bg-gradient-to-r from-gray-600 to-gray-800';
  };

  // Get rank icon
  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    if (rank <= 10) return '⭐';
    return '🎯';
  };

  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white font-mono tracking-wider">LEADERBOARD</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">LIVE</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-mono mb-4">Top agents by performance metrics</p>
        
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-mono">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-dark-border text-white text-xs px-2 py-1 rounded border border-gray-600"
            >
              <option value="total_points">Total Points</option>
              <option value="level">Level</option>
              <option value="created_at">Join Date</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-mono">Time:</span>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="bg-dark-border text-white text-xs px-2 py-1 rounded border border-gray-600"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Current User Rank */}
      {currentUserRank && (
        <div className="mb-6 p-4 bg-gradient-to-r from-accent-red/20 to-accent-orange/20 border border-accent-red/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getRankBadgeColor(currentUserRank.rank)}`}>
                {currentUserRank.rank}
              </div>
              <div>
                <div className="text-white font-semibold">Your Rank</div>
                <div className="text-gray-400 text-sm">{currentUserRank.total_points} points • Level {currentUserRank.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-accent-red font-mono text-lg font-bold">#{currentUserRank.rank}</div>
              <div className="text-gray-400 text-xs">{getRankIcon(currentUserRank.rank)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-accent-red border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-400 font-mono">Loading leaderboard...</span>
        </div>
      )}

      {/* Leaderboard Table */}
      {!loading && (
        <div className="space-y-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                user.id === currentUser?.id
                  ? 'bg-gradient-to-r from-accent-red/30 to-accent-orange/30 border border-accent-red/50'
                  : 'bg-dark-card/50 border border-dark-border hover:border-accent-red/30'
              }`}
            >
              {/* Rank & User Info */}
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getRankBadgeColor(user.rank)}`}>
                  {user.rank}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-red to-accent-orange rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {user.username ? user.username.charAt(0).toUpperCase() : 'A'}
                    </span>
                  </div>
                  
                  <div>
                    <div className="text-white font-semibold">
                      {user.username || `Agent ${user.id.slice(-6)}`}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Level {user.level} • Joined {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-accent-red font-mono font-bold text-lg">{user.total_points}</div>
                  <div className="text-gray-400 text-xs">Points</div>
                </div>
                
                <div className="text-center">
                  <div className="text-accent-orange font-mono font-bold">{user.experience_points}</div>
                  <div className="text-gray-400 text-xs">XP</div>
                </div>
                
                <div className="text-center">
                  <div className="text-green-400 font-mono font-bold">{user.level}</div>
                  <div className="text-gray-400 text-xs">Level</div>
                </div>

                <div className="text-right">
                  <div className="text-2xl">{getRankIcon(user.rank)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-dark-border">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="font-mono">Total Agents: {users.length}</span>
          <span className="font-mono">Last Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
