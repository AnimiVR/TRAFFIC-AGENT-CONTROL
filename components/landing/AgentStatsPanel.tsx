'use client';

import React, { useState, useEffect } from 'react';

interface AgentStats {
  total: number;
  online: number;
  busy: number;
  offline: number;
  avgSuccessRate: number;
  totalMissions: number;
}

interface Agent {
  id: string;
  name: string;
  status: 'online' | 'busy' | 'offline';
  successRate: number;
  missions: number;
  missionsCompleted: number; // Add missionsCompleted property
}

interface AgentStatsPanelProps {
  agents: Agent[];
  className?: string;
}

const AgentStatsPanel: React.FC<AgentStatsPanelProps> = ({ agents, className = '' }) => {
  const [stats, setStats] = useState<AgentStats>({
    total: 0,
    online: 0,
    busy: 0,
    offline: 0,
    avgSuccessRate: 0,
    totalMissions: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const total = agents.length;
      const online = agents.filter(agent => agent.status === 'online').length;
      const busy = agents.filter(agent => agent.status === 'busy').length;
      const offline = agents.filter(agent => agent.status === 'offline').length;
      const avgSuccessRate = agents.length > 0 
        ? Math.round(agents.reduce((sum, agent) => sum + agent.successRate, 0) / agents.length)
        : 0;
      const totalMissions = agents.reduce((sum, agent) => sum + agent.missionsCompleted, 0);

      setStats({
        total,
        online,
        busy,
        offline,
        avgSuccessRate,
        totalMissions
      });
    };

    calculateStats();
  }, [agents]);

  return (
    <div className={`bg-dark-card/30 border border-gray-700 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-semibold text-white font-mono mb-3">REAL-TIME STATS</h4>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-accent-red font-mono">{stats.total}</div>
          <div className="text-xs text-gray-400">Total Agents</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-green-400 font-mono">{stats.online}</div>
          <div className="text-xs text-gray-400">Online</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-400 font-mono">{stats.busy}</div>
          <div className="text-xs text-gray-400">Busy</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-gray-400 font-mono">{stats.offline}</div>
          <div className="text-xs text-gray-400">Offline</div>
        </div>
        
        <div className="text-center col-span-2">
          <div className="text-lg font-bold text-cyan-400 font-mono">{stats.avgSuccessRate}%</div>
          <div className="text-xs text-gray-400">Avg Success Rate</div>
        </div>
        
        <div className="text-center col-span-2">
          <div className="text-lg font-bold text-blue-400 font-mono">{stats.totalMissions}</div>
          <div className="text-xs text-gray-400">Total Missions</div>
        </div>
      </div>
    </div>
  );
};

export default AgentStatsPanel;
