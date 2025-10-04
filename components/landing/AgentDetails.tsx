'use client';

import React, { useState, useEffect } from 'react';
import { appStore } from '@/lib/store';
import { formatPublicKey, connectWallet, disconnectWallet, isPhantomAvailable, getCurrentUser, isUserAuthenticated } from '@/lib/wallet/utils';
import { walletAuthService } from '@/lib/walletAuth';

const AgentDetails = () => {
  const [walletState, setWalletState] = useState(appStore.getState().wallet);
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  
  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = appStore.subscribe((state) => {
      setWalletState(state.wallet);
      
      // If wallet is disconnected, clear user state
      if (!state.wallet.isConnected) {
        setUser(null);
      }
    });
    
    return unsubscribe;
  }, []);
  
  // Generate agent info based on user authentication
  const getAgentInfo = () => {
    if (user) {
      return {
        agentId: user.username,
        codeName: generateCodeName(user.wallet_address),
        walletConnected: true,
        publicKey: user.wallet_address,
        walletName: 'Phantom',
        totalPoints: user.total_points,
        level: user.level,
        experience: user.experience_points
      };
    }
    
    return {
      agentId: 'GUEST',
      codeName: 'WHISSPERIA',
      walletConnected: false,
      publicKey: null,
      walletName: null,
      totalPoints: 0,
      level: 1,
      experience: 0
    };
  };
  
  const generateCodeName = (publicKey: string) => {
    // Generate a code name based on public key
    const names = ['WHISSPERIA', 'SHADOWSTRIKE', 'NIGHTFALL', 'GHOSTWALKER', 'STEALTHWING'];
    const hash = publicKey.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return names[Math.abs(hash) % names.length];
  };
  
  const agentInfo = getAgentInfo();
  
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      // Check if Phantom is available
      if (!isPhantomAvailable()) {
        alert('Phantom wallet not found. Please install Phantom wallet from https://phantom.app/');
        return;
      }

      // Attempt to connect and authenticate
      const result = await connectWallet();
      
      if (result.success && result.user) {
        console.log('Connected to wallet ' + result.user.wallet_address);
        
        // Update local state with authenticated user
        setUser(result.user);
        
        // Update store (same as PhantomWallet component)
        appStore.getState().setWalletConnected(true, result.user.wallet_address, 'Phantom');
        
        // Success message removed - no alert popup
      } else {
        console.error('Failed to connect wallet:', result.error);
        alert(result.error || 'Failed to connect wallet');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = async () => {
    console.log('🔌 Disconnect wallet button clicked');
    setIsConnecting(true);
    try {
      const result = await disconnectWallet();
      
      if (result.success) {
        console.log('Disconnected from wallet');
        
        // Clear local user state
        setUser(null);
        
        // Update store
        appStore.getState().setWalletDisconnected();
        
        // Success message removed - no alert popup
      } else {
        console.error('Failed to disconnect wallet:', result.error);
        alert(result.error || 'Failed to disconnect wallet');
      }
    } catch (error) {
      console.error('Wallet disconnection error:', error);
      alert('Failed to disconnect wallet');
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white font-mono tracking-wider">AGENT DETAILS</h3>
        <div className="flex space-x-1">
          <div className={`w-2 h-2 rounded-full ${agentInfo.walletConnected ? 'bg-green-400 pulse-glow' : 'bg-accent-red pulse-glow'}`}></div>
          <div className={`w-2 h-2 rounded-full ${agentInfo.walletConnected ? 'bg-green-300' : 'bg-accent-orange'}`}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        {agentInfo.walletConnected 
          ? `Connected via ${agentInfo.walletName} - Intelligence personnel dossier` 
          : 'Detailed dossier of intelligence personnel'
        }
      </p>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-accent-red to-accent-orange rounded-lg flex items-center justify-center glow-effect">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white/60 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">AGENT:</span>
              <span className="text-white font-mono bg-dark-border px-2 py-1 rounded">{agentInfo.agentId}</span>
            </div>
            {user && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">LEVEL:</span>
                  <span className="text-accent-red font-mono bg-dark-border px-2 py-1 rounded">{agentInfo.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">POINTS:</span>
                  <span className="text-green-400 font-mono bg-dark-border px-2 py-1 rounded">{agentInfo.totalPoints}</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-400">WALLET:</span>
              <span className="text-white font-mono bg-dark-border px-2 py-1 rounded">
                {agentInfo.walletConnected ? agentInfo.walletName : 'DISCONNECTED'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">CODE NAME:</span>
              <span className="text-accent-red font-mono bg-accent-red/10 px-2 py-1 rounded tech-border">{agentInfo.codeName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">STATUS:</span>
              <span className={`font-mono px-2 py-1 rounded ${
                agentInfo.walletConnected 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-yellow-400 bg-yellow-400/10'
              }`}>
                {agentInfo.walletConnected ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            {agentInfo.walletConnected && walletState.publicKey && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">KEY:</span>
                <span className="text-gray-300 font-mono text-xs bg-dark-border px-2 py-1 rounded">
                  {formatPublicKey(walletState.publicKey)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Status indicators */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-border">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${agentInfo.walletConnected ? 'bg-green-400 pulse-glow' : 'bg-gray-500'}`}></div>
          <span className="text-xs text-gray-400">{agentInfo.walletConnected ? 'CONNECTED' : 'OFFLINE'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${agentInfo.walletConnected ? 'bg-green-400' : 'bg-accent-red'}`}></div>
          <span className="text-xs text-gray-400">{agentInfo.walletConnected ? 'AUTHENTICATED' : 'CLASSIFIED'}</span>
        </div>
      </div>
      
      {/* Wallet connection buttons */}
      <div className="mt-4 pt-4 border-t border-dark-border">
        {!agentInfo.walletConnected ? (
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className={`w-full text-white text-sm font-semibold py-2 px-4 rounded transition-all duration-200 ${
              isConnecting 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-accent-red hover:bg-accent-red/80 glow-effect'
            }`}
          >
            {isConnecting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              'Connect Phantom Wallet'
            )}
          </button>
        ) : (
          <div className="space-y-2">
            <div className="text-center text-xs text-green-400 mb-2">
              ✓ Wallet Connected Successfully
            </div>
            <button
              onClick={handleDisconnectWallet}
              disabled={isConnecting}
              className={`w-full text-white text-sm font-semibold py-2 px-4 rounded transition-all duration-200 ${
                isConnecting 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {isConnecting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Disconnecting...</span>
                </div>
              ) : (
                'Disconnect Wallet'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetails;
