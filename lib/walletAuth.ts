import { supabase, User } from './supabase';

// Wallet authentication service
export class WalletAuthService {
  private static instance: WalletAuthService;
  
  public static getInstance(): WalletAuthService {
    if (!WalletAuthService.instance) {
      WalletAuthService.instance = new WalletAuthService();
    }
    return WalletAuthService.instance;
  }

  /**
   * Authenticate user with Phantom Wallet
   * @param publicKey - User's wallet public key
   * @param signature - Signature for verification
   * @param message - Message that was signed
   */
  async authenticateWithWallet(
    publicKey: string, 
    signature: string, 
    message: string
  ): Promise<{ user: User; session: unknown }> {
    try {
      // Verify signature (you can implement your own verification logic)
      const isValidSignature = await this.verifySignature(publicKey, signature, message);
      
      if (!isValidSignature) {
        throw new Error('Invalid signature');
      }

      // Check if user exists
      let user = await this.getUserByWalletAddress(publicKey);
      
      if (!user) {
        // Create new user
        user = await this.createUserFromWallet(publicKey);
      }

      // Create custom session (since we're not using Supabase auth)
      const session = {
        user: user,
        access_token: this.generateCustomToken(user.id),
        refresh_token: this.generateRefreshToken(user.id),
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };

      // Store session in localStorage
      localStorage.setItem('wallet_session', JSON.stringify(session));

      return { user, session };
    } catch (error) {
      console.error('Wallet authentication failed:', error);
      throw error;
    }
  }

  /**
   * Get user by wallet address
   */
  async getUserByWalletAddress(walletAddress: string): Promise<User | null> {
    try {
      console.log('Looking for user with wallet:', walletAddress);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress);

      if (error) {
        console.error('Error fetching user:', error);
        return null;
      }

      if (!data || data.length === 0) {
        console.log('No user found with this wallet address');
        return null;
      }

      console.log('✅ User found:', data[0]);
      return data[0];
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  /**
   * Create new user from wallet
   */
  async createUserFromWallet(walletAddress: string): Promise<User> {
    try {
      // Generate username from wallet address
      const username = this.generateUsernameFromWallet(walletAddress);
      
      console.log('Creating new user with wallet:', walletAddress);
      console.log('Generated username:', username);
      
      const { data, error } = await supabase
        .from('users')
        .insert({
          wallet_address: walletAddress,
          username: username,
          total_points: 1, // Cộng 1 điểm welcome
          level: 1,
          experience_points: 1 // Cộng 1 XP
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user in database:', error);
        throw error;
      }

      console.log('✅ User created successfully:', data);

      // Add welcome points transaction
      await this.addWelcomePointsTransaction(data.id);

      // Show welcome notification
      this.showWelcomeNotification(data.username);

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Get current user from session
   */
  getCurrentUser(): User | null {
    try {
      const sessionData = localStorage.getItem('wallet_session');
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      
      // Check if session is expired
      if (Date.now() > session.expires_at) {
        this.logout();
        return null;
      }

      return session.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('wallet_session');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates: Partial<User>): Promise<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', currentUser.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update session
      const sessionData = localStorage.getItem('wallet_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        session.user = data;
        localStorage.setItem('wallet_session', JSON.stringify(session));
      }

      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Generate username from wallet address
   */
  private generateUsernameFromWallet(walletAddress: string): string {
    // Take first 8 characters and add random suffix
    const prefix = walletAddress.slice(0, 8);
    const suffix = Math.random().toString(36).substr(2, 4);
    return `Agent_${prefix}_${suffix}`;
  }

  /**
   * Verify wallet signature (simplified version)
   * In production, you should implement proper signature verification
   */
  private async verifySignature(publicKey: string, signature: string, message: string): Promise<boolean> {
    try {
      // This is a simplified verification
      // In production, you should use proper cryptographic verification
      return signature.length > 0 && publicKey.length > 0 && message.length > 0;
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }

  /**
   * Generate custom token (simplified)
   */
  private generateCustomToken(userId: string): string {
    // In production, use proper JWT or similar
    return btoa(JSON.stringify({ userId, timestamp: Date.now() }));
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(userId: string): string {
    return btoa(JSON.stringify({ userId, timestamp: Date.now(), type: 'refresh' }));
  }

  // Achievement system temporarily disabled to avoid errors

  /**
   * Add welcome points transaction for new user
   */
  private async addWelcomePointsTransaction(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('points_transactions')
        .insert({
          user_id: userId,
          amount: 1,
          spent_amount: 0, // Required field - must be 0 or positive
          type: 'bonus',
          description: 'Welcome bonus - Connected wallet for the first time!',
          metadata: {
            source: 'wallet_connection',
            bonus_type: 'welcome',
            timestamp: new Date().toISOString()
          }
        });

      if (error) {
        console.error('Error adding welcome points transaction:', error);
        // Don't throw error, just log it
      } else {
        console.log('✅ Welcome points transaction added successfully!');
      }
    } catch (error) {
      console.error('Error adding welcome points transaction:', error);
      // Don't throw error, just log it
    }
  }

  /**
   * Show welcome notification to user
   */
  private showWelcomeNotification(username: string): void {
    // Dispatch custom event for notification system
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        title: '🎉 Welcome to Agent Mission Control ( AMC )!',
        message: `Welcome ${username}! You've earned 1 point for connecting your wallet.`,
        duration: 5000,
        icon: '🎯'
      }
    });
    
    window.dispatchEvent(event);
    
    // Also log to console
    console.log(`✅ User ${username} authenticated`);
  }
}

// Export singleton instance
export const walletAuthService = WalletAuthService.getInstance();
