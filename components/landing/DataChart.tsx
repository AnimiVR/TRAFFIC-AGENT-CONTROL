'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface ChartData {
  date: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  status: 'critical' | 'warning' | 'normal';
}

const DataChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [timeRange, setTimeRange] = useState<'1d' | '1w' | '1m'>('1d');

  // Generate initial data function
  const generateInitialData = useCallback(() => {
    const data: ChartData[] = [];
    const now = new Date();
    
    switch (timeRange) {
      case '1d':
        // Generate hourly data for 24 hours
        for (let i = 23; i >= 0; i--) {
          const time = new Date(now.getTime() - i * 60 * 60 * 1000);
          data.push({
            date: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: Math.floor(Math.random() * 100) + 20,
            trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
            status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'normal'
          });
        }
        break;
      case '1w':
        // Generate daily data for 7 days
        for (let i = 6; i >= 0; i--) {
          const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          data.push({
            date: time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: Math.floor(Math.random() * 150) + 50,
            trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
            status: Math.random() > 0.6 ? 'critical' : Math.random() > 0.3 ? 'warning' : 'normal'
          });
        }
        break;
      case '1m':
        // Generate weekly data for 4 weeks
        for (let i = 3; i >= 0; i--) {
          data.push({
            date: `Week ${4-i}`,
            value: Math.floor(Math.random() * 200) + 100,
            trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
            status: Math.random() > 0.5 ? 'critical' : Math.random() > 0.2 ? 'warning' : 'normal'
          });
        }
        break;
    }
    
    setChartData(data);
  }, [timeRange]);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
  }, []);

  // Generate initial data when timeRange changes
  useEffect(() => {
    if (isClient) {
      generateInitialData();
    }
  }, [isClient, generateInitialData]);

  // Update time every second
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isClient]);

  // Real-time data updates
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      updateData();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isClient]);


  const updateData = () => {
    setIsUpdating(true);
    
    setChartData(prevData => 
      prevData.map(item => {
        const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
        const newValue = Math.max(0, item.value + change);
        
        let newTrend: 'up' | 'down' | 'stable' = 'stable';
        if (change > 2) newTrend = 'up';
        else if (change < -2) newTrend = 'down';
        
        let newStatus: 'critical' | 'warning' | 'normal' = item.status;
        if (newValue > 80) newStatus = 'critical';
        else if (newValue > 60) newStatus = 'warning';
        else if (newValue < 30) newStatus = 'critical';
        else if (newValue < 50) newStatus = 'warning';
        else newStatus = 'normal';
        
        return {
          ...item,
          value: newValue,
          trend: newTrend,
          status: newStatus
        };
      })
    );
    
    setTimeout(() => setIsUpdating(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'warning': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 100;

  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">ACTIVITY TIMELINE</h3>
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-gray-800/50 rounded-lg p-1">
            {(['1d', '1w', '1m'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-mono rounded transition-all duration-200 ${
                  timeRange === range
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          
          {/* Live Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-yellow-400 animate-pulse' : 'bg-green-400 animate-pulse'}`}></div>
            <span className="text-xs text-gray-400 font-mono">
              {isUpdating ? 'UPDATING' : 'LIVE'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {chartData.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-2"></div>
            Loading activity data...
          </div>
        ) : (
          chartData.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-800/30 ${
                isUpdating ? 'animate-pulse' : ''
              }`}
            >
              <div className="w-16 text-xs text-gray-400 font-mono">
              {item.date}
            </div>
              
              <div className="flex-1 bg-dark-border rounded-full h-4 overflow-hidden relative">
              <div 
                  className={`bg-gradient-to-r ${getStatusColor(item.status)} h-full rounded-full transition-all duration-1000 relative`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
            </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-12 text-xs text-white font-mono text-right">
              {item.value}
                </div>
                <div className={`text-xs font-bold ${getTrendColor(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'critical' ? 'bg-red-400' :
                  item.status === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
                }`}></div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer with stats */}
      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Total Points: {chartData.length}</span>
            <span>Max Value: {maxValue}</span>
            <span>Avg Value: {chartData.length > 0 ? Math.round(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length) : 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Last updated:</span>
            <span className="font-mono text-cyan-400">
              {isClient && currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataChart;
