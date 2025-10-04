'use client';

import React from 'react';

const GlobeMap = () => {
  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      <div className="relative h-80 flex items-center justify-center">
        {/* Globe */}
        <div className="relative w-64 h-64">
          {/* Main globe */}
          <div className="w-full h-full bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-full border-2 border-gray-600 relative overflow-hidden shadow-2xl">
            {/* Detailed grid lines */}
            <div className="absolute inset-0">
              {/* Horizontal lines */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-full h-px bg-gray-500 opacity-20"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                ></div>
              ))}
              
              {/* Vertical lines */}
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute h-full w-px bg-gray-500 opacity-20"
                  style={{ left: `${(i + 1) * 8.33}%` }}
                ></div>
              ))}
            </div>
            
            {/* Detailed continents */}
            <div className="absolute inset-0">
              {/* North America - more detailed */}
              <div className="absolute top-1/4 left-1/4 w-10 h-14 bg-gray-600 rounded-sm opacity-70 shadow-lg">
                <div className="absolute top-2 left-2 w-1 h-1 bg-accent-red rounded-full"></div>
                <div className="absolute top-4 left-3 w-1 h-1 bg-accent-red rounded-full"></div>
              </div>
              
              {/* South America */}
              <div className="absolute top-1/2 left-1/3 w-7 h-18 bg-gray-600 rounded-sm opacity-70 shadow-lg">
                <div className="absolute top-3 left-2 w-1 h-1 bg-accent-red rounded-full"></div>
              </div>
              
              {/* Europe */}
              <div className="absolute top-1/3 right-1/3 w-7 h-10 bg-gray-600 rounded-sm opacity-70 shadow-lg">
                <div className="absolute top-2 left-2 w-1 h-1 bg-accent-red rounded-full"></div>
              </div>
              
              {/* Africa */}
              <div className="absolute top-1/2 right-1/4 w-6 h-14 bg-gray-600 rounded-sm opacity-70 shadow-lg">
                <div className="absolute top-3 left-2 w-1 h-1 bg-accent-red rounded-full"></div>
                <div className="absolute top-6 left-3 w-1 h-1 bg-accent-red rounded-full"></div>
              </div>
              
              {/* Asia */}
              <div className="absolute top-1/4 right-1/6 w-8 h-12 bg-gray-600 rounded-sm opacity-70 shadow-lg">
                <div className="absolute top-3 left-2 w-1 h-1 bg-accent-red rounded-full"></div>
              </div>
            </div>
            
            {/* Connection lines */}
            <div className="absolute inset-0">
              <svg className="w-full h-full">
                <line x1="25%" y1="30%" x2="35%" y2="40%" stroke="rgba(255, 68, 68, 0.3)" strokeWidth="1"/>
                <line x1="35%" y1="50%" x2="45%" y2="60%" stroke="rgba(255, 68, 68, 0.3)" strokeWidth="1"/>
                <line x1="65%" y1="35%" x2="75%" y2="45%" stroke="rgba(255, 68, 68, 0.3)" strokeWidth="1"/>
              </svg>
            </div>
          </div>
          
          {/* Multiple orbital rings */}
          <div className="absolute inset-0 border border-gray-500 rounded-full opacity-25 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute inset-2 border border-gray-400 rounded-full opacity-20 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          <div className="absolute inset-4 border border-gray-300 rounded-full opacity-15 animate-spin" style={{animationDuration: '10s'}}></div>
          <div className="absolute inset-6 border border-accent-red rounded-full opacity-10 animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
        </div>
        
        {/* Multiple satellite indicators */}
        <div className="absolute top-6 left-6 w-3 h-3 bg-accent-red rounded-full pulse-glow">
          <div className="absolute inset-0 bg-accent-red rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="absolute bottom-6 right-6 w-3 h-3 bg-accent-orange rounded-full pulse-glow">
          <div className="absolute inset-0 bg-accent-orange rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="absolute top-1/2 left-4 w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
        <div className="absolute top-1/3 right-4 w-2 h-2 bg-blue-400 rounded-full pulse-glow"></div>
        
        {/* Data streams */}
        <div className="absolute top-12 left-12 w-16 h-1 bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-50 animate-pulse"></div>
        <div className="absolute bottom-12 right-12 w-16 h-1 bg-gradient-to-r from-transparent via-accent-orange to-transparent opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
};

export default GlobeMap;
