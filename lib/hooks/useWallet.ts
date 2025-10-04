import { useEffect, useState } from 'react';
import { appStore } from '../store';
import type { WalletState } from '../types';

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>(appStore.getState().wallet);

  useEffect(() => {
    const unsubscribe = appStore.subscribe((state) => {
      setWalletState(state.wallet);
    });

    return unsubscribe;
  }, []);

  const connectWallet = () => {
    if (typeof window !== 'undefined' && window.solana) {
      return window.solana.connect();
    }
    throw new Error('Phantom wallet not available');
  };

  const disconnectWallet = () => {
    if (typeof window !== 'undefined' && window.solana) {
      return window.solana.disconnect();
    }
    throw new Error('Phantom wallet not available');
  };

  const getWalletInfo = () => {
    return {
      isAvailable: typeof window !== 'undefined' && !!window.solana,
      isConnected: walletState.isConnected,
      publicKey: walletState.publicKey,
      walletName: walletState.walletName,
    };
  };

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    getWalletInfo,
  };
}
