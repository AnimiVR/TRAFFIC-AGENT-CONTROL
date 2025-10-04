'use client';

import React, { useState } from 'react';

interface Operation {
  id: string;
  region: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'FAILED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  startTime: string;
  progress: number;
  agent: string;
  coordinates: { lat: number; lng: number };
}

interface OperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OperationsModal: React.FC<OperationsModalProps> = ({ isOpen, onClose }) => {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'FAILED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock operations data
  const operations: Operation[] = [
    {
      id: 'OP-001',
      region: 'USA',
      status: 'ACTIVE',
      priority: 'HIGH',
      description: 'Surveillance operation in North American region',
      startTime: '2024-01-15 14:30:00',
      progress: 75,
      agent: 'Agent Alpha',
      coordinates: { lat: 39.8283, lng: -98.5795 }
    },
    {
      id: 'OP-002',
      region: 'Europe',
      status: 'PENDING',
      priority: 'MEDIUM',
      description: 'Intelligence gathering in European territories',
      startTime: '2024-01-15 16:45:00',
      progress: 25,
      agent: 'Agent Beta',
      coordinates: { lat: 54.5260, lng: 15.2551 }
    },
    {
      id: 'OP-003',
      region: 'Asia',
      status: 'COMPLETED',
      priority: 'HIGH',
      description: 'Data extraction from Asian networks',
      startTime: '2024-01-14 09:15:00',
      progress: 100,
      agent: 'Agent Gamma',
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    {
      id: 'OP-004',
      region: 'Africa',
      status: 'ACTIVE',
      priority: 'LOW',
      description: 'Monitoring communication channels',
      startTime: '2024-01-15 11:20:00',
      progress: 45,
      agent: 'Agent Delta',
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    {
      id: 'OP-005',
      region: 'South America',
      status: 'FAILED',
      priority: 'MEDIUM',
      description: 'Infrastructure penetration attempt',
      startTime: '2024-01-14 20:10:00',
      progress: 30,
      agent: 'Agent Epsilon',
      coordinates: { lat: -14.2350, lng: -51.9253 }
    },
    {
      id: 'OP-006',
      region: 'Australia',
      status: 'PENDING',
      priority: 'LOW',
      description: 'Network reconnaissance mission',
      startTime: '2024-01-16 08:00:00',
      progress: 0,
      agent: 'Agent Zeta',
      coordinates: { lat: -25.2744, lng: 133.7751 }
    }
  ];


  const filteredOperations = operations.filter(op => {
    const matchesFilter = filter === 'ALL' || op.status === filter;
    const matchesSearch = op.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400 bg-green-400/20';
      case 'PENDING': return 'text-yellow-400 bg-yellow-400/20';
      case 'COMPLETED': return 'text-blue-400 bg-blue-400/20';
      case 'FAILED': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getGlobeSVG = (region: string) => {
    const centerX = 100;
    const centerY = 100;
    const radius = 60;
    
    // Different colors for different regions
    const regionColors = {
      'USA': '#ff4444',
      'Europe': '#4444ff',
      'Asia': '#44ff44',
      'Africa': '#ffff44',
      'South America': '#ff44ff',
      'Australia': '#44ffff'
    };

    return (
      <svg viewBox="0 0 200 200" className="w-20 h-20">
        {/* Globe shadow */}
        <circle cx={centerX + 2} cy={centerY + 2} r={radius} fill="#000" opacity="0.3"/>
        
        {/* Globe */}
        <circle cx={centerX} cy={centerY} r={radius} fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        
        {/* Region highlight */}
        <circle cx={centerX} cy={centerY} r={radius} fill={regionColors[region as keyof typeof regionColors] || '#ff4444'} opacity="0.3"/>
        
        {/* Grid lines */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = centerX + Math.cos(angle) * radius;
          const y1 = centerY + Math.sin(angle) * radius;
          const x2 = centerX - Math.cos(angle) * radius;
          const y2 = centerY - Math.sin(angle) * radius;
          return (
            <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="0.5" opacity="0.4"/>
          );
        })}
        
        {/* Target marker */}
        <circle cx={centerX} cy={centerY} r="4" fill="#fff" opacity="0.9">
          <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] mx-4">
        <div className="glass-effect rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 p-6 border-b border-red-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-red-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">GLOBAL OPERATIONS</h2>
                  <p className="text-red-300 text-sm">Real-time mission monitoring</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search operations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                  />
                  <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Filter */}
              <div className="flex gap-2">
                {(['ALL', 'ACTIVE', 'PENDING', 'COMPLETED', 'FAILED'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      filter === status
                        ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="grid gap-4">
              {filteredOperations.map((operation, index) => (
                <div
                  key={operation.id}
                  className={`glass-effect rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedOperation?.id === operation.id ? 'ring-2 ring-red-500/50' : ''
                  }`}
                  onClick={() => setSelectedOperation(operation)}
                  style={{
                    animationName: 'fadeInUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards',
                    animationDelay: `${index * 100}ms`,
                    opacity: 0
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Globe */}
                      <div className="flex-shrink-0">
                        {getGlobeSVG(operation.region)}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{operation.id}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(operation.status)}`}>
                            {operation.status}
                          </span>
                          <span className={`text-sm font-medium ${getPriorityColor(operation.priority)}`}>
                            {operation.priority}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-2">{operation.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span>Agent: {operation.agent}</span>
                          <span>Region: {operation.region}</span>
                          <span>Started: {operation.startTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress */}
                    <div className="flex-shrink-0 w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className="text-xs text-white font-mono">{operation.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${operation.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900/50 p-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {filteredOperations.length} of {operations.length} operations
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Live Updates</span>
                </div>
                
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsModal;
