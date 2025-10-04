// Wallet utility functions for Solana/Phantom integration
import { simpleSupabaseService, SimpleUser } from '../simpleSupabase';

export interface WalletInfo {
  isAvailable: boolean;
  isConnected: boolean;
  publicKey: string | null;
  walletName: string | null;
}

export interface AuthResult {
  success: boolean;
  user?: SimpleUser;
  publicKey?: string;
  walletName?: string;
  username?: string;
  error?: string;
}

/**
 * Check if Phantom wallet is available in the browser
 */
export function isPhantomAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for Phantom wallet specifically
  const phantom = (window as any).solana;
  if (!phantom) return false;
  
  // Check if it's actually Phantom (not just any Solana wallet)
  return phantom.isPhantom === true;
}

/**
 * Wait for Phantom wallet to be available (with timeout)
 */
export async function waitForPhantom(timeout: number = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isPhantomAvailable()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isPhantomAvailable()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
}

/**
 * Get formatted public key (shortened version)
 */
export function formatPublicKey(publicKey: string | null, length: number = 4): string {
  if (!publicKey) return '';
  if (publicKey.length <= length * 2) return publicKey;
  return `${publicKey.slice(0, length)}...${publicKey.slice(-length)}`;
}

/**
 * Validate Solana public key format
 */
export function isValidPublicKey(publicKey: string): boolean {
  // Basic validation for Solana public key (base58, 32-44 characters)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return base58Regex.test(publicKey);
}

/**
 * Get wallet connection status with error handling
 */
export async function getWalletConnectionStatus(): Promise<WalletInfo> {
  try {
    if (!isPhantomAvailable()) {
      return {
        isAvailable: false,
        isConnected: false,
        publicKey: null,
        walletName: null,
      };
    }

    const wallet = window.solana!;
    const response = await wallet.connect();
    
    return {
      isAvailable: true,
      isConnected: true,
      publicKey: response.publicKey.toBase58(),
      walletName: 'Phantom',
    };
  } catch (error) {
    console.error('Error getting wallet connection status:', error);
    return {
      isAvailable: isPhantomAvailable(),
      isConnected: false,
      publicKey: null,
      walletName: null,
    };
  }
}

/**
 * Generate username from wallet address
 */
function generateUsernameFromWallet(walletAddress: string): string {
  const shortKey = walletAddress.slice(0, 8).toUpperCase();
  return `agent_${shortKey}`;
}

/**
 * Handle wallet connection with simple Supabase integration
 */
export async function connectWallet(): Promise<AuthResult> {
  try {
    if (typeof window === 'undefined') {
      return {
        success: false,
        error: 'Wallet connection is only available in browser environment',
      };
    }

    if (!isPhantomAvailable()) {
      return {
        success: false,
        error: 'Phantom wallet not found. Please install Phantom wallet from https://phantom.app/',
      };
    }

    const wallet = (window as any).solana;
    if (!wallet) {
      return {
        success: false,
        error: 'Solana wallet not detected. Please install Phantom wallet.',
      };
    }

    const response = await wallet.connect();
    if (!response || !response.publicKey) {
      return {
        success: false,
        error: 'Failed to get public key from wallet',
      };
    }

    const publicKey = response.publicKey.toBase58();
    const username = generateUsernameFromWallet(publicKey);
    
    console.log('✅ Wallet connected successfully!');
    console.log('Public Key:', publicKey);
    console.log('Username:', username);
    
    // Check if user exists in Supabase
    let user = await simpleSupabaseService.getUserByWallet(publicKey);
    
    if (!user) {
      // Create new user
      user = await simpleSupabaseService.createUser(publicKey, username);
      if (user) {
        console.log('✅ New user created');
      }
    } else {
      console.log('✅ User loaded');
    }
    
    if (user) {
      // Save to local storage
      simpleSupabaseService.saveUserToLocalStorage(user);
    }
    
    return {
      success: true,
      user: user || undefined,
      publicKey: publicKey,
      walletName: 'Phantom',
      username: username,
    };
  } catch (error: unknown) {
    console.error('Wallet connection error:', error);
    
    let errorMessage = 'Failed to connect wallet';
    
    if (error instanceof Error) {
      if (error.message.includes('User rejected')) {
        errorMessage = 'User rejected wallet connection';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Wallet connection timeout. Please try again.';
      } else if (error.message.includes('not found')) {
        errorMessage = 'Phantom wallet not found. Please install Phantom wallet from https://phantom.app/';
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Handle wallet disconnection
 */
export async function disconnectWallet(): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isPhantomAvailable()) {
      return {
        success: false,
        error: 'Phantom wallet not available',
      };
    }

    const wallet = window.solana!;
    await wallet.disconnect();
    
    // Clear local storage
    simpleSupabaseService.clearUserFromLocalStorage();
    
    console.log('✅ Wallet disconnected successfully!');
    
    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error('Wallet disconnection error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to disconnect wallet',
    };
  }
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): SimpleUser | null {
  return simpleSupabaseService.getUserFromLocalStorage();
}

/**
 * Check if user is authenticated
 */
export function isUserAuthenticated(): boolean {
  return !!simpleSupabaseService.getUserFromLocalStorage();
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    solana?: {
      connect(): Promise<{ publicKey: { toBase58(): string } }>;
      disconnect(): Promise<void>;
      signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
      on(event: string, callback: () => void): void;
      publicKey?: { toBase58(): string };
    };
  }
}
