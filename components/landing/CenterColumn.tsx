'use client';

import React from 'react';
import TargetOperation from './TargetOperation';
import GlobeMap from './GlobeMap';
import DataChart from './DataChart';

const CenterColumn = () => {
  return (
    <div className="space-y-6">
      <TargetOperation 
        region="USA" 
        description="Intelligence confirms the world's most notorious drug trafficker was last seen in this area 30 minutes ago. Surveillance teams are on high alert."
      />
      <GlobeMap />
      <TargetOperation 
        region="AFRICA" 
        description="A high-level cyberattack was traced back to a hidden server farm in this district just 20 minutes ago. Counterintelligence teams are mobilizing."
      />
      <DataChart />
    </div>
  );
};

export default CenterColumn;
