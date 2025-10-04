"use client";

import { useState } from 'react';
import Image from 'next/image';
import { appStore } from '@/lib/store';
import { connectWallet, disconnectWallet, formatPublicKey, isPhantomAvailable, waitForPhantom } from '@/lib/wallet/utils';

interface PhantomWalletProps {
  onWalletConnect?: (publicKey: string) => void;
  className?: string;
}

export default function PhantomWallet({ onWalletConnect, className = "" }: PhantomWalletProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Get wallet state from store
  const walletState = appStore.getState().wallet;

  // Debug function to check wallet status
  const debugWalletStatus = () => {
    console.log('🔍 Wallet Debug Info:');
    console.log('- Window available:', typeof window !== 'undefined');
    console.log('- Solana object:', typeof window !== 'undefined' ? window.solana : 'N/A');
    console.log('- Phantom available:', isPhantomAvailable());
    console.log('- Wallet state:', walletState);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    
    try {
      // Debug wallet status
      debugWalletStatus();
      
      // Wait for Phantom wallet to be available
      const isAvailable = await waitForPhantom(5000);
      if (!isAvailable) {
        alert('Phantom wallet not found. Please install Phantom wallet from https://phantom.app/');
        return;
      }

      const result = await connectWallet();
      
      if (result.success && result.publicKey) {
        console.log('Connected to wallet ' + result.publicKey);
        
        // Update store
        appStore.getState().setWalletConnected(true, result.publicKey, 'Phantom');
        
        // Call callback if provided
        onWalletConnect?.(result.publicKey);
      } else {
        console.error('Failed to connect wallet:', result.error);
        alert(result.error || 'Failed to connect wallet');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    
    try {
      const result = await disconnectWallet();
      
      if (result.success) {
        console.log('Disconnected from wallet');
        
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
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {walletState.isConnected ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-500/30 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-400">
              {walletState.publicKey ? formatPublicKey(walletState.publicKey) : 'Connected'}
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            disabled={isLoading}
            className="px-2 py-1 text-xs bg-red-900/20 border border-red-500/30 text-red-400 hover:bg-red-900/30 rounded disabled:opacity-50"
          >
            {isLoading ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1 bg-blue-900/20 border border-blue-500/30 text-blue-400 hover:bg-blue-900/30 rounded disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Image src="/images/phantomwallet.jpg" alt="Wallet" width={24} height={24} className="w-6 h-6" />
          )}
          <span className="text-sm font-bold">
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </span>
        </button>
      )}
    </div>
  );
}
