import React from 'react';
import Link from 'next/link';
import Docs from '@/components/landing/Docs';
import Header from '@/components/landing/Header';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-red/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white font-mono tracking-wider mb-2">
              DOCUMENTATION
            </h1>
            <p className="text-gray-400 font-mono">
              Complete guide to Agent Mission Control ( AMC ) platform
            </p>
          </div>

          {/* Docs Component */}
          <Docs />

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-accent-red font-mono mb-2">🚀</div>
              <div className="text-white font-semibold mb-1">Quick Start</div>
              <div className="text-gray-400 text-sm font-mono mb-3">Get started in minutes</div>
              <Link 
                href="/"
                className="text-accent-red hover:text-accent-orange text-sm font-semibold transition-colors duration-200 font-mono"
              >
                Go to Dashboard &gt;&gt;&gt;
              </Link>
            </div>
            
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-accent-orange font-mono mb-2">🏆</div>
              <div className="text-white font-semibold mb-1">Leaderboard</div>
              <div className="text-gray-400 text-sm font-mono mb-3">See top performers</div>
              <Link 
                href="/leaderboard"
                className="text-accent-red hover:text-accent-orange text-sm font-semibold transition-colors duration-200 font-mono"
              >
                View Rankings &gt;&gt;&gt;
              </Link>
            </div>
            
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 font-mono mb-2">💡</div>
              <div className="text-white font-semibold mb-1">Need Help?</div>
              <div className="text-gray-400 text-sm font-mono mb-3">Contact our support</div>
              <a 
                href="mailto:support@trafficagentcontrol.com"
                className="text-accent-red hover:text-accent-orange text-sm font-semibold transition-colors duration-200 font-mono"
              >
                Contact Support &gt;&gt;&gt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
