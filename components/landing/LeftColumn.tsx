'use client';

import React from 'react';
import AgentDetails from './AgentDetails';
import AgentActivity from './AgentActivity';
import BriefAnnouncement from './BriefAnnouncement';
import TimelineView from './TimelineView';

const LeftColumn = () => {
  return (
    <div className="space-y-6">
      <AgentDetails />
      <AgentActivity />
      <TimelineView />
      <BriefAnnouncement />
    </div>
  );
};

export default LeftColumn;
