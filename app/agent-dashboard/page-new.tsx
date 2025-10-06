'use client';

import React, { useState, useEffect } from 'react';
import WireframeSphere from '../../components/landing/WireframeSphere';
import LoadingBar from '../../components/landing/LoadingBar';

// Mock data for agents - removed unused variable

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

// Typewriter Text Component
const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

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
    training: 290
  });

  const [liveMissionData, setLiveMissionData] = useState({
    successful: { high: 190, medium: 426, low: 920 },
    failed: { high: 12, medium: 28, low: 45 }
  });

  const [loadingBarProgress, setLoadingBarProgress] = useState(50);

  // Initialize client-side state
  useEffect(() => {
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
    }, 3000);
    return () => clearTimeout(typingTimer);
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (!isClient) return;

    const updateInterval = setInterval(() => {
      // Update agent data with small random variations
      setLiveAgentData(prev => ({
        active: Math.max(180, Math.min(200, prev.active + Math.floor(Math.random() * 6) - 3)),
        undercover: Math.max(980, Math.min(1000, prev.undercover + Math.floor(Math.random() * 6) - 3)),
        training: Math.max(280, Math.min(300, prev.training + Math.floor(Math.random() * 6) - 3))
      }));

      // Update mission data
      setLiveMissionData(prev => ({
        successful: {
          high: Math.max(180, Math.min(200, prev.successful.high + Math.floor(Math.random() * 4) - 2)),
          medium: Math.max(420, Math.min(430, prev.successful.medium + Math.floor(Math.random() * 4) - 2)),
          low: Math.max(910, Math.min(930, prev.successful.low + Math.floor(Math.random() * 4) - 2))
        },
        failed: {
          high: Math.max(10, Math.min(15, prev.failed.high + Math.floor(Math.random() * 2) - 1)),
          medium: Math.max(25, Math.min(30, prev.failed.medium + Math.floor(Math.random() * 2) - 1)),
          low: Math.max(40, Math.min(50, prev.failed.low + Math.floor(Math.random() * 2) - 1))
        }
      }));

      // Update loading bar progress
      setLoadingBarProgress(prev => (prev + Math.floor(Math.random() * 3) - 1) % 100);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(updateInterval);
  }, [isClient]);

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
      </div>
      
      {/* Scanning lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
            AGENT DASHBOARD
          </h1>
          <p className="text-sm text-gray-400 flex items-center justify-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping shadow-lg shadow-green-500/50"></span>
            <span className="font-mono">Last Update {isClient && currentTime ? formatTime(currentTime) : '--/--/---- --:--'}</span>
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Agent Status */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                Agent Status
              </h2>
              
              <div className="space-y-4">
                {/* Active Agents */}
                <div className="group relative bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-green-500 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors drop-shadow-lg">
                      {isClient ? (
                        <span className="transition-all duration-500">{liveAgentData.active}</span>
                      ) : (
                        <span className="animate-pulse">190</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-green-300 transition-colors">Active Agents</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500" style={{ width: `${(liveAgentData.active / 200) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Undercover Agents */}
                <div className="group relative bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-yellow-500 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors drop-shadow-lg">
                      {isClient ? liveAgentData.undercover : '990'}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-yellow-300 transition-colors">Undercover..</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500" style={{ width: `${(liveAgentData.undercover / 1000) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Training Agents */}
                <div className="group relative bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors drop-shadow-lg">
                      {isClient ? liveAgentData.training : '290'}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors">Training..</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500" style={{ width: `${(liveAgentData.training / 300) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Wireframe Sphere */}
          <div className="flex items-center justify-center">
            <WireframeSphere />
          </div>

          {/* Right Column - Mission Data */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                Mission Data
              </h2>
              
              <div className="space-y-4">
                {/* Successful Missions */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <div className="text-sm font-bold text-green-400 mb-3">Successful Missions</div>
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
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <div className="text-sm font-bold text-red-400 mb-3">Failed Missions</div>
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
          </div>
        </div>

        {/* Bottom Section - Activity Log and Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Log */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Activity Log
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockActivityLog.map((log, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 font-mono">{log.time}</div>
                    <div className="text-sm text-white mt-1">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Encrypted Chat Activity */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Encrypted Chat Activity
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockChatActivity.map((chat, index) => (
                <div key={index} className="p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                  <div className="text-xs text-gray-400 font-mono mb-1">{chat.time}</div>
                  <div className="text-sm text-white font-mono">
                    {isTyping && index === 0 ? (
                      <TypewriterText text={chat.message} speed={30} />
                    ) : (
                      chat.message
                    )}
                  </div>
                  {chat.message.includes('loading bar') && (
                    <div className="mt-3">
                      <LoadingBar progress={isClient ? loadingBarProgress : 50} />
                    </div>
                  )}
                  {chat.message.includes('CHKΣ') && (
                    <div className="mt-2 text-xs text-yellow-400 font-mono">
                      <span className="animate-pulse">●</span> Encryption Level: MAXIMUM
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


