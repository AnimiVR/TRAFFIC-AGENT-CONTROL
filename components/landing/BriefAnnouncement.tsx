'use client';

import React, { useState, useEffect } from 'react';

const BriefAnnouncement = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0.8);
  const [scanProgress, setScanProgress] = useState(0);
  const [dataPoints, setDataPoints] = useState([
    "1231...", "54.50", "4.", "54", "87867", 
    "4.", "546..", ".4..", "4657..", "8.2..."
  ]);
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [particles, setParticles] = useState<Array<{
    left: number;
    top: number;
    duration: number;
    delay: number;
  }>>([]);

  // Simulate data scanning animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(prev => prev === 0.8 ? 1.2 : 0.8);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    
    // Generate particles only on client
    setParticles(
      [...Array(6)].map((_, i) => ({
        left: 20 + i * 15,
        top: 30 + Math.sin(Date.now() / 1000 + i) * 20,
        duration: 2 + i * 0.5,
        delay: i * 0.3
      }))
    );
  }, []);

  // Update time every second
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isClient]);

  // Random data update animation
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setDataPoints(prev => prev.map(point => {
        if (Math.random() > 0.7) {
          // Randomly update some data points
          const randomNum = Math.floor(Math.random() * 10000);
          return randomNum.toString().padStart(4, '0') + '...';
        }
        return point;
      }));
      
      // Update particles
      setParticles(prev => prev.map((particle, i) => ({
        ...particle,
        top: 30 + Math.sin(Date.now() / 1000 + i) * 20
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, [isClient]);


  return (
    <div 
      className={`glass-effect rounded-lg p-6 card-hover transition-all duration-500 ${
        isHovered ? 'transform scale-105 shadow-2xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        boxShadow: isHovered ? '0 20px 60px rgba(0, 255, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header with animated title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white font-mono tracking-wider">
          <span className="inline-block animate-pulse">BRIEF</span> ANNOUNCEMENT
          <span className="text-cyan-400 animate-pulse">..</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-cyan-400 font-mono">SCANNING</span>
        </div>
      </div>
      
      {/* Main scanning area */}
      <div className="relative h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(8)].map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 12.5} x2="100" y2={i * 12.5} stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
            ))}
          </svg>
        </div>

        {/* Concentric circles with animations */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer ring */}
          <div className="w-32 h-32 border-2 border-cyan-400/30 rounded-full animate-spin ring-pulse" style={{ animationDuration: '20s' }}>
            <div className="absolute inset-2 border border-cyan-400/20 rounded-full"></div>
          </div>
          
          {/* Middle ring */}
          <div className="absolute w-24 h-24 border-2 border-blue-400/40 rounded-full animate-spin ring-pulse" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <div className="absolute inset-2 border border-blue-400/20 rounded-full"></div>
          </div>
          
          {/* Inner ring */}
          <div className="absolute w-16 h-16 border-2 border-green-400/50 rounded-full animate-spin ring-pulse" style={{ animationDuration: '10s' }}>
            <div className="absolute inset-2 border border-green-400/30 rounded-full"></div>
          </div>
          
          {/* Center core */}
          <div className="absolute w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse" style={{ opacity: pulseIntensity }}>
            <div className="absolute inset-1 bg-black/50 rounded-full"></div>
          </div>
        </div>
        
        {/* Data points with enhanced styling */}
        <div className="absolute inset-0 grid grid-cols-5 gap-2 text-xs">
          {dataPoints.map((point, index) => (
            <div 
              key={index} 
              className="data-point text-center p-2 rounded bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-cyan-900/30 hover:to-blue-900/30"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <span className="text-cyan-300 font-mono font-bold">{point}</span>
            </div>
          ))}
        </div>

        {/* Scanning beam effect */}
        <div 
          className="scanning-line absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
          style={{
            top: `${scanProgress}%`
          }}
        ></div>

        {/* Corner indicators */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-60 animate-pulse"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400 opacity-60 animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400 opacity-60 animate-pulse"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-60 animate-pulse"></div>

        {/* Floating data particles */}
        {isClient && particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="floating-particle absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          ></div>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
        <span>Last scan: {isClient && currentTime ? currentTime.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) : '--:--:--'}</span>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
          <span className="text-cyan-400 font-mono">ACTIVE</span>
        </div>
      </div>

      {/* Additional status indicators */}
      <div className="flex items-center justify-between text-xs mt-2">
        <div className="flex items-center space-x-3">
          <span className="text-cyan-400">● DATA STREAM</span>
          <span className="text-blue-400">● SIGNAL STRONG</span>
          <span className="text-green-400">● ENCRYPTED</span>
        </div>
        <div className="text-cyan-400 font-mono">
          {String(scanProgress).padStart(3, '0')}% SCAN
        </div>
      </div>
    </div>
  );
};

export default BriefAnnouncement;
