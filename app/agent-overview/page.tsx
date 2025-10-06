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
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ 
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 0.1s linear'
        }}
      >
        {/* Sphere wireframe */}
        <g stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.5" fill="none">
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
        <circle cx="100" cy="100" r="2" fill="rgba(255, 68, 68, 0.8)" className="animate-pulse" />
        <circle cx="80" cy="80" r="1" fill="rgba(0, 255, 255, 0.6)" className="animate-ping" />
        <circle cx="120" cy="120" r="1" fill="rgba(0, 255, 255, 0.6)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
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

export default function AgentOverviewPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [isClient, setIsClient] = useState(false);

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
    }, 5000);
    return () => clearTimeout(typingTimer);
  }, []);

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
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,68,68,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.05)_0%,transparent_50%)]"></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      {/* Header */}
      <header className="border-b border-gray-800 p-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold tracking-wider text-gray-100 mb-2 animate-pulse">
              AGENT DATA OVERVIEW
            </h1>
            <p className="text-sm text-gray-400 flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></span>
              Last Update {isClient && currentTime ? formatTime(currentTime) : '--/--/---- --:--'}
            </p>
          </div>
          
          {/* Top right controls */}
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                JM
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                SW
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
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
        <div className="w-full lg:w-1/3 border-r-0 lg:border-r border-b lg:border-b-0 border-gray-800 p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Agent Allocation */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-100">Agent Allocation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-700 p-3 lg:p-4 text-center hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">190</div>
                <div className="text-xs text-gray-400">Active Field..</div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div className="bg-green-500 h-1 rounded-full animate-pulse" style={{ width: '76%' }}></div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 p-3 lg:p-4 text-center hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 group">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">990</div>
                <div className="text-xs text-gray-400">Undercover..</div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div className="bg-yellow-500 h-1 rounded-full animate-pulse" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 p-3 lg:p-4 text-center hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">290</div>
                <div className="text-xs text-gray-400">Training..</div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent ID Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <h3 className="font-bold text-gray-100">Agent ID</h3>
              <h3 className="font-bold text-gray-100">Agent Identifier</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
              {mockAgents.map((agent, index) => (
                <div
                  key={agent.id}
                  className="flex justify-between items-center py-2 px-2 hover:bg-gray-900 rounded transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300">{agent.id}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-green-500 animate-pulse' :
                      agent.status === 'undercover' ? 'bg-yellow-500 animate-pulse' :
                      'bg-blue-500 animate-pulse'
                    }`}></div>
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-100">Mission Information</h2>
            
            {/* Successful Missions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <h3 className="font-bold text-gray-100">Successful Missions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">190</div>
                  <div className="text-xs text-gray-400">High Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">426</div>
                  <div className="text-xs text-gray-400">Medium Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">920</div>
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
                  <div className="text-base lg:text-lg font-bold text-white">190</div>
                  <div className="text-xs text-gray-400">High Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">426</div>
                  <div className="text-xs text-gray-400">Medium Risk</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-2 lg:p-3 text-center">
                  <div className="text-base lg:text-lg font-bold text-white">920</div>
                  <div className="text-xs text-gray-400">Low Risk</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Activity & Overview */}
        <div className="w-full lg:w-1/3 border-r-0 lg:border-r border-b lg:border-b-0 border-gray-800 p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Activity Log */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-100">Activity Log</h2>
            <div className="space-y-3 max-h-48 overflow-y-auto no-scrollbar">
              {mockActivityLog.map((activity, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-300 hover:bg-gray-900 p-2 rounded transition-colors"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-gray-500 text-xs mb-1">{activity.time}</div>
                  <div>{activity.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Activity Overview */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-100">Mission Activity Overview</h2>
            <MissionActivityChart />
          </div>
        </div>

        {/* Right Column - Encrypted Chat Activity */}
        <div className="w-full lg:w-1/3 p-4 lg:p-6 space-y-4 lg:space-y-6">
          <h2 className="text-lg font-bold text-gray-100">Encrypted Chat Activity</h2>
          
          {/* 3D Wireframe Sphere */}
          <WireframeSphere />
          
          {/* Chat Log */}
          <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar">
            {mockChatActivity.map((chat, index) => (
              <div
                key={index}
                className="text-xs text-gray-300 hover:bg-gray-900 p-2 rounded transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-gray-500 mb-1 flex items-center">
                  <span className="text-red-400 mr-2">#</span>
                  {isTyping && index === 0 ? (
                    <TypingAnimation text={chat.time} speed={100} />
                  ) : (
                    chat.time
                  )}
                </div>
                <div className="font-mono">
                  {chat.message.includes('SYSTEM WARNING') ? (
                    <span className="text-red-400 font-bold animate-pulse">
                      {isTyping && index === mockChatActivity.length - 1 ? (
                        <TypingAnimation text={chat.message} speed={30} />
                      ) : (
                        chat.message
                      )}
                    </span>
                  ) : (
                    <span>
                      {isTyping && index < 3 ? (
                        <TypingAnimation text={chat.message} speed={50} />
                      ) : (
                        chat.message
                      )}
                    </span>
                  )}
                </div>
                {chat.message.includes('loading bar') && (
                  <div className="mt-2">
                    <LoadingBar progress={isClient ? Math.random() * 100 : 50} />
                  </div>
                )}
                {chat.message.includes('CHKΣ') && (
                  <div className="mt-2 text-cyan-400 animate-pulse">
                    <span className="text-xs">Processing data stream...</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
