'use client';

import { useEffect, useState, useCallback } from 'react';

const SoundEffects = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  useEffect(() => {
    // Initialize audio context
    const initAudioContext = async () => {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        setAudioContext(ctx);
        
        // Try to resume if suspended
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }
        
        setIsSoundEnabled(true);
        console.log('Sound system initialized successfully');
      } catch (error) {
        console.log('Sound system initialization failed:', error);
        setIsSoundEnabled(false);
      }
    };

    initAudioContext();
  }, []);

  // Sound effect functions
  const playClickSound = useCallback(() => {
    if (!audioContext || !isSoundEnabled) return;
    
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Click sound failed:', error);
    }
  }, [audioContext, isSoundEnabled]);
  
  const playHoverSound = useCallback(() => {
    if (!audioContext || !isSoundEnabled) return;
    
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      console.log('Hover sound failed:', error);
    }
  }, [audioContext, isSoundEnabled]);
  
  const playNotificationSound = useCallback(() => {
    if (!audioContext || !isSoundEnabled) return;
    
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Notification sound failed:', error);
    }
  }, [audioContext, isSoundEnabled]);

  // Helper function to safely check if element is interactive
  const isInteractiveElement = (element: HTMLElement): boolean => {
    if (!element) return false;
    
    try {
      // Check if it's a button
      if (element.tagName === 'BUTTON') return true;
      
      // Check if it has interactive classes
      if (element.classList.contains('clickable') || 
          element.classList.contains('hover-sound') || 
          element.classList.contains('card-hover') ||
          element.classList.contains('cursor-pointer')) return true;
      
      // Check if it's inside a button or interactive element
      if (element.closest('button') || 
          element.closest('.card-hover') ||
          element.closest('.hover-sound') ||
          element.closest('.cursor-pointer')) return true;
      
      return false;
    } catch {
      return false;
    }
  };

  // Add event listeners for sound effects
  useEffect(() => {
    if (!isSoundEnabled) return;

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (isInteractiveElement(target)) {
        playClickSound();
      }
    };
    
    const handleHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (isInteractiveElement(target)) {
        playHoverSound();
      }
    };
    
    const handleNotification = () => {
      playNotificationSound();
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseenter', handleHover, true);
    window.addEventListener('notification', handleNotification);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleHover, true);
      window.removeEventListener('notification', handleNotification);
    };
  }, [isSoundEnabled, playClickSound, playHoverSound, playNotificationSound]);

  // Enable sound on user interaction
  const enableSound = async () => {
    if (audioContext && audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
        setIsSoundEnabled(true);
        console.log('Sound enabled by user interaction');
      } catch (error) {
        console.log('Failed to enable sound:', error);
      }
    }
  };

  // Show sound enable button if sound is disabled
  if (!isSoundEnabled) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={enableSound}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-mono transition-colors duration-200"
        >
          🔊 Enable Sound
        </button>
      </div>
    );
  }

  return null;
};

export default SoundEffects;
