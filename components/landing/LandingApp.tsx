'use client';

import React from 'react';
import Header from './Header';
import LeftColumn from './LeftColumn';
import CenterColumn from './CenterColumn';
import RightColumn from './RightColumn';
import NotificationSystem from './NotificationSystem';
import LiveDataUpdater from './LiveDataUpdater';
import SoundEffects from './SoundEffects';

interface LandingAppProps {
  onBackToTraffic?: () => void;
}

const LandingApp: React.FC<LandingAppProps> = ({ onBackToTraffic }) => {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <SoundEffects />
      <NotificationSystem />
      <Header />
      <LiveDataUpdater>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          <div className="lg:col-span-3">
            <LeftColumn />
          </div>
          <div className="lg:col-span-6">
            <CenterColumn />
          </div>
          <div className="lg:col-span-3">
            <RightColumn />
          </div>
        </div>
      </LiveDataUpdater>
    </div>
  );
};

export default LandingApp;
