'use client';

import { useEffect } from 'react';

const SoundEffects = () => {
  useEffect(() => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Sound effect functions
    const playClickSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };
    
    const playNotificationSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };
    
    const playHoverSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    };
    
    // Helper function to safely check if element has class
    const hasClass = (element: HTMLElement, className: string): boolean => {
      return element && element.classList && element.classList.contains(className);
    };

    // Helper function to safely check if element is inside a parent with selector
    const hasParentWithSelector = (element: HTMLElement, selector: string): boolean => {
      if (!element || !element.closest) return false;
      try {
        return !!element.closest(selector);
      } catch (error) {
        return false;
      }
    };

    // Helper function to safely check if element is button or has specific classes
    const isInteractiveElement = (element: HTMLElement): boolean => {
      if (!element) return false;
      
      try {
        // Check if it's a button
        if (element.tagName === 'BUTTON') return true;
        
        // Check if it has interactive classes
        if (hasClass(element, 'clickable') || 
            hasClass(element, 'hover-sound') || 
            hasClass(element, 'card-hover')) return true;
        
        // Check if it's inside a button or interactive element
        if (hasParentWithSelector(element, 'button') || 
            hasParentWithSelector(element, '.card-hover') ||
            hasParentWithSelector(element, '.hover-sound')) return true;
        
        return false;
      } catch (error) {
        console.warn('Error checking interactive element:', error);
        return false;
      }
    };

    // Add event listeners for sound effects
    const addSoundListeners = () => {
      // Click sounds for buttons
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (isInteractiveElement(target)) {
          playClickSound();
        }
      });
      
      // Hover sounds for interactive elements
      document.addEventListener('mouseenter', (e) => {
        const target = e.target as HTMLElement;
        if (isInteractiveElement(target)) {
          playHoverSound();
        }
      }, true);
      
      // Notification sounds
      window.addEventListener('notification', () => {
        playNotificationSound();
      });
    };
    
    // Initialize sound system
    const initSoundSystem = async () => {
      try {
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        addSoundListeners();
      } catch (error) {
        console.log('Sound system not available:', error);
      }
    };
    
    initSoundSystem();
    
    return () => {
      // Cleanup
      audioContext.close();
    };
  }, []);
  
  return null;
};

export default SoundEffects;
