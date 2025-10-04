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

  // Tạo danh sách nhiệm vụ ngẫu nhiên
  const generateRandomMissions = useCallback((count: number = 8): Mission[] => {
    const shuffledTemplates = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5);
    return shuffledTemplates.slice(0, count).map(template => generateRandomMission(template));
  }, []);


  // Load user data and missions
  useEffect(() => {
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
  }, []);

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
    <div className="glass-effect rounded-lg p-6 card-hover">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white font-mono tracking-wider">MISSIONS ({missions.length})</h3>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-mono">Points:</span>
                <span className="text-xs text-green-400 font-mono font-bold">{userPoints}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-mono">READY</span>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-mono mb-3">Click &quot;Join Mission&quot; to earn points instantly! Missions sorted by reward points.</p>
        
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
          <div key={index} className="bg-dark-card/50 border border-dark-border rounded-lg p-4 hover:border-accent-red/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-red/10 hover:-translate-y-1">
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
            
            {/* Progress indicator */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{mission.progress}%</span>
              </div>
              <div className="progress-bar h-1">
                <div 
                  className="progress-fill" 
                  style={{ width: `${mission.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => handleMissionClick(mission)}
                className="flex-1 bg-dark-border hover:bg-dark-border/80 text-white text-xs py-2 px-3 rounded transition-all duration-200 hover:shadow-md"
              >
                Details
              </button>
              <button 
                onClick={() => handleJoinMission(mission)}
                disabled={mission.user_status === 'joined' || mission.user_status === 'completed'}
                className={`flex-1 text-white text-xs py-2 px-3 rounded transition-all duration-200 hover:shadow-md ${
                  mission.user_status === 'completed'
                    ? 'bg-green-600 cursor-not-allowed'
                    : mission.user_status === 'joined'
                    ? 'bg-yellow-600 cursor-not-allowed'
                    : 'bg-accent-red hover:bg-accent-red/80 glow-effect'
                }`}
              >
                {mission.user_status === 'completed' 
                  ? '✓ Completed' 
                  : mission.user_status === 'joined'
                  ? '⏳ In Progress...'
                  : 'Join Mission >>>'
                }
              </button>
            </div>
            
            {/* Additional info */}
            <div className="mt-3 pt-3 border-t border-dark-border">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span className="font-mono">Priority: <span className="text-accent-red">{mission.priority}</span></span>
                <span className="font-mono">ETA: <span className="text-green-400">{mission.eta}</span></span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span className="font-mono">Team Size: <span className="text-blue-400">{mission.teamSize} agents</span></span>
                <span className="font-mono">ID: <span className="text-gray-400">{mission.id.slice(-8)}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
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
          className="text-accent-red hover:text-accent-orange text-sm font-semibold transition-colors duration-200 font-mono"
        >
          Reload Missions &gt;&gt;&gt;
        </button>
        <div className="flex space-x-4">
          <button 
            onClick={() => {
              // Reset joined missions for testing
              localStorage.removeItem('joinedMissions');
              // Reload missions to update status
              window.location.reload();
            }}
            className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200 font-mono"
          >
            Reset Missions &gt;&gt;&gt;
          </button>
          
          <div className="flex space-x-4">
            <Link 
              href="/leaderboard"
              className="text-accent-red hover:text-accent-orange text-sm font-semibold transition-colors duration-200 font-mono"
            >
              View Leaderboard &gt;&gt;&gt;
            </Link>
            
            <Link 
              href="/docs"
              className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200 font-mono"
            >
              Read Docs &gt;&gt;&gt;
            </Link>
            
            <Link 
              href="/traffic-agent"
              className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200 font-mono"
            >
              Traffic Agent Control &gt;&gt;&gt;
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
