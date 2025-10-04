'use client';

import React, { useState, useEffect } from 'react';

const AgentActivity = () => {
  const [selectedMetric, setSelectedMetric] = useState('Total');
  const [animationPhase, setAnimationPhase] = useState(0);
  const [liveData, setLiveData] = useState({
    total: 72,
    success: 45,
    failed: 27,
    highRisk: 30,
    mediumRisk: 34,
    lowRisk: 8
  });
  const [isHovered, setIsHovered] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        total: prev.total + Math.floor(Math.random() * 3) - 1,
        success: prev.success + Math.floor(Math.random() * 2),
        failed: prev.failed + Math.floor(Math.random() * 2) - 1,
        highRisk: prev.highRisk + Math.floor(Math.random() * 2) - 1,
        mediumRisk: prev.mediumRisk + Math.floor(Math.random() * 2) - 1,
        lowRisk: prev.lowRisk + Math.floor(Math.random() * 2) - 1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animation phase
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(prev => prev === 1 ? 1.1 : 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { 
      label: 'Total', 
      value: liveData.total, 
      color: 'text-white',
      icon: '📊',
      trend: '+12%'
    },
    { 
      label: 'Success', 
      value: liveData.success, 
      color: 'text-green-400',
      icon: '✅',
      trend: '+8%'
    },
    { 
      label: 'Failed', 
      value: liveData.failed, 
      color: 'text-red-400',
      icon: '❌',
      trend: '-3%'
    }
  ];

  const riskLevels = [
    { 
      level: 'HIGH RISK', 
      count: liveData.highRisk, 
      percentage: Math.min(100, (liveData.highRisk / liveData.total) * 100),
      color: 'from-red-500 to-red-600',
      icon: '🔴',
      pulse: true
    },
    { 
      level: 'MEDIUM RISK', 
      count: liveData.mediumRisk, 
      percentage: Math.min(100, (liveData.mediumRisk / liveData.total) * 100),
      color: 'from-yellow-500 to-orange-500',
      icon: '🟡',
      pulse: false
    },
    { 
      level: 'LOW RISK', 
      count: liveData.lowRisk, 
      percentage: Math.min(100, (liveData.lowRisk / liveData.total) * 100),
      color: 'from-green-500 to-green-600',
      icon: '🟢',
      pulse: false
    }
  ];

  const recentActivities = [
    { id: 1, agent: 'Agent Alpha', action: 'Completed mission', time: '2m ago', status: 'success' },
    { id: 2, agent: 'Agent Beta', action: 'Failed infiltration', time: '5m ago', status: 'failed' },
    { id: 3, agent: 'Agent Gamma', action: 'Started surveillance', time: '8m ago', status: 'active' },
    { id: 4, agent: 'Agent Delta', action: 'Data extraction', time: '12m ago', status: 'success' },
    { id: 5, agent: 'Agent Epsilon', action: 'Network breach', time: '15m ago', status: 'active' }
  ];

  return (
    <div 
      className={`glass-effect rounded-lg p-6 card-hover transition-all duration-500 ${
        isHovered ? 'transform scale-105 shadow-2xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'perspective(1000px) rotateX(2deg) rotateY(2deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        boxShadow: isHovered ? '0 20px 60px rgba(255, 68, 68, 0.3), 0 0 40px rgba(255, 68, 68, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header with live indicator */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          <span className="inline-block animate-pulse">AGENT</span> ACTIVITY
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-mono">LIVE</span>
        </div>
      </div>
      
      {/* Enhanced Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div 
            key={metric.label} 
            className={`text-center p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
              selectedMetric === metric.label ? 'bg-accent-red/20 border border-accent-red/50' : 'bg-dark-card/30'
            }`}
            onClick={() => setSelectedMetric(metric.label)}
            style={{
              animationDelay: `${index * 200}ms`,
              animationName: 'fadeInUp',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              opacity: 0
            }}
          >
            <div className="flex items-center justify-center space-x-1 mb-2">
              <span className="text-lg">{metric.icon}</span>
              <span className="text-gray-400 text-sm">{metric.label}</span>
            </div>
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <div className="text-xs text-gray-500 font-mono">
              {metric.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Risk Levels */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">RISK ASSESSMENT</h4>
        {riskLevels.map((risk, index) => (
          <div 
            key={risk.level}
            className="relative"
            style={{
              animationDelay: `${index * 300}ms`,
              animationName: 'fadeInUp',
              animationDuration: '0.7s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              opacity: 0
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{risk.icon}</span>
                <span className="text-sm text-gray-400">{risk.count}</span>
              </div>
              <span className="text-sm text-white font-semibold">{risk.level}</span>
            </div>
            <div className="progress-bar h-3 relative overflow-hidden">
              <div 
                className={`progress-fill bg-gradient-to-r ${risk.color} transition-all duration-1000`}
                style={{ 
                  width: `${risk.percentage}%`,
                  transform: risk.pulse ? `scaleY(${pulseIntensity})` : 'scaleY(1)'
                }}
              />
              {/* Animated particles */}
              {risk.pulse && (
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        animation: `particleFloat ${2 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities Feed */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">RECENT ACTIVITIES</h4>
        <div className="max-h-32 overflow-y-auto space-y-2">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-2 bg-dark-card/20 rounded-lg hover:bg-dark-card/40 transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animationName: 'slideInRight',
                animationDuration: '0.5s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                opacity: 0
              }}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-400' :
                  activity.status === 'failed' ? 'bg-red-400' : 'bg-yellow-400'
                } ${activity.status === 'active' ? 'animate-pulse' : ''}`}></div>
                <span className="text-xs text-gray-400">{activity.agent}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-white">{activity.action}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-green-400">● {liveData.success} SUCCESS</span>
            <span className="text-red-400">● {liveData.failed} FAILED</span>
            <span className="text-yellow-400">● {liveData.highRisk} HIGH RISK</span>
          </div>
          <div className="text-accent-orange font-mono">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentActivity;
