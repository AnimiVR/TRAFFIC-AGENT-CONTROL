'use client';

import React, { useState, useEffect } from 'react';

const WireframeSphere: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
      
      {/* 3D Wireframe Sphere */}
      <svg viewBox="0 0 200 200" className="w-32 h-32">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Sphere outline */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
        
        {/* Longitude lines */}
        <g transform={`rotate(${rotation} 100 100)`}>
          <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
          <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
          <line x1="50" y1="50" x2="150" y2="150" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
          <line x1="150" y1="50" x2="50" y2="150" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
        </g>
        
        {/* Latitude lines */}
        <ellipse cx="100" cy="100" rx="80" ry="40" fill="none" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
        <ellipse cx="100" cy="100" rx="60" ry="30" fill="none" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
        <ellipse cx="100" cy="100" rx="40" ry="20" fill="none" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
        
        {/* Animated data particles */}
        <circle cx="100" cy="100" r="2" fill="rgba(255, 68, 68, 0.9)" className="animate-pulse" />
        <circle cx="80" cy="80" r="1" fill="rgba(0, 255, 255, 0.7)" className="animate-ping" />
        <circle cx="120" cy="120" r="1" fill="rgba(0, 255, 255, 0.7)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
        <circle cx="100" cy="60" r="1" fill="rgba(255, 255, 0, 0.7)" className="animate-ping" style={{ animationDelay: '1s' }} />
        <circle cx="140" cy="100" r="1" fill="rgba(255, 255, 0, 0.7)" className="animate-ping" style={{ animationDelay: '1.5s' }} />
      </svg>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WireframeSphere;


