'use client';

import React, { useState, useEffect } from 'react';

// Mock data for agents
const mockAgents = [
  { id: 'G-078W', name: 'VENGEFUL SPIRIT', status: 'active' },
  { id: 'G-079X', name: 'OBSIDIAN SENTINEL', status: 'undercover' },
  { id: 'G-080Y', name: 'SHADOW STRIKER', status: 'training' },
  { id: 'G-081Z', name: 'NIGHT HUNTER', status: 'active' },
  { id: 'G-082A', name: 'STEALTH WOLF', status: 'undercover' },
  { id: 'G-083B', name: 'PHANTOM RIDER', status: 'training' },
  { id: 'G-084C', name: 'DARK ANGEL', status: 'active' },
  { id: 'G-085D', name: 'SILENT STORM', status: 'undercover' },
  { id: 'G-086E', name: 'CRIMSON BLADE', status: 'training' },
  { id: 'G-087F', name: 'IRON FIST', status: 'active' },
  { id: 'G-088G', name: 'FROST WIND', status: 'undercover' },
  { id: 'G-089H', name: 'THUNDER BOLT', status: 'training' },
  { id: 'G-090I', name: 'FIRE STORM', status: 'active' },
  { id: 'G-091J', name: 'ICE QUEEN', status: 'undercover' },
  { id: 'G-092K', name: 'LIGHTNING STRIKE', status: 'training' },
];

// Mock activity log data
const mockActivityLog = [
  { time: '25/06/2025 09:29', action: 'Agent gh0st Fire completed mission in Berlin with agent zer0 Nigh' },
  { time: '25/06/2025 09:15', action: 'Agent Shadow completed mission in Tokyo with agent Phantom' },
  { time: '25/06/2025 08:45', action: 'Agent Storm completed mission in London with agent Night' },
  { time: '25/06/2025 08:30', action: 'Agent Fire completed mission in Paris with agent Wind' },
  { time: '25/06/2025 08:15', action: 'Agent Ice completed mission in Moscow with agent Thunder' },
  { time: '25/06/2025 08:00', action: 'Agent Lightning completed mission in New York with agent Storm' },
];

// Mock chat activity data
const mockChatActivity = [
  { time: '2025-06-17 14:23 UTC', message: 'INIT >> AAA loading secure channel...' },
  { time: '2025-06-17 14:24 UTC', message: 'CHKΣ | 1231.908ΔΔ54.500... xR3' },
  { time: '2025-06-17 14:25 UTC', message: 'KEY LOCKED' },
  { time: '2025-06-17 14:26 UTC', message: 'RESP >> ... ACK... syncing #546..Φ' },
  { time: '2025-06-17 14:27 UTC', message: 'NODE-4: 87867 [loading bar] loading' },
  { time: '2025-06-17 14:28 UTC', message: 'DATA/ENCRYPT :: .4.. % complete' },
  { time: '2025-06-17 14:29 UTC', message: 'COMMS STATUS: distorted' },
  { time: '2025-06-17 14:30 UTC', message: 'DECRYPT LOG: "requesting visual on suspect-41 - triangulating path..."' },
  { time: '2025-06-17 14:31 UTC', message: 'SYSTEM WARNING :: ↑↑↑ UNUSUAL TRAFFIC FROM NODE-6' },
];

// 3D Wireframe Sphere Component
const WireframeSphere: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ 
          filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 0.1s linear'
        }}
      >
        {/* Sphere wireframe */}
        <g stroke="rgba(255, 255, 255, 0.7)" strokeWidth="0.8" fill="none">
          {/* Horizontal circles */}
          <ellipse cx="100" cy="50" rx="40" ry="15" />
          <ellipse cx="100" cy="75" rx="50" ry="20" />
          <ellipse cx="100" cy="100" rx="60" ry="25" />
          <ellipse cx="100" cy="125" rx="50" ry="20" />
          <ellipse cx="100" cy="150" rx="40" ry="15" />
          
          {/* Vertical circles */}
          <ellipse cx="50" cy="100" rx="15" ry="40" />
          <ellipse cx="75" cy="100" rx="20" ry="50" />
          <ellipse cx="125" cy="100" rx="20" ry="50" />
          <ellipse cx="150" cy="100" rx="15" ry="40" />
          
          {/* Diagonal lines for 3D effect */}
          <line x1="60" y1="50" x2="140" y2="150" />
          <line x1="140" y1="50" x2="60" y2="150" />
          <line x1="50" y1="60" x2="150" y2="140" />
          <line x1="150" y1="60" x2="50" y2="140" />
        </g>
        
        {/* Animated data particles */}
        <circle cx="100" cy="100" r="2" fill="rgba(255, 68, 68, 0.9)" className="animate-pulse" />
        <circle cx="80" cy="80" r="1" fill="rgba(0, 255, 255, 0.7)" className="animate-ping" />
        <circle cx="120" cy="120" r="1" fill="rgba(0, 255, 255, 0.7)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
        <circle cx="100" cy="60" r="1" fill="rgba(255, 255, 255, 0.8)" className="animate-ping" style={{ animationDelay: '1s' }} />
      </svg>
    </div>
  );
};

// Mission Activity Chart Component
const MissionActivityChart: React.FC = () => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 bg-gray-900 rounded border border-gray-700 p-4">
      <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-full text-xs text-gray-400">
          <span>500</span>
          <span>400</span>
          <span>300</span>
          <span>200</span>
        </div>
        
        {/* Chart area */}
        <div className="flex-1 relative h-full ml-4">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="absolute w-full border-t border-gray-700"
                style={{ top: `${25 * i}%` }}
              />
            ))}
          </div>
          
          {/* Animated chart lines */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Primary line (white) */}
            <polyline
              points="0,80 20,75 40,85 60,70 80,90 100,65 120,80 140,75 160,85 180,70 200,90"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="opacity-80"
            />
            
            {/* Secondary line (dashed gray) */}
            <polyline
              points="0,100 20,95 40,105 60,90 80,110 100,85 120,100 140,95 160,105 180,90 200,110"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            
            {/* Animated scanning line */}
            <line
              x1={`${animationProgress * 2}%`}
              y1="0"
              x2={`${animationProgress * 2}%`}
              y2="100%"
              stroke="rgba(255, 68, 68, 0.6)"
              strokeWidth="1"
              className="opacity-60"
            />
          </svg>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Jan 28, 2025</span>
        <span>Feb 28, 2025</span>
      </div>
    </div>
  );
};

// Loading bar component
const LoadingBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Typing Animation Component
const TypingAnimation: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayedText}</span>;
};

export default function AgentDashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Real-time data states
  const [liveAgentData, setLiveAgentData] = useState({
    active: 190,
    undercover: 990,
    training: 290,
    total: 1470
  });
  
  const [liveActivityLog, setLiveActivityLog] = useState(mockActivityLog);
  const [liveChatActivity, setLiveChatActivity] = useState(mockChatActivity);
  const [liveMissionData, setLiveMissionData] = useState({
    successful: { high: 190, medium: 426, low: 920 },
    failed: { high: 12, medium: 28, low: 45 }
  });
  
  const [loadingBarProgress, setLoadingBarProgress] = useState(50);

  useEffect(() => {
    // Set client flag and initial time
    setIsClient(true);
    setCurrentTime(new Date());
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 8000);
    return () => clearTimeout(typingTimer);
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (!isClient) return;

    const updateInterval = setInterval(() => {
      // Update agent data with small random variations
      setLiveAgentData(prev => {
        const newData = {
          active: Math.max(180, Math.min(200, prev.active + Math.floor(Math.random() * 6) - 3)),
          undercover: Math.max(980, Math.min(1000, prev.undercover + Math.floor(Math.random() * 6) - 3)),
          training: Math.max(280, Math.min(300, prev.training + Math.floor(Math.random() * 6) - 3)),
          total: 0
        };
        newData.total = newData.active + newData.undercover + newData.training;
        return newData;
      });

      // Add new activity log entries
      const newActivities = [
        'Agent Alpha completed surveillance mission in Sector 7',
        'Agent Beta initiated data extraction protocol',
        'Agent Gamma reported suspicious activity in Zone 3',
        'Agent Delta completed infiltration mission in Building A',
        'Agent Echo started reconnaissance operation in Area 5',
        'Agent Foxtrot detected security breach in Network B',
        'Agent Golf completed extraction mission in Location C',
        'Agent Hotel initiated counter-intelligence operation'
      ];

      if (Math.random() > 0.7) {
        const newActivity = {
          time: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          action: newActivities[Math.floor(Math.random() * newActivities.length)]
        };
        
        setLiveActivityLog(prev => [newActivity, ...prev.slice(0, 5)]);
      }

      // Add new chat activity
      const newChatMessages = [
        'INIT >> Establishing secure connection...',
        'CHKΣ | Data stream encrypted successfully',
        'NODE-7: 45231 [loading bar] processing',
        'RESP >> ... ACK... syncing #789..Φ',
        'DATA/ENCRYPT :: 67.3% complete',
        'COMMS STATUS: stable',
        'DECRYPT LOG: "analyzing target patterns - calculating trajectory..."',
        'SYSTEM ALERT :: ↑↑↑ INCREASED ACTIVITY FROM NODE-3'
      ];

      if (Math.random() > 0.8) {
        const newChat = {
          time: new Date().toISOString().slice(0, 19) + ' UTC',
          message: newChatMessages[Math.floor(Math.random() * newChatMessages.length)]
        };
        
        setLiveChatActivity(prev => [newChat, ...prev.slice(0, 8)]);
      }

      // Update mission data
      setLiveMissionData(prev => ({
        successful: {
          high: Math.max(180, Math.min(200, prev.successful.high + Math.floor(Math.random() * 4) - 2)),
          medium: Math.max(420, Math.min(430, prev.successful.medium + Math.floor(Math.random() * 4) - 2)),
          low: Math.max(915, Math.min(925, prev.successful.low + Math.floor(Math.random() * 4) - 2))
        },
        failed: {
          high: Math.max(10, Math.min(15, prev.failed.high + Math.floor(Math.random() * 3) - 1)),
          medium: Math.max(25, Math.min(30, prev.failed.medium + Math.floor(Math.random() * 3) - 1)),
          low: Math.max(40, Math.min(50, prev.failed.low + Math.floor(Math.random() * 3) - 1))
        }
      }));

      // Update loading bar progress
      setLoadingBarProgress(50 + Math.random() * 30);

    }, 3000); // Update every 3 seconds

    return () => clearInterval(updateInterval);
  }, [isClient]);

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden">
      {/* Enhanced Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,68,68,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)]"></div>
      
      {/* Animated grid background with movement */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
      </div>
      
      {/* Floating particles - handled by WireframeSphere component */}
      
      {/* Scanning lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" style={{ top: '20%', animation: 'scanLine 3s linear infinite' }} />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-30 animate-pulse" style={{ top: '60%', animation: 'scanLine 4s linear infinite reverse' }} />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30 animate-pulse" style={{ top: '80%', animation: 'scanLine 5s linear infinite' }} />
      </div>

      {/* Enhanced Header */}
      <header className="border-b border-gray-800 p-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative z-10 backdrop-blur-sm">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-50"></div>
        
        <div className="flex justify-between items-center relative">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold tracking-wider text-gray-100 mb-2 relative">
              <span className="bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent animate-pulse">
                AGENT DATA OVERVIEW
              </span>
              {/* Glowing effect behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 blur-xl animate-pulse"></div>
            </h1>
            <p className="text-sm text-gray-400 flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping shadow-lg shadow-green-500/50"></span>
              <span className="font-mono">Last Update {isClient && currentTime ? formatTime(currentTime) : '--/--/---- --:--'}</span>
            </p>
          </div>
          
          {/* Top right controls */}
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-600 transition-colors">
                JM
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-600 transition-colors">
                SW
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-600 transition-colors">
                RW
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
              <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <main className="flex flex-col lg:flex-row h-screen relative z-10">
        {/* Left Column - Agent Data */}
        <div className="w-full lg:w-1/3 border-r-0 lg:border-r border-b lg:border-b-0 border-gray-800 p-4 lg:p-6 space-y-4 lg:space-y-6 relative group">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Agent Allocation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-100">Agent Allocation</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-mono">LIVE</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-3 lg:p-4 text-center hover:border-green-500 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 group relative overflow-hidden">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors drop-shadow-lg">
                    {isClient ? (
                      <span className="transition-all duration-500">{liveAgentData.active}</span>
                    ) : (
                      <span className="animate-pulse">190</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-green-300 transition-colors">Active Field..</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full animate-pulse shadow-lg shadow-green-500/50" style={{ width: `${(liveAgentData.active / 200) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-3 lg:p-4 text-center hover:border-yellow-500 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 group relative overflow-hidden">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors drop-shadow-lg">
                    {isClient ? liveAgentData.undercover : '990'}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-yellow-300 transition-colors">Undercover..</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full animate-pulse shadow-lg shadow-yellow-500/50" style={{ width: `${(liveAgentData.undercover / 1000) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-3 lg:p-4 text-center hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 group relative overflow-hidden">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors drop-shadow-lg">
                    {isClient ? liveAgentData.training : '290'}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors">Training..</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{ width: `${(liveAgentData.training / 300) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Agent ID Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2 relative">
              <h3 className="font-bold text-gray-100 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                Agent ID
              </h3>
              <h3 className="font-bold text-gray-100 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                Agent Identifier
              </h3>
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto no-scrollbar bg-gray-900/30 rounded-lg p-2">
              {mockAgents.map((agent, index) => (
                <div
                  key={agent.id}
                  className="flex justify-between items-center py-3 px-3 hover:bg-gray-800/50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center space-x-3 relative z-10">
                    <span className="text-sm text-gray-300 font-mono group-hover:text-cyan-300 transition-colors">{agent.id}</span>
                    <div className={`w-3 h-3 rounded-full shadow-lg ${
                      agent.status === 'active' ? 'bg-green-500 animate-pulse shadow-green-500/50' :
                      agent.status === 'undercover' ? 'bg-yellow-500 animate-pulse shadow-yellow-500/50' :
                      'bg-blue-500 animate-pulse shadow-blue-500/50'
                    }`}></div>
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-mono">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-100">Mission Information</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-orange-400 font-mono">SYNC</span>
              </div>
            </div>
            
            {/* Successful Missions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <h3 className="font-bold text-gray-100">Successful Missions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">
                    {isClient ? liveMissionData.successful.high : '190'}
                  </div>
                  <div className="text-xs text-gray-400">High Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">
                    {isClient ? liveMissionData.successful.medium : '426'}
                  </div>
                  <div className="text-xs text-gray-400">Medium Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">
                    {isClient ? liveMissionData.successful.low : '920'}
                  </div>
                  <div className="text-xs text-gray-400">Low Risk</div>
                </div>
              </div>
            </div>

            {/* Failed Missions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <h3 className="font-bold text-gray-100">Failed Missions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">
                    {isClient ? liveMissionData.failed.high : '12'}
                  </div>
                  <div className="text-xs text-gray-400">High Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">
                    {isClient ? liveMissionData.failed.medium : '28'}
                  </div>
                  <div className="text-xs text-gray-400">Medium Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">
                    {isClient ? liveMissionData.failed.low : '45'}
                  </div>
                  <div className="text-xs text-gray-400">Low Risk</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Activity & Overview */}
        <div className="w-full lg:w-1/3 border-r-0 lg:border-r border-b lg:border-b-0 border-gray-800 p-4 lg:p-6 space-y-4 lg:space-y-6 relative group">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Enhanced Activity Log */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Activity Log
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-400 font-mono">UPDATING</span>
              </div>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar bg-gray-900/30 rounded-lg p-3">
              {liveActivityLog.map((activity, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-300 hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="text-gray-500 text-xs mb-1 font-mono group-hover:text-green-400 transition-colors">{activity.time}</div>
                    <div className="group-hover:text-white transition-colors">{activity.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Mission Activity Overview */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-100 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Mission Activity Overview
            </h2>
            <div className="relative">
              <MissionActivityChart />
              {/* Glowing border around chart */}
              <div className="absolute inset-0 border border-cyan-500/20 rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Right Column - Encrypted Chat Activity */}
        <div className="w-full lg:w-1/3 p-4 lg:p-6 space-y-4 lg:space-y-6 relative group">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-100 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
              Encrypted Chat Activity
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-400 font-mono">ENCRYPTED</span>
            </div>
          </div>
          
          {/* 3D Wireframe Sphere */}
          <WireframeSphere />
          
          {/* Enhanced Chat Log */}
          <div className="space-y-2 max-h-96 overflow-y-auto no-scrollbar bg-gray-900/30 rounded-lg p-3">
            {liveChatActivity.map((chat, index) => (
              <div
                key={index}
                className="text-xs text-gray-300 hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-gray-500 mb-2 flex items-center font-mono">
                    <span className="text-red-400 mr-2 animate-pulse">#</span>
                    {isTyping && index === 0 ? (
                      <TypingAnimation text={chat.time} speed={100} />
                    ) : (
                      chat.time
                    )}
                  </div>
                  <div className="font-mono">
                    {chat.message.includes('SYSTEM WARNING') ? (
                      <span className="text-red-400 font-bold animate-pulse drop-shadow-lg">
                        {isTyping && index === mockChatActivity.length - 1 ? (
                          <TypingAnimation text={chat.message} speed={30} />
                        ) : (
                          chat.message
                        )}
                      </span>
                    ) : (
                      <span className="group-hover:text-white transition-colors">
                        {isTyping && index < 3 ? (
                          <TypingAnimation text={chat.message} speed={50} />
                        ) : (
                          chat.message
                        )}
                      </span>
                    )}
                  </div>
                  {chat.message.includes('loading bar') && (
                    <div className="mt-3">
                      <LoadingBar progress={isClient ? loadingBarProgress : 50} />
                    </div>
                  )}
                  {chat.message.includes('CHKΣ') && (
                    <div className="mt-2 text-cyan-400 animate-pulse">
                      <span className="text-xs font-mono">Processing data stream...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
