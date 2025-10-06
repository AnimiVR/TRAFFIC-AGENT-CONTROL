'use client';

import React, { useState, useEffect } from 'react';

interface AgentEvent {
  id: string;
  agentName: string;
  agentInitials: string;
  event: 'joined' | 'left' | 'status_change';
  timestamp: Date;
  details: string;
}

interface AgentTimelineProps {
  className?: string;
}

const AgentTimeline: React.FC<AgentTimelineProps> = ({ className = '' }) => {
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      const eventTypes: ('joined' | 'left' | 'status_change')[] = ['joined', 'left', 'status_change'];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      const firstNames = ['John', 'Sarah', 'Robert', 'Emily', 'Michael', 'Jessica', 'David', 'Lisa', 'James', 'Maria'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
      
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const initials = `${firstName[0]}${lastName[0]}`;
      
      let details = '';
      switch (eventType) {
        case 'joined':
          details = 'Agent joined the network';
          break;
        case 'left':
          details = 'Agent disconnected from network';
          break;
        case 'status_change':
          details = 'Agent status updated';
          break;
      }

      const newEvent: AgentEvent = {
        id: `event_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        agentName: `${firstName} ${lastName}`,
        agentInitials: initials,
        event: eventType,
        timestamp: new Date(),
        details
      };

      setEvents(prev => {
        const updated = [newEvent, ...prev];
        return updated.slice(0, 10); // Keep only last 10 events
      });
    }, 8000); // Every 8 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'joined':
        return '🟢';
      case 'left':
        return '🔴';
      case 'status_change':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case 'joined':
        return 'text-green-400';
      case 'left':
        return 'text-red-400';
      case 'status_change':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`bg-dark-card/30 border border-gray-700 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-semibold text-white font-mono mb-3">AGENT TIMELINE</h4>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            Waiting for agent activity...
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs ${getEventColor(event.event)}`}>
                  {getEventIcon(event.event)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm font-mono font-bold">{event.agentName}</span>
                  <span className="text-gray-400 text-xs">({event.agentInitials})</span>
                </div>
                <div className={`text-xs ${getEventColor(event.event)}`}>
                  {event.details}
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  {isClient ? event.timestamp.toLocaleTimeString() : '--:--:--'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentTimeline;
