'use client';

import React, { useState, useEffect } from 'react';
import AgentDetailModal from './AgentDetailModal';
import AgentStatsPanel from './AgentStatsPanel';
import AgentTimeline from './AgentTimeline';
import WireframeAvatar from './WireframeAvatar';

interface Agent {
  id: string;
  name: string;
  initials: string;
  status: 'online' | 'busy' | 'offline';
  role: string;
  lastActive: string;
  missionsCompleted: number;
  successRate: number;
  missions: number; // Add missions property to match AgentStatsPanel
}

interface AgentDataOverviewProps {
  className?: string;
}

const AgentDataOverview: React.FC<AgentDataOverviewProps> = ({ className = '' }) => {
  // Generate random agent data with realistic avatars
  const generateRandomAgent = (): Agent => {
    const firstNames = ['John', 'Sarah', 'Robert', 'Emily', 'Michael', 'Jessica', 'David', 'Lisa', 'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Linda', 'Charles', 'Patricia', 'Thomas', 'Barbara', 'Christopher', 'Elizabeth', 'Daniel', 'Helen', 'Matthew', 'Sandra', 'Anthony', 'Donna', 'Mark', 'Carol', 'Donald', 'Ruth', 'Steven', 'Sharon', 'Paul', 'Michelle', 'Andrew', 'Laura', 'Joshua', 'Sarah', 'Kenneth', 'Kimberly', 'Kevin', 'Deborah', 'Brian', 'Dorothy', 'George', 'Lisa', 'Timothy', 'Nancy', 'Ronald', 'Karen'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const initials = `${firstName[0]}${lastName[0]}`;
    
    const roles = ['Senior Agent', 'Field Agent', 'Intelligence Analyst', 'Cyber Specialist', 'Counter Intelligence', 'Surveillance Expert', 'Data Analyst', 'Mission Coordinator', 'Security Specialist', 'Intelligence Officer', 'Field Operative', 'Technical Analyst', 'Strategic Planner', 'Risk Assessor', 'Intelligence Coordinator'];
    const statuses: ('online' | 'busy' | 'offline')[] = ['online', 'busy', 'offline'];
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    const missionsCompleted = Math.floor(Math.random() * 100) + 1;
    const successRate = Math.floor(Math.random() * 30) + 70; // 70-100%
    const missions = missionsCompleted + Math.floor(Math.random() * 20); // Total missions
    
    const lastActiveOptions = ['Just now', '2 min ago', '5 min ago', '10 min ago', '30 min ago', '1 hour ago', '2 hours ago', '4 hours ago', '8 hours ago', '1 day ago'];
    const lastActive = lastActiveOptions[Math.floor(Math.random() * lastActiveOptions.length)];
    
    return {
      id: `${initials}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: `${firstName} ${lastName}`,
      initials,
      status,
      role,
      lastActive,
      missionsCompleted,
      successRate,
      missions
    };
  };

  const [agents, setAgents] = useState<Agent[]>([]);

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [newAgentNotification, setNewAgentNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Generate initial agents
    const initialAgents = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, () => generateRandomAgent());
    setAgents(initialAgents);
  }, []);

  // Auto-generate new agents every 15 seconds
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      const newAgentCount = Math.floor(Math.random() * 5) + 1; // 1-5 new agents
      const newAgents = Array.from({ length: newAgentCount }, () => generateRandomAgent());
      
      setAgents(prev => {
        // Keep only the last 20 agents to prevent memory issues
        const updated = [...prev, ...newAgents];
        return updated.slice(-20);
      });

      // Show notification
      setNewAgentNotification(`${newAgentCount} new agent${newAgentCount > 1 ? 's' : ''} joined the network`);
      setTimeout(() => setNewAgentNotification(null), 3000);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        lastActive: 'Just now',
        status: agent.status === 'offline' ? 'online' : agent.status
      })));
      setIsRefreshing(false);
    }, 1500);
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleMoreOptions = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.1)_0%,transparent_50%)]"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        {/* New Agent Notification */}
        {newAgentNotification && (
          <div className="absolute top-4 right-4 z-50 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm border border-green-400 rounded-xl px-6 py-3 shadow-2xl animate-bounce">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
              <span className="text-white text-sm font-mono font-bold">{newAgentNotification}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white font-mono tracking-wider mb-2">
                <span className="bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent animate-pulse">
                  AGENT DATA OVERVIEW
                </span>
              </h3>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm text-gray-300 font-mono">
                    {agents.length} Active Agents
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm text-green-400 font-mono font-bold">LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Avatars Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white font-mono tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ACTIVE AGENTS
              </span>
            </h4>
            <div className="flex items-center space-x-3">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-xl p-3 transition-all duration-300 disabled:opacity-50 hover-sound"
                title="Refresh Data"
              >
                <svg 
                  className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-xl p-3 transition-all duration-300 hover-sound"
                  title="Share Overview"
                >
                  <svg 
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-xl shadow-2xl z-50">
                    <div className="p-3">
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        📋 Copy Link
                      </button>
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        📧 Email Report
                      </button>
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        📊 Export PDF
                      </button>
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        📈 Export CSV
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* More Options Button */}
              <div className="relative">
                <button
                  onClick={handleMoreOptions}
                  className="group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-xl p-3 transition-all duration-300 hover-sound"
                  title="More Options"
                >
                  <svg 
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="18" r="2" />
                  </svg>
                </button>

                {/* Options Menu */}
                {showOptionsMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-xl shadow-2xl z-50">
                    <div className="p-3">
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        ⚙️ Overview Settings
                      </button>
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        👤 Add New Agent
                      </button>
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        🔧 Manage Agents
                      </button>
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        🎨 Customize View
                      </button>
                      <hr className="my-2 border-gray-600" />
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        📤 Export All Data
                      </button>
                      <button className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg text-sm transition-colors duration-200">
                        ❓ Help
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Agent Avatars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="group relative cursor-pointer hover-sound"
                onClick={() => handleAgentClick(agent)}
              >
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-400/20">
                  {/* Agent Avatar */}
                  <div className="relative mx-auto mb-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-300 bg-gray-800/50">
                      <WireframeAvatar 
                        name={agent.name}
                        initials={agent.initials}
                        size={64}
                        className="w-full h-full"
                      />
                    </div>
                    
                    {/* Status Indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(agent.status)} rounded-full border-2 border-gray-800 group-hover:border-gray-700 transition-all duration-300`}>
                      <div className={`w-2 h-2 ${getStatusColor(agent.status)} rounded-full animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="text-center">
                    <div className="text-white font-mono text-sm font-bold mb-1 truncate">{agent.name}</div>
                    <div className="text-gray-400 text-xs mb-2 truncate">{agent.role}</div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-2 h-2 ${getStatusColor(agent.status)} rounded-full animate-pulse`}></div>
                      <span className="text-xs text-gray-400 font-mono">{getStatusText(agent.status)}</span>
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="text-white text-sm font-mono text-center">
                      <div className="font-bold">{agent.name}</div>
                      <div className="text-gray-400 text-xs">{agent.role}</div>
                      <div className="text-gray-400 text-xs">Missions: {agent.missionsCompleted}</div>
                      <div className="text-gray-400 text-xs">Success: {agent.successRate}%</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats and Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Stats Panel */}
          <AgentStatsPanel agents={agents} />

          {/* Agent Timeline */}
          <AgentTimeline />
        </div>
      </div>

      {/* Click outside to close menus */}
      {(showShareMenu || showOptionsMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowShareMenu(false);
            setShowOptionsMenu(false);
          }}
        />
      )}

      {/* Agent Detail Modal */}
      <AgentDetailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAgent(null);
        }}
        agent={selectedAgent}
      />
    </div>
  );
};

export default AgentDataOverview;
