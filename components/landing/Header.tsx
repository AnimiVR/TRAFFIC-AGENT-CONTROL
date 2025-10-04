'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Move timeOptions outside component to prevent recreation on every render
const timeOptions = [
  { label: '1 Day', value: '1d', hours: 24 },
  { label: '1 Week', value: '1w', hours: 168 },
  { label: '1 Month', value: '1m', hours: 720 }
];

const Header = () => {
  const [selectedTime, setSelectedTime] = useState('1 Day');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [operationsCount, setOperationsCount] = useState(20);
  const [updatesCount, setUpdatesCount] = useState(4);
  const pathname = usePathname();

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update operations count based on time selection
  useEffect(() => {
    const selectedOption = timeOptions.find(opt => opt.label === selectedTime);
    if (selectedOption) {
      // Simulate different operation counts based on time range
      const baseCount = selectedOption.hours === 24 ? 20 : selectedOption.hours === 168 ? 45 : 120;
      setOperationsCount(baseCount + Math.floor(Math.random() * 10));
      setUpdatesCount(Math.floor(Math.random() * 8) + 1);
    }
  }, [selectedTime, timeOptions]);

  const handleTimeChange = (option: typeof timeOptions[0]) => {
    setSelectedTime(option.label);
    // Trigger data update event
    window.dispatchEvent(new CustomEvent('timeRangeChange', { 
      detail: { range: option.value, hours: option.hours } 
    }));
  };

  const getTimeRangeText = () => {
    const selectedOption = timeOptions.find(opt => opt.label === selectedTime);
    if (!selectedOption) return '24 hours';
    
    switch (selectedOption.value) {
      case '1d': return '24 hours';
      case '1w': return '7 days';
      case '1m': return '30 days';
      default: return '24 hours';
    }
  };

  return (
    <header className="bg-dark-card border-b border-dark-border p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">
            {pathname === '/leaderboard' ? 'AGENT LEADERBOARD' : 
             pathname === '/docs' ? 'DOCUMENTATION' : 
             pathname === '/traffic-agent' ? 'TRAFFIC AGENT CONTROL' : 'OPERATIONS DASHBOARD'}
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-mono">
            {pathname === '/leaderboard' ? 'Agent Performance Rankings' : 
             pathname === '/docs' ? 'Platform User Guide' : 
             pathname === '/traffic-agent' ? 'Advanced Agent Monitoring System' : 'Intelligence Monitoring System'}
          </p>
          
          {/* Navigation Menu */}
          <div className="flex items-center space-x-4 mt-2">
            <Link 
              href="/"
              className={`text-xs font-mono px-3 py-1 rounded transition-all duration-200 ${
                pathname === '/' 
                  ? 'bg-accent-red text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-border'
              }`}
            >
              DASHBOARD
            </Link>
            <Link 
              href="/leaderboard"
              className={`text-xs font-mono px-3 py-1 rounded transition-all duration-200 ${
                pathname === '/leaderboard' 
                  ? 'bg-accent-red text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-border'
              }`}
            >
              LEADERBOARD
            </Link>
            <Link 
              href="/docs"
              className={`text-xs font-mono px-3 py-1 rounded transition-all duration-200 ${
                pathname === '/docs' 
                  ? 'bg-accent-red text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-border'
              }`}
            >
              DOCS
            </Link>
            <Link 
              href="/traffic-agent"
              className={`text-xs font-mono px-3 py-1 rounded transition-all duration-200 ${
                pathname === '/traffic-agent' 
                  ? 'bg-accent-red text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-border'
              }`}
            >
              TRAFFIC AGENT
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
              <span className="text-xs text-gray-400 font-mono">SYSTEM ONLINE</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {currentTime.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            {pathname === '/leaderboard' ? (
              <>
                <h2 className="text-xl font-semibold text-white">AGENT RANKINGS</h2>
                <p className="text-gray-400 text-sm">Live performance metrics</p>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <div className="w-1 h-1 bg-accent-red rounded-full pulse-glow"></div>
                  <span className="text-xs text-gray-400">LIVE RANKINGS</span>
                </div>
              </>
            ) : pathname === '/docs' ? (
              <>
                <h2 className="text-xl font-semibold text-white">USER GUIDE</h2>
                <p className="text-gray-400 text-sm">Complete platform documentation</p>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <div className="w-1 h-1 bg-accent-red rounded-full pulse-glow"></div>
                  <span className="text-xs text-gray-400">UPDATED GUIDE</span>
                </div>
              </>
            ) : pathname === '/traffic-agent' ? (
              <>
                <h2 className="text-xl font-semibold text-white">TRAFFIC CONTROL</h2>
                <p className="text-gray-400 text-sm">Advanced agent monitoring</p>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <div className="w-1 h-1 bg-accent-red rounded-full pulse-glow"></div>
                  <span className="text-xs text-gray-400">MONITORING ACTIVE</span>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white">OPERATIONS LIST ({operationsCount})</h2>
                <p className="text-gray-400 text-sm">{updatesCount} updates in the previous {getTimeRangeText()}</p>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <div className="w-1 h-1 bg-accent-red rounded-full pulse-glow"></div>
                  <span className="text-xs text-gray-400">ACTIVE MISSIONS</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="text-xs text-gray-400 text-center">TIME RANGE</div>
            <div className="flex space-x-1">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTimeChange(option)}
                  className={`px-3 py-2 text-xs font-medium transition-all duration-300 rounded ${
                    selectedTime === option.label
                      ? 'bg-accent-red text-white border border-accent-red glow-effect'
                      : 'bg-dark-card text-gray-400 border border-dark-border hover:text-white hover:border-gray-600 hover:bg-dark-card/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500 text-center">
              Showing data for {getTimeRangeText()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
