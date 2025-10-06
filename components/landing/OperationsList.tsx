'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MissionDetailsModal from './MissionDetailsModal';
import { simpleMissionService } from '@/lib/simpleMissionService';
import { getCurrentUser } from '@/lib/wallet/utils';
import { appStore } from '@/lib/store';
import Link from 'next/link';

interface Mission {
  code: string;
  description: string;
  status: string;
  priority: string;
  eta: string;
  teamSize: number;
  progress: number;
  type: string;
  location: string;
  difficulty: string;
  id: string;
  points_reward?: number;
  user_status?: 'available' | 'joined' | 'completed';
}

// Danh sách nhiệm vụ mẫu với nhiều loại khác nhau
const MISSION_TEMPLATES = [
  // Intelligence Operations
  { code: 'Omega', description: 'Track high-value target in Eastern Europe', type: 'Intelligence', location: 'Eastern Europe', difficulty: 'High' },
  { code: 'n0va', description: 'Infiltrate cybercrime network in Seoul', type: 'Cyber', location: 'Seoul', difficulty: 'Critical' },
  { code: 'gh0stline', description: 'Monitor rogue agent communications in Berlin', type: 'Surveillance', location: 'Berlin', difficulty: 'Medium' },
  { code: '5ilentfire', description: 'Intercept illegal arms trade in Libya', type: 'Interception', location: 'Libya', difficulty: 'High' },
  { code: 'ir0nwing', description: 'Support covert extraction in South America', type: 'Extraction', location: 'South America', difficulty: 'Critical' },
  
  // Cyber Operations
  { code: 'Phantom', description: 'Penetrate corporate espionage network', type: 'Cyber', location: 'Global', difficulty: 'High' },
  { code: 'Shadow', description: 'Disrupt terrorist communication channels', type: 'Cyber', location: 'Middle East', difficulty: 'Critical' },
  { code: 'Viper', description: 'Extract classified data from secure servers', type: 'Cyber', location: 'Moscow', difficulty: 'High' },
  { code: 'Raven', description: 'Monitor dark web marketplace activities', type: 'Cyber', location: 'Dark Web', difficulty: 'Medium' },
  
  // Surveillance Operations
  { code: 'Eagle', description: 'Track international arms dealer movements', type: 'Surveillance', location: 'Geneva', difficulty: 'High' },
  { code: 'Falcon', description: 'Monitor diplomatic communications', type: 'Surveillance', location: 'UN Headquarters', difficulty: 'Medium' },
  { code: 'Hawk', description: 'Observe suspected terrorist cell activities', type: 'Surveillance', location: 'Paris', difficulty: 'Critical' },
  
  // Extraction Operations
  { code: 'Wolf', description: 'Extract defector from hostile territory', type: 'Extraction', location: 'North Korea', difficulty: 'Critical' },
  { code: 'Bear', description: 'Rescue captured operative', type: 'Extraction', location: 'Syria', difficulty: 'High' },
  { code: 'Lion', description: 'Evacuate compromised safe house', type: 'Extraction', location: 'Istanbul', difficulty: 'Medium' },
  
  // Intelligence Gathering
  { code: 'Fox', description: 'Gather intel on nuclear program', type: 'Intelligence', location: 'Tehran', difficulty: 'Critical' },
  { code: 'Tiger', description: 'Infiltrate organized crime syndicate', type: 'Intelligence', location: 'Naples', difficulty: 'High' },
  { code: 'Panther', description: 'Collect evidence on corruption network', type: 'Intelligence', location: 'Bangkok', difficulty: 'Medium' },
  
  // Counter-Intelligence
  { code: 'Scorpion', description: 'Counter foreign intelligence operations', type: 'Counter-Intel', location: 'Washington DC', difficulty: 'High' },
  { code: 'Cobra', description: 'Identify double agents in organization', type: 'Counter-Intel', location: 'London', difficulty: 'Critical' },
  { code: 'Python', description: 'Secure compromised communication lines', type: 'Counter-Intel', location: 'Tokyo', difficulty: 'Medium' }
];

const OperationsList = () => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [user, setUser] = useState(getCurrentUser());
  const [userPoints, setUserPoints] = useState(0);
  const [walletState, setWalletState] = useState(appStore.getState().wallet);
  const [isClient, setIsClient] = useState(false);
  
  // Real-time data states
  const [liveStats, setLiveStats] = useState({
    totalMissions: 0,
    activeMissions: 0,
    completedMissions: 0,
    successRate: 0
  });
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Tạo nhiệm vụ ngẫu nhiên từ template
  const generateRandomMission = (template: { code: string; description: string; type: string; location: string; difficulty: string }): Mission => {
    const statuses = ['active', 'pending', 'completed'];
    const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const etas = ['2h', '6h', '12h', '24h', '48h', '72h'];
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const eta = etas[Math.floor(Math.random() * etas.length)];
    const teamSize = Math.floor(Math.random() * 6) + 2; // 2-7 members
    const progress = status === 'completed' ? 100 : Math.floor(Math.random() * 80) + 10; // 10-90% for active/pending
    
    return {
      code: template.code,
      description: template.description,
      type: template.type,
      location: template.location,
      difficulty: template.difficulty,
      status,
      priority,
      eta,
      teamSize,
      progress,
      id: `${template.code}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  };

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
  }, []);

  // Real-time updates
  useEffect(() => {
    if (!isClient) return;

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Update stats every 5 seconds
    const statsInterval = setInterval(() => {
      setIsUpdating(true);
      
      setLiveStats(() => ({
        totalMissions: missions.length,
        activeMissions: missions.filter(m => m.status === 'active').length,
        completedMissions: missions.filter(m => m.status === 'completed').length,
        successRate: missions.length > 0 ? Math.round((missions.filter(m => m.status === 'completed').length / missions.length) * 100) : 0
      }));

      // Simulate mission progress updates
      setMissions(prev => prev.map(mission => {
        if (mission.status === 'active' && mission.progress < 100) {
          const newProgress = Math.min(100, mission.progress + Math.floor(Math.random() * 3));
          return {
            ...mission,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : mission.status
          };
        }
        return mission;
      }));

      setTimeout(() => setIsUpdating(false), 1000);
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, [isClient, missions]);

  // Tạo danh sách nhiệm vụ ngẫu nhiên
  const generateRandomMissions = useCallback((count: number = 8): Mission[] => {
    if (!isClient) return [];
    const shuffledTemplates = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5);
    return shuffledTemplates.slice(0, count).map(template => generateRandomMission(template));
  }, [isClient]);


  // Load user data and missions
  useEffect(() => {
    if (!isClient) return;
    
    const loadUserData = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      
      if (currentUser) {
        // Sync user data from database first
        await simpleMissionService.syncUserFromDatabase();
        
        // Then get points
        const points = await simpleMissionService.getUserPoints();
        setUserPoints(points);
      }
    };
    
    loadUserData();
  }, [isClient]);

  // Subscribe to store changes - optimized to prevent unnecessary API calls
  useEffect(() => {
    const unsubscribe = appStore.subscribe((state) => {
      setWalletState(state.wallet);
      
      // Only reload user data when wallet connection status actually changes
      if (state.wallet.isConnected && !walletState.isConnected) {
        // Wallet just connected
        const currentUser = getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          simpleMissionService.getUserPoints().then(setUserPoints);
        }
      } else if (!state.wallet.isConnected && walletState.isConnected) {
        // Wallet just disconnected
        setUser(null);
        setUserPoints(0);
      }
    });
    
    return unsubscribe;
  }, [walletState.isConnected]); // Add dependency to prevent unnecessary re-subscriptions

  // Load missions from database
  useEffect(() => {
    const loadMissions = async () => {
      try {
        // Get joined missions from localStorage
        const joinedMissions = JSON.parse(localStorage.getItem('joinedMissions') || '[]');
        
        // Try to get missions from database first
        const dbMissions = await simpleMissionService.getMissionsFromDatabase();
        
        if (dbMissions.length > 0) {
          // Convert database missions to UI format
          const uiMissions: Mission[] = dbMissions.map(dbMission => ({
            id: dbMission.code, // Use code as ID for simplicity
            code: dbMission.code,
            description: dbMission.description,
            type: dbMission.type,
            location: dbMission.location,
            difficulty: dbMission.difficulty,
            points_reward: dbMission.points_reward,
            status: 'active',
            priority: dbMission.difficulty === 'Critical' ? 'CRITICAL' : 
                     dbMission.difficulty === 'High' ? 'HIGH' : 'MEDIUM',
            eta: dbMission.points_reward >= 3 ? '5m' : 
                 dbMission.points_reward >= 2 ? '3m' : '1m',
            teamSize: dbMission.points_reward >= 3 ? 1 : 1, // Solo missions
            progress: 0, // Chưa bắt đầu
            user_status: joinedMissions.includes(dbMission.code) ? 'completed' : 'available'
          }));
          
          setMissions(uiMissions); // Hiển thị tất cả missions từ database
        } else {
          // Fallback to sample missions if database is empty
          const sampleMissions = simpleMissionService.getSampleMissions();
          const uiMissions: Mission[] = sampleMissions.map(sampleMission => ({
            id: sampleMission.code,
            code: sampleMission.code,
            description: sampleMission.description,
            type: sampleMission.type,
            location: sampleMission.location,
            difficulty: sampleMission.difficulty,
            points_reward: sampleMission.points_reward,
            status: 'active',
            priority: 'HIGH',
            eta: '1m',
            teamSize: 1,
            progress: 0,
            user_status: joinedMissions.includes(sampleMission.code) ? 'completed' : 'available'
          }));
          
          setMissions(uiMissions);
        }
      } catch (error) {
        console.error('Error loading missions:', error);
        // Fallback to generated missions
        setMissions(generateRandomMissions(1));
      }
    };
    
    loadMissions();
  }, [generateRandomMissions]);

  // Tắt auto-refresh vì chỉ có 1 mission đơn giản
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Không cần auto-refresh cho mission đơn giản
  //   }, 15000);
  //   return () => clearInterval(interval);
  // }, []);

  // Listen for live data updates
  useEffect(() => {
    const handleDataUpdate = () => {
      setMissions(prev => prev.map(mission => ({
        ...mission,
        progress: Math.min(100, mission.progress + Math.floor(Math.random() * 5))
      })));
    };

    const handleTimeRangeChange = (event: CustomEvent) => {
      // Update missions based on time range
      const { range } = event.detail;
      setMissions(prev => prev.map(mission => ({
        ...mission,
        eta: range === '1d' ? `${Math.floor(Math.random() * 24)}h` : 
             range === '1w' ? `${Math.floor(Math.random() * 7)}d` : 
             `${Math.floor(Math.random() * 30)}d`,
        priority: range === '1d' ? 'CRITICAL' : 
                  range === '1w' ? 'HIGH' : 'MEDIUM'
      })));
    };

    window.addEventListener('dataUpdate', handleDataUpdate);
    window.addEventListener('timeRangeChange', handleTimeRangeChange as EventListener);
    
    return () => {
      window.removeEventListener('dataUpdate', handleDataUpdate);
      window.removeEventListener('timeRangeChange', handleTimeRangeChange as EventListener);
    };
  }, []);

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };

  const handleJoinMission = async (mission: Mission) => {
    console.log('🎯 Join Mission clicked for:', mission.code);
    console.log('User:', user);
    
    if (!user) {
      alert('Please connect your wallet first to join missions!');
      return;
    }

    try {
      console.log('Attempting to join mission:', mission.code);
      // Join mission and get points immediately
      const success = await simpleMissionService.joinMission(mission.code);
      
      if (success) {
        // Update user points immediately
        const newPoints = await simpleMissionService.getUserPoints();
        setUserPoints(newPoints);
        
        // Update mission status to completed immediately
        setMissions(prev => prev.map(m => 
          m.code === mission.code 
            ? { ...m, status: 'completed', user_status: 'completed' }
            : m
        ));
        
        console.log(`✅ Mission ${mission.code} completed! Earned ${mission.points_reward || 1} points immediately!`);
        
        // Show success notification
        alert(`🎉 Mission ${mission.code} completed!\n💰 Earned ${mission.points_reward} points!\n📊 Total points: ${newPoints}`);
      } else {
        alert('Failed to join mission. You may have already joined this mission.');
      }
    } catch (error) {
      console.error('Error joining mission:', error);
      alert('Failed to join mission. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-accent-red';
      case 'pending': return 'text-yellow-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass-effect rounded-lg p-6 card-hover relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-red-500/5 opacity-30"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-red-500/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-lg"></div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-white font-mono tracking-wider bg-gradient-to-r from-cyan-400 to-red-400 bg-clip-text text-transparent">
                MISSION CONTROL CENTER
              </h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-yellow-400 animate-pulse' : 'bg-green-400 animate-pulse'}`}></div>
                <span className={`text-xs font-mono ${isUpdating ? 'text-yellow-400' : 'text-green-400'}`}>
                  {isUpdating ? 'UPDATING...' : 'LIVE'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {user && (
                <div className="flex items-center space-x-2 bg-dark-card/50 px-3 py-1 rounded-lg border border-green-500/30">
                  <span className="text-xs text-gray-400 font-mono">Points:</span>
                  <span className="text-sm text-green-400 font-mono font-bold animate-pulse">{userPoints}</span>
                </div>
              )}
              
              {isClient && currentTime && (
                <div className="text-xs text-gray-400 font-mono">
                  {currentTime.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Live Stats Dashboard */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-dark-card/30 border border-cyan-500/30 rounded-lg p-3 text-center hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-2xl font-bold text-cyan-400 font-mono">{liveStats.totalMissions}</div>
              <div className="text-xs text-gray-400 font-mono">Total Missions</div>
            </div>
            <div className="bg-dark-card/30 border border-yellow-500/30 rounded-lg p-3 text-center hover:border-yellow-400/50 transition-all duration-300">
              <div className="text-2xl font-bold text-yellow-400 font-mono">{liveStats.activeMissions}</div>
              <div className="text-xs text-gray-400 font-mono">Active</div>
            </div>
            <div className="bg-dark-card/30 border border-green-500/30 rounded-lg p-3 text-center hover:border-green-400/50 transition-all duration-300">
              <div className="text-2xl font-bold text-green-400 font-mono">{liveStats.completedMissions}</div>
              <div className="text-xs text-gray-400 font-mono">Completed</div>
            </div>
            <div className="bg-dark-card/30 border border-red-500/30 rounded-lg p-3 text-center hover:border-red-400/50 transition-all duration-300">
              <div className="text-2xl font-bold text-red-400 font-mono">{liveStats.successRate}%</div>
              <div className="text-xs text-gray-400 font-mono">Success Rate</div>
            </div>
          </div>

          <p className="text-gray-400 text-sm font-mono mb-3 bg-dark-card/20 px-4 py-2 rounded-lg border border-gray-700/50">
            🎯 Click &quot;Join Mission&quot; to earn points instantly! Missions sorted by reward points.
          </p>
        
        {/* Sort Controls - Hidden vì chỉ có 1 mission */}
        {/* <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs text-gray-500 font-mono">Sort by:</span>
          <div className="flex space-x-1">
            {['random', 'priority', 'progress', 'eta'].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSortOrder(option as any);
                  setMissions(prev => sortMissions(prev, option));
                }}
                className={`px-2 py-1 text-xs rounded transition-all duration-200 font-mono ${
                  sortOrder === option
                    ? 'bg-accent-red text-white'
                    : 'bg-dark-border text-gray-400 hover:bg-dark-border/80 hover:text-white'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div> */}
      </div>
      
      <div className="space-y-4">
        {missions.map((mission, index) => (
          <div 
            key={index} 
            className="bg-dark-card/50 border border-dark-border rounded-lg p-4 hover:border-accent-red/50 transition-all duration-500 hover:shadow-lg hover:shadow-accent-red/10 hover:-translate-y-1 group relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Animated background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-accent-red/10 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 font-mono">Mission Code:</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(mission.status)} pulse-glow`}></div>
                  <span className={`text-sm font-mono font-semibold ${getStatusColor(mission.status)}`}>
                    {mission.code}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 font-mono">{mission.type}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-accent-red rounded-full"></div>
                  <div className="w-1 h-1 bg-accent-orange rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Mission Type and Location */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500 font-mono">Type: <span className="text-cyan-400">{mission.type}</span></span>
                <span className="text-xs text-gray-500 font-mono">Location: <span className="text-blue-400">{mission.location}</span></span>
              </div>
              <span className="text-xs text-gray-500 font-mono">Difficulty: <span className="text-yellow-400">{mission.difficulty}</span></span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {mission.description}
            </p>
            
            {/* Enhanced Progress indicator */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span className="font-mono">Mission Progress</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold">{mission.progress}%</span>
                  {mission.progress === 100 && (
                    <span className="text-green-400 animate-pulse">✓</span>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${
                      mission.progress === 100 
                        ? 'bg-gradient-to-r from-green-500 to-green-400' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
                    style={{ width: `${mission.progress}%` }}
                  >
                    <div className="h-full bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                {mission.progress > 0 && mission.progress < 100 && (
                  <div className="absolute top-0 right-0 w-1 h-2 bg-white rounded-full animate-ping"></div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleMissionClick(mission)}
                className="flex-1 bg-dark-border hover:bg-dark-border/80 text-white text-xs py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 border border-gray-600 hover:border-cyan-400/50 font-mono"
              >
                📋 Details
              </button>
              <button 
                onClick={() => handleJoinMission(mission)}
                disabled={mission.user_status === 'joined' || mission.user_status === 'completed'}
                className={`flex-1 text-white text-xs py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg font-mono ${
                  mission.user_status === 'completed'
                    ? 'bg-green-600 cursor-not-allowed border border-green-500'
                    : mission.user_status === 'joined'
                    ? 'bg-yellow-600 cursor-not-allowed border border-yellow-500'
                    : 'bg-accent-red hover:bg-accent-red/80 glow-effect border border-red-500 hover:border-red-400 hover:shadow-red-500/20'
                }`}
              >
                {mission.user_status === 'completed' 
                  ? '✅ Completed' 
                  : mission.user_status === 'joined'
                  ? '⏳ In Progress...'
                  : '🚀 Join Mission >>>'
                }
              </button>
            </div>
            
            {/* Enhanced Additional info */}
            <div className="mt-4 pt-4 border-t border-dark-border/50">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-mono">Priority:</span>
                  <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                    mission.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    mission.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    mission.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {mission.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-mono">ETA:</span>
                  <span className="text-xs text-green-400 font-mono font-bold bg-green-500/10 px-2 py-1 rounded border border-green-500/30">
                    {mission.eta}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-mono">Team:</span>
                  <span className="text-xs text-blue-400 font-mono font-bold bg-blue-500/10 px-2 py-1 rounded border border-blue-500/30">
                    {mission.teamSize} agents
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-mono">ID:</span>
                  <span className="text-xs text-gray-400 font-mono bg-gray-500/10 px-2 py-1 rounded border border-gray-500/30">
                    {mission.id.slice(-8)}
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
      
        <div className="mt-8 flex justify-between items-center bg-dark-card/20 p-4 rounded-lg border border-gray-700/50">
          <button 
            onClick={async () => {
              // Reload missions from database
              try {
                const joinedMissions = JSON.parse(localStorage.getItem('joinedMissions') || '[]');
                const dbMissions = await simpleMissionService.getMissionsFromDatabase();
                if (dbMissions.length > 0) {
                  const uiMissions: Mission[] = dbMissions.map(dbMission => ({
                    id: dbMission.code,
                    code: dbMission.code,
                    description: dbMission.description,
                    type: dbMission.type,
                    location: dbMission.location,
                    difficulty: dbMission.difficulty,
                    points_reward: dbMission.points_reward,
                    status: 'active',
                    priority: dbMission.difficulty === 'Critical' ? 'CRITICAL' : 
                             dbMission.difficulty === 'High' ? 'HIGH' : 'MEDIUM',
                    eta: dbMission.points_reward >= 3 ? '5m' : 
                         dbMission.points_reward >= 2 ? '3m' : '1m',
                    teamSize: 1,
                    progress: 0,
                    user_status: joinedMissions.includes(dbMission.code) ? 'completed' : 'available'
                  }));
                  setMissions(uiMissions);
                }
              } catch (error) {
                console.error('Error reloading missions:', error);
              }
            }}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-all duration-300 font-mono px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            🔄 Reload Missions
          </button>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => {
                // Reset joined missions for testing
                localStorage.removeItem('joinedMissions');
                // Reload missions to update status
                window.location.reload();
              }}
              className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 hover:text-white text-sm font-semibold transition-all duration-300 font-mono px-4 py-2 rounded-lg border border-gray-500/30 hover:border-gray-400/50"
            >
              🔄 Reset Missions
            </button>
            
            <Link 
              href="/leaderboard"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 text-sm font-semibold transition-all duration-300 font-mono px-4 py-2 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20"
            >
              🏆 Leaderboard
            </Link>
            
            <Link 
              href="/docs"
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-all duration-300 font-mono px-4 py-2 rounded-lg border border-blue-500/30 hover:border-blue-400/50"
            >
              📚 Docs
            </Link>
            
            <Link 
              href="/traffic-agent"
              className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-all duration-300 font-mono px-4 py-2 rounded-lg border border-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
            >
              🎮 AMC Control
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Details Modal */}
      <MissionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mission={selectedMission}
        onMissionCompleted={() => {
          // Update user points when mission is completed from modal
          simpleMissionService.getUserPoints().then(setUserPoints);
          
          // Update mission status
          setMissions(prev => prev.map(m => 
            m.code === selectedMission?.code 
              ? { ...m, status: 'completed', user_status: 'completed' }
              : m
          ));
        }}
      />
    </div>
  );
};

export default OperationsList;
