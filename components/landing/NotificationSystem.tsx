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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
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

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 notifications
      
      // Trigger notification sound
      window.dispatchEvent(new CustomEvent('notification'));
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  if (!isClient) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`glass-effect rounded-lg p-4 max-w-sm transition-all duration-300 transform ${
            notification.read ? 'opacity-60' : 'opacity-100'
          } ${
            notification.type === 'mission' 
              ? 'border-l-4 border-green-400' 
              : 'border-l-4 border-red-400'
          }`}
          style={{
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`text-xs font-bold ${
                  notification.type === 'mission' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {notification.type.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">
                  {notification.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {notification.title}
              </h4>
              <p className="text-xs text-gray-300">
                {notification.message}
              </p>
            </div>
            <div className="flex space-x-1 ml-2">
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                ✓
              </button>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;