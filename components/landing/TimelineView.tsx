'use client';

import React, { useState, useEffect } from 'react';

interface TimelineData {
  time: string;
  date: string;
  missions: number;
  alerts: number;
  status: 'critical' | 'warning' | 'normal';
}

const TimelineView = () => {
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);

  useEffect(() => {
    // Listen for time range changes from header
    const handleTimeRangeChange = (event: CustomEvent) => {
      generateTimelineData(event.detail.range);
    };

    window.addEventListener('timeRangeChange', handleTimeRangeChange as EventListener);
    
    // Generate initial data
    generateTimelineData('1d');

    return () => window.removeEventListener('timeRangeChange', handleTimeRangeChange as EventListener);
  }, []);

  const generateTimelineData = (range: string) => {
    const data: TimelineData[] = [];
    const now = new Date();
    
    switch (range) {
      case '1d':
        // Generate hourly data for 24 hours
        for (let i = 23; i >= 0; i--) {
          const time = new Date(now.getTime() - i * 60 * 60 * 1000);
          data.push({
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            date: time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            missions: Math.floor(Math.random() * 10) + 1,
            alerts: Math.floor(Math.random() * 5),
            status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'normal'
          });
        }
        break;
      case '1w':
        // Generate daily data for 7 days
        for (let i = 6; i >= 0; i--) {
          const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          data.push({
            time: time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            date: time.toLocaleDateString('en-US', { weekday: 'short' }),
            missions: Math.floor(Math.random() * 20) + 5,
            alerts: Math.floor(Math.random() * 15) + 2,
            status: Math.random() > 0.6 ? 'critical' : Math.random() > 0.3 ? 'warning' : 'normal'
          });
        }
        break;
      case '1m':
        // Generate weekly data for 4 weeks
        for (let i = 3; i >= 0; i--) {
          const time = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
          data.push({
            time: `Week ${4-i}`,
            date: time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            missions: Math.floor(Math.random() * 50) + 20,
            alerts: Math.floor(Math.random() * 30) + 10,
            status: Math.random() > 0.5 ? 'critical' : Math.random() > 0.2 ? 'warning' : 'normal'
          });
        }
        break;
    }
    
    setTimelineData(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-accent-red';
      case 'warning': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-accent-red/20 border-accent-red/50';
      case 'warning': return 'bg-yellow-400/20 border-yellow-400/50';
      default: return 'bg-green-400/20 border-green-400/50';
    }
  };

  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">TIMELINE ACTIVITY</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent-red rounded-full pulse-glow"></div>
          <span className="text-xs text-gray-400">LIVE DATA</span>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {timelineData.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-3 rounded-lg border ${getStatusBg(item.status)} transition-all duration-200 hover:scale-105`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-sm font-mono text-white font-semibold">
                {item.time}
              </div>
              <div className="text-xs text-gray-400">
                {item.date}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm font-semibold text-white">{item.missions}</div>
                <div className="text-xs text-gray-400">Missions</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-white">{item.alerts}</div>
                <div className="text-xs text-gray-400">Alerts</div>
              </div>
              <div className={`text-xs font-semibold ${getStatusColor(item.status)}`}>
                {item.status.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Showing {timelineData.length} data points</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
