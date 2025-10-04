'use client';

import React, { useState, useEffect } from 'react';
import OperationsModal from './OperationsModal';

interface TargetOperationProps {
  region?: string;
  description?: string;
}

// Danh sách các quốc gia với mô tả và vị trí tương ứng
const COUNTRIES_DATA = [
  {
    name: 'USA',
    description: 'Intelligence confirms the world\'s most notorious drug trafficker was last seen in this area 30 minutes ago. Surveillance teams are on high alert.',
    angle: -30,
    color: '#ff4444'
  },
  {
    name: 'AFRICA',
    description: 'A high-level cyberattack was traced back to a hidden server farm in this district just 20 minutes ago. Counterintelligence teams are mobilizing.',
    angle: 20,
    color: '#ff4444'
  },
  {
    name: 'RUSSIA',
    description: 'Suspected arms smuggling operation detected in this region. Intelligence suggests multiple high-value targets are converging.',
    angle: 45,
    color: '#ff4444'
  },
  {
    name: 'CHINA',
    description: 'Advanced persistent threat group activity reported. Multiple infiltration attempts detected across critical infrastructure.',
    angle: 60,
    color: '#ff4444'
  },
  {
    name: 'EUROPE',
    description: 'Financial crime syndicate operating across multiple jurisdictions. Money laundering network traced to this location.',
    angle: 0,
    color: '#ff4444'
  },
  {
    name: 'BRAZIL',
    description: 'Organized crime network expansion detected. Drug trafficking routes being established through this corridor.',
    angle: -45,
    color: '#ff4444'
  },
  {
    name: 'INDIA',
    description: 'Cyber espionage campaign targeting government systems. Advanced malware deployment detected in this sector.',
    angle: 75,
    color: '#ff4444'
  },
  {
    name: 'AUSTRALIA',
    description: 'Maritime smuggling operation intercepted. Multiple vessels carrying contraband detected in territorial waters.',
    angle: 90,
    color: '#ff4444'
  },
  {
    name: 'CANADA',
    description: 'Cross-border criminal activity surge reported. Intelligence indicates coordination with international networks.',
    angle: -60,
    color: '#ff4444'
  },
  {
    name: 'JAPAN',
    description: 'Industrial espionage operation uncovered. Corporate secrets being systematically extracted from major corporations.',
    angle: 80,
    color: '#ff4444'
  }
];

const TargetOperation: React.FC<TargetOperationProps> = ({ region }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0.8);
  const [scanProgress, setScanProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(() => {
    // Khởi tạo với quốc gia từ props hoặc random
    const initialCountry = region ? COUNTRIES_DATA.find(c => c.name === region) : null;
    return initialCountry || COUNTRIES_DATA[Math.floor(Math.random() * COUNTRIES_DATA.length)];
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Simulate scanning animation
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

  // Random country change every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * COUNTRIES_DATA.length);
      setCurrentCountry(COUNTRIES_DATA[randomIndex]);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  const getGlobeSVG = () => {
    const centerX = 200;
    const centerY = 150;
    const radius = 80;
    const rotationAngle = scanProgress * 3.6; // 360 degrees over 100 progress
    
    // Calculate target position based on current country
    const targetX = centerX + Math.cos(currentCountry.angle * Math.PI / 180) * radius * 0.7;
    const targetY = centerY + Math.sin(currentCountry.angle * Math.PI / 180) * radius * 0.7;

    return (
      <svg viewBox="0 0 400 300" className="w-full h-48">
        {/* Background */}
        <rect x="0" y="0" width="400" height="300" fill="#0a0a0a" stroke="#333" strokeWidth="1"/>
        
        {/* Grid lines */}
        {[...Array(8)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 37.5} x2="400" y2={i * 37.5} stroke="#333" strokeWidth="0.5" opacity="0.2"/>
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" stroke="#333" strokeWidth="0.5" opacity="0.2"/>
        ))}
        
        {/* Globe shadow/backdrop */}
        <circle cx={centerX + 3} cy={centerY + 3} r={radius} fill="#000" opacity="0.3"/>
        
        {/* Globe main body */}
        <circle cx={centerX} cy={centerY} r={radius} fill="#1a1a1a" stroke="#444" strokeWidth="2"/>
        
        {/* Globe gradient overlay */}
        <defs>
          <radialGradient id="globeGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.8"/>
            <stop offset="70%" stopColor="#1a1a1a" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/>
          </radialGradient>
          <linearGradient id="globeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#444" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#222" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#111" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        
        {/* Globe with gradient */}
        <circle cx={centerX} cy={centerY} r={radius} fill="url(#globeGradient)" stroke="#444" strokeWidth="2"/>
        
        {/* Globe highlight */}
        <circle cx={centerX} cy={centerY} r={radius} fill="url(#globeHighlight)" stroke="none"/>
        
        {/* Longitude lines */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = centerX + Math.cos(angle) * radius;
          const y1 = centerY + Math.sin(angle) * radius;
          const x2 = centerX - Math.cos(angle) * radius;
          const y2 = centerY - Math.sin(angle) * radius;
          return (
            <line key={`long-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="0.5" opacity="0.4"/>
          );
        })}
        
        {/* Latitude lines */}
        {[-60, -30, 0, 30, 60].map((lat, i) => {
          const y = centerY + Math.sin(lat * Math.PI / 180) * radius;
          const width = Math.cos(lat * Math.PI / 180) * radius * 2;
          if (width > 0) {
            return (
              <ellipse key={`lat-${i}`} cx={centerX} cy={y} rx={width/2} ry="2" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.4"/>
            );
          }
          return null;
        })}
        
        {/* Rotating continents */}
        <g transform={`rotate(${rotationAngle} ${centerX} ${centerY})`}>
          {/* North America */}
          <path d={`M${centerX-40} ${centerY-20} Q${centerX-20} ${centerY-30} ${centerX} ${centerY-25} Q${centerX+20} ${centerY-20} ${centerX+30} ${centerY-10} Q${centerX+25} ${centerY+5} ${centerX+15} ${centerY+10} Q${centerX-10} ${centerY+5} ${centerX-40} ${centerY-20} Z`} 
                fill="#2a2a2a" stroke="#444" strokeWidth="0.5" opacity="0.7"/>
          
          {/* Europe */}
          <path d={`M${centerX-25} ${centerY-15} Q${centerX-15} ${centerY-20} ${centerX-5} ${centerY-18} Q${centerX+5} ${centerY-15} ${centerX+10} ${centerY-10} Q${centerX+8} ${centerY-5} ${centerX+5} ${centerY} Q${centerX-5} ${centerY-5} ${centerX-25} ${centerY-15} Z`} 
                fill="#2a2a2a" stroke="#444" strokeWidth="0.5" opacity="0.7"/>
          
          {/* Asia */}
          <path d={`M${centerX+5} ${centerY-20} Q${centerX+25} ${centerY-25} ${centerX+35} ${centerY-20} Q${centerX+40} ${centerY-10} ${centerX+35} ${centerY+5} Q${centerX+25} ${centerY+10} ${centerX+15} ${centerY+8} Q${centerX+5} ${centerY+5} ${centerX+5} ${centerY-20} Z`} 
                fill="#2a2a2a" stroke="#444" strokeWidth="0.5" opacity="0.7"/>
          
          {/* Africa */}
          <path d={`M${centerX-10} ${centerY+5} Q${centerX-5} ${centerY-5} ${centerX+5} ${centerY-8} Q${centerX+10} ${centerY-5} ${centerX+15} ${centerY+5} Q${centerX+10} ${centerY+15} ${centerX+5} ${centerY+20} Q${centerX-5} ${centerY+15} ${centerX-10} ${centerY+5} Z`} 
                fill="#2a2a2a" stroke="#444" strokeWidth="0.5" opacity="0.7"/>
          
          {/* South America */}
          <path d={`M${centerX-35} ${centerY+10} Q${centerX-25} ${centerY+5} ${centerX-20} ${centerY+15} Q${centerX-25} ${centerY+25} ${centerX-30} ${centerY+30} Q${centerX-35} ${centerY+25} ${centerX-35} ${centerY+10} Z`} 
                fill="#2a2a2a" stroke="#444" strokeWidth="0.5" opacity="0.7"/>
        </g>
        
        {/* Target marker */}
        <circle cx={targetX} cy={targetY} r="8" fill="#ff4444" stroke="#ff6666" strokeWidth="2" opacity={pulseIntensity}>
          <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        
        {/* Target crosshairs */}
        <line x1={targetX-12} y1={targetY} x2={targetX+12} y2={targetY} stroke="#fff" strokeWidth="1" opacity="0.8"/>
        <line x1={targetX} y1={targetY-12} x2={targetX} y2={targetY+12} stroke="#fff" strokeWidth="1" opacity="0.8"/>
        
        {/* Scanning beam */}
        <line x1={centerX} y1={centerY} x2={targetX} y2={targetY} stroke="#00ff00" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite"/>
        </line>
        
        {/* Orbital rings */}
        <ellipse cx={centerX} cy={centerY} rx={radius+15} ry={(radius+15)*0.6} fill="none" stroke="#444" strokeWidth="1" opacity="0.3"/>
        <ellipse cx={centerX} cy={centerY} rx={radius+25} ry={(radius+25)*0.6} fill="none" stroke="#444" strokeWidth="1" opacity="0.2"/>
        
        {/* Data satellites */}
        {[...Array(3)].map((_, i) => {
          const angle = (scanProgress * 3.6 + i * 120) * Math.PI / 180;
          const x = centerX + Math.cos(angle) * (radius + 20);
          const y = centerY + Math.sin(angle) * (radius + 20) * 0.6;
          return (
            <circle key={`sat-${i}`} cx={x} cy={y} r="2" fill="#00ff00" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
            </circle>
          );
        })}
        
        {/* Connection lines to satellites */}
        {[...Array(3)].map((_, i) => {
          const angle = (scanProgress * 3.6 + i * 120) * Math.PI / 180;
          const x = centerX + Math.cos(angle) * (radius + 20);
          const y = centerY + Math.sin(angle) * (radius + 20) * 0.6;
          return (
            <line key={`conn-${i}`} x1={centerX} y1={centerY} x2={x} y2={y} stroke="#444" strokeWidth="0.5" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
            </line>
          );
        })}
        
        {/* Status text */}
        <text x={centerX} y={centerY+radius+25} textAnchor="middle" className="fill-white text-xs font-mono">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
          TARGET: {currentCountry.name}
        </text>
        
        {/* Rotation indicator */}
        <text x={centerX} y={centerY-radius-15} textAnchor="middle" className="fill-green-400 text-xs font-mono">
          ROTATING • {String(scanProgress).padStart(3, '0')}°
        </text>
      </svg>
    );
  };

  return (
    <div 
      className={`glass-effect rounded-lg p-6 card-hover transition-all duration-500 ${
        isHovered ? 'transform scale-105 shadow-2xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        boxShadow: isHovered ? '0 20px 60px rgba(255, 68, 68, 0.4), 0 0 40px rgba(255, 68, 68, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header with animated title */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white font-mono tracking-wider">
          <span className="inline-block animate-pulse">TARGET</span> OPERATION
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-mono">LIVE</span>
        </div>
      </div>
      
      {/* Region with glow effect */}
      <h4 className="text-accent-red font-bold text-xl mb-4 relative font-mono tracking-wider">
        {currentCountry.name}
        <div className="absolute inset-0 text-accent-red opacity-30 blur-sm animate-pulse font-mono">
          {currentCountry.name}
        </div>
      </h4>
      
      {/* Globe container with 3D effect */}
      <div 
        className="mb-4 relative overflow-hidden rounded-lg"
        style={{
          transform: isHovered ? 'perspective(1000px) rotateX(-5deg) rotateY(5deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: 'transform 0.5s ease'
        }}
      >
        {getGlobeSVG()}
        
        {/* Overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scan lines */}
          <div 
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"
            style={{
              top: `${scanProgress}%`,
              animation: 'scanLine 2s linear infinite'
            }}
          ></div>
          
          {/* Corner indicators */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-accent-red opacity-60 animate-pulse"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-accent-red opacity-60 animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-accent-red opacity-60 animate-pulse"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-accent-red opacity-60 animate-pulse"></div>
        </div>
      </div>
      
      {/* Description with typewriter effect */}
      <p className="text-gray-300 text-sm leading-relaxed mb-2 relative">
        <span className="inline-block w-1 h-4 bg-accent-red ml-1 animate-pulse"></span>
        {currentCountry.description}
      </p>
      
      {/* Status bar with animated progress */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>Last updated: {getCurrentTime()}</span>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-red to-accent-orange transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
          <span className="text-accent-red font-mono">ACTIVE</span>
        </div>
      </div>
      
      {/* Additional status indicators */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="text-green-400">● SATELLITE LINK</span>
          <span className="text-blue-400">● GLOBAL POSITION</span>
          <span className="text-yellow-400">● ORBIT TRACKING</span>
        </div>
        <div className="text-accent-orange font-mono">
          {String(scanProgress).padStart(3, '0')}° ROTATION
        </div>
      </div>

      {/* View All Operations Button */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>VIEW ALL OPERATIONS</span>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>

      {/* Modal */}
      <OperationsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default TargetOperation;
