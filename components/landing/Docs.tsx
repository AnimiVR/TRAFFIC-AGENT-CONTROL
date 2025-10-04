'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: string;
}

const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      content: (
        <div className="space-y-6">
          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Welcome to Traffic Agent Control</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Traffic Agent Control is a decentralized intelligence platform where agents compete to complete missions and earn points. 
              Connect your wallet, join missions, and climb the leaderboard to become the top agent!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-dark-card/50 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-white font-semibold">Complete Missions</div>
                <div className="text-gray-400 text-sm">Earn points by joining missions</div>
              </div>
              <div className="text-center p-4 bg-dark-card/50 rounded-lg">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-white font-semibold">Climb Rankings</div>
                <div className="text-gray-400 text-sm">Compete with other agents</div>
              </div>
              <div className="text-center p-4 bg-dark-card/50 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-white font-semibold">Earn Rewards</div>
                <div className="text-gray-400 text-sm">Get points for achievements</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wallet-connection',
      title: 'Wallet Connection',
      icon: '🔗',
      content: (
        <div className="space-y-6">
          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">How to Connect Your Wallet</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Install Phantom Wallet</h4>
                  <p className="text-gray-300 mb-2">Download and install Phantom wallet from the official website:</p>
                  <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" 
                     className="text-accent-red hover:text-accent-orange transition-colors">
                    https://phantom.app
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Create or Import Wallet</h4>
                  <p className="text-gray-300">Set up your Phantom wallet with a new account or import an existing one using your seed phrase.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Connect to Platform</h4>
                  <p className="text-gray-300 mb-2">Click the "Connect Wallet" button on our platform and approve the connection in Phantom.</p>
                  <div className="bg-dark-card/50 rounded-lg p-4 mt-3">
                    <div className="text-green-400 font-mono text-sm mb-2">✅ Connection Successful</div>
                    <div className="text-gray-400 text-sm">Your wallet address will be displayed in the header</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Supported Wallets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-dark-card/50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Phantom</div>
                  <div className="text-gray-400 text-sm">Primary wallet</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-dark-card/50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Solflare</div>
                  <div className="text-gray-400 text-sm">Alternative wallet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'missions-guide',
      title: 'Missions Guide',
      icon: '🎯',
      content: (
        <div className="space-y-6">
          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">How to Complete Missions</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Browse Available Missions</h4>
                  <p className="text-gray-300 mb-2">View all available missions on the dashboard. Each mission shows:</p>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Mission code and description</li>
                    <li>• Difficulty level (Easy, Medium, High, Critical)</li>
                    <li>• Points reward (1-3 points)</li>
                    <li>• Mission type and location</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Join a Mission</h4>
                  <p className="text-gray-300 mb-2">Click "Join Mission" on any available mission. You'll instantly:</p>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Earn the mission's point reward</li>
                    <li>• See your total points increase</li>
                    <li>• Mission status changes to "Completed"</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Track Your Progress</h4>
                  <p className="text-gray-300">Monitor your points and completed missions in the dashboard. You can also view mission details by clicking "Details".</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Mission Types & Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Social Media Missions</span>
                    <span className="text-accent-red font-mono">1 point</span>
                  </div>
                  <div className="text-gray-400 text-sm">Facebook, Twitter, Instagram, YouTube tasks</div>
                </div>
                
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Website Missions</span>
                    <span className="text-accent-red font-mono">1 point</span>
                  </div>
                  <div className="text-gray-400 text-sm">Visit website, read blog, newsletter signup</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Special Missions</span>
                    <span className="text-accent-orange font-mono">2 points</span>
                  </div>
                  <div className="text-gray-400 text-sm">Survey, feedback, referral tasks</div>
                </div>
                
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Bonus Missions</span>
                    <span className="text-green-400 font-mono">3 points</span>
                  </div>
                  <div className="text-gray-400 text-sm">Early adopter, beta tester tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      icon: '🏆',
      content: (
        <div className="space-y-6">
          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">How the Leaderboard Works</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Ranking System</h4>
                  <p className="text-gray-300 mb-2">Agents are ranked by their total points earned from completed missions:</p>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• 🥇 1st Place: Gold badge with crown</li>
                    <li>• 🥈 2nd Place: Silver badge</li>
                    <li>• 🥉 3rd Place: Bronze badge</li>
                    <li>• ⭐ Top 10: Blue badge with star</li>
                    <li>• 🎯 Others: Gray badge with target</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">View Rankings</h4>
                  <p className="text-gray-300 mb-2">Access the leaderboard by:</p>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Clicking "View Leaderboard" from the dashboard</li>
                    <li>• Using the "LEADERBOARD" tab in the header</li>
                    <li>• Navigating to /leaderboard directly</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Filter & Sort</h4>
                  <p className="text-gray-300 mb-2">Use filters to customize your view:</p>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Sort by: Total Points, Level, Join Date</li>
                    <li>• Time filter: All Time, This Week, This Month</li>
                    <li>• Your rank is highlighted in a special section</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Tips to Climb the Leaderboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="text-white font-semibold mb-2">🎯 Complete All Missions</div>
                  <div className="text-gray-400 text-sm">Don't miss any available missions to maximize your points</div>
                </div>
                
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="text-white font-semibold mb-2">⚡ Quick Completion</div>
                  <div className="text-gray-400 text-sm">Complete missions as soon as they become available</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="text-white font-semibold mb-2">🏆 Focus on High-Value</div>
                  <div className="text-gray-400 text-sm">Prioritize missions with higher point rewards (2-3 points)</div>
                </div>
                
                <div className="p-4 bg-dark-card/50 rounded-lg">
                  <div className="text-white font-semibold mb-2">📈 Regular Activity</div>
                  <div className="text-gray-400 text-sm">Check back regularly for new missions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: '❓',
      content: (
        <div className="space-y-6">
          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="border-b border-dark-border pb-4">
                <h4 className="text-white font-semibold mb-2">Q: Do I need SOL tokens to participate?</h4>
                <p className="text-gray-300">A: No, you don't need any SOL tokens. Missions are free to join and only require wallet connection for authentication.</p>
              </div>

              <div className="border-b border-dark-border pb-4">
                <h4 className="text-white font-semibold mb-2">Q: Can I join the same mission multiple times?</h4>
                <p className="text-gray-300">A: No, each mission can only be completed once per user. Once you join a mission, it will show as "Completed" and you cannot join it again.</p>
              </div>

              <div className="border-b border-dark-border pb-4">
                <h4 className="text-white font-semibold mb-2">Q: How often are new missions added?</h4>
                <p className="text-gray-300">A: New missions are added regularly. Check back frequently to discover new opportunities to earn points and climb the leaderboard.</p>
              </div>

              <div className="border-b border-dark-border pb-4">
                <h4 className="text-white font-semibold mb-2">Q: What happens to my points if I disconnect my wallet?</h4>
                <p className="text-gray-300">A: Your points are saved in the database and linked to your wallet address. You can reconnect anytime and your progress will be restored.</p>
              </div>

              <div className="border-b border-dark-border pb-4">
                <h4 className="text-white font-semibold mb-2">Q: Is there a mobile app?</h4>
                <p className="text-gray-300">A: Currently, the platform is web-based and works on mobile browsers. Make sure to use Phantom mobile app for wallet connection on mobile devices.</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Q: How do I reset my progress for testing?</h4>
                <p className="text-gray-300">A: Use the "Reset Missions" button on the dashboard to clear your joined missions and start fresh. Note: This only resets mission status, not your total points.</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-border/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Need More Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-dark-card/50 rounded-lg">
                <div className="text-white font-semibold mb-2">📧 Contact Support</div>
                <div className="text-gray-400 text-sm">support@trafficagentcontrol.com</div>
              </div>
              
              <div className="p-4 bg-dark-card/50 rounded-lg">
                <div className="text-white font-semibold mb-2">💬 Community Discord</div>
                <div className="text-gray-400 text-sm">Join our Discord for help and updates</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white font-mono tracking-wider">DOCUMENTATION</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">UPDATED</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-mono mb-4">Complete guide to using Traffic Agent Control platform</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-dark-border/30 rounded-lg p-4 sticky top-4">
            <h4 className="text-white font-semibold mb-4">Table of Contents</h4>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-accent-red text-white'
                      : 'text-gray-400 hover:text-white hover:bg-dark-border'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="min-h-[600px]">
            {sections.find(section => section.id === activeSection)?.content}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-dark-border">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span className="font-mono">Last Updated: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/"
              className="text-accent-red hover:text-accent-orange text-sm font-semibold transition-colors duration-200 font-mono"
            >
              Back to Dashboard &gt;&gt;&gt;
            </Link>
            <Link 
              href="/leaderboard"
              className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200 font-mono"
            >
              View Leaderboard &gt;&gt;&gt;
            </Link>
            <Link 
              href="/traffic-agent"
              className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200 font-mono"
            >
              Traffic Agent Control &gt;&gt;&gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
