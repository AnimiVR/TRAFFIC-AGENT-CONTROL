'use client';

import React, { useState, useEffect } from 'react';

interface LiveDataUpdaterProps {
  children: React.ReactNode;
}

const LiveDataUpdater: React.FC<LiveDataUpdaterProps> = ({ children }) => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Trigger re-render of child components
      window.dispatchEvent(new CustomEvent('dataUpdate'));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="relative">
      {/* Live indicator */}
      <div className="absolute top-2 right-2 z-10">
        <div className="flex items-center space-x-2 bg-dark-card/80 backdrop-blur-sm border border-dark-border rounded-lg px-3 py-1">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 pulse-glow' : 'bg-gray-500'}`}></div>
          <span className="text-xs text-gray-400">
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            className="text-xs text-accent-red hover:text-accent-orange transition-colors duration-200"
          >
            {isLive ? 'PAUSE' : 'RESUME'}
          </button>
        </div>
      </div>

      {/* Last update time */}
      <div className="absolute top-2 left-2 z-10">
        <div className="bg-dark-card/80 backdrop-blur-sm border border-dark-border rounded-lg px-3 py-1">
          <span className="text-xs text-gray-400">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
};

export default LiveDataUpdater;
