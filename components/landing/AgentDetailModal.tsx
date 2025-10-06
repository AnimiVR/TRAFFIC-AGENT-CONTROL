'use client';

import React from 'react';
import Modal from './Modal';
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
}

interface AgentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
}

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ isOpen, onClose, agent }) => {
  if (!agent) return null;

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
    <Modal isOpen={isOpen} onClose={onClose} title="Agent Details" size="medium">
      <div className="space-y-6">
        {/* Agent Header */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-800/50">
              <WireframeAvatar 
                name={agent.name}
                initials={agent.initials}
                size={80}
                className="w-full h-full"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(agent.status)} rounded-full border-2 border-gray-800`}>
              <div className={`w-3 h-3 ${getStatusColor(agent.status)} rounded-full animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white font-mono">{agent.name}</h3>
            <p className="text-gray-400 text-sm">{agent.role}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 ${getStatusColor(agent.status)} rounded-full animate-pulse`}></div>
              <span className="text-sm text-gray-400">{getStatusText(agent.status)}</span>
            </div>
          </div>
        </div>

        {/* Agent Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-card/30 border border-gray-700 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-red font-mono">{agent.missionsCompleted}</div>
              <div className="text-sm text-gray-400">Missions Completed</div>
            </div>
          </div>
          <div className="bg-dark-card/30 border border-gray-700 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 font-mono">{agent.successRate}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Recent Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-dark-card/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm">Mission Alpha completed successfully</span>
              </div>
              <span className="text-gray-400 text-xs">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-card/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-white text-sm">Mission Beta in progress</span>
              </div>
              <span className="text-gray-400 text-xs">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-card/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white text-sm">Intelligence report submitted</span>
              </div>
              <span className="text-gray-400 text-xs">1 day ago</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-accent-red hover:bg-accent-red/80 text-white py-2 px-4 rounded-lg transition-all duration-300 font-mono">
            Assign Mission
          </button>
          <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-all duration-300 font-mono">
            View Profile
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AgentDetailModal;
