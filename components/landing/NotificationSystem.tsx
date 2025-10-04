'use client';

import React, { useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: 'mission' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const missions = ['Ghost Protocol', 'Silent Storm', 'Iron Shield', 'Night Watch', 'Red Alert'];
      const sectors = ['Sector 7', 'Alpha Zone', 'Beta Quadrant', 'Gamma Station', 'Delta Base'];
      
      const newNotification: Notification = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'mission' : 'alert',
        title: Math.random() > 0.5 ? 'New Mission Available' : 'System Alert',
        message: Math.random() > 0.5 
          ? `Mission "${missions[Math.floor(Math.random() * missions.length)]}" is now available for assignment`
          : `Security breach detected in ${sectors[Math.floor(Math.random() * sectors.length)]}`,
        timestamp: new Date(),
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      
      // Trigger notification sound
      window.dispatchEvent(new CustomEvent('notification'));
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="fixed top-4 right-4 z-40 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-dark-card border border-dark-border rounded-lg p-4 shadow-2xl min-w-80 max-w-96 animate-in slide-in-from-right duration-300 ${
            notification.read ? 'opacity-70' : 'glow-effect'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-3 h-3 rounded-full mt-1 ${
              notification.type === 'mission' ? 'bg-accent-red' : 'bg-yellow-400'
            } pulse-glow`}></div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  {notification.timestamp.toLocaleTimeString()}
                </span>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs text-accent-red hover:text-accent-orange transition-colors duration-200"
                >
                  {notification.read ? 'Read' : 'Mark as read'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
