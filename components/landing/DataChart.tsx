'use client';

import React from 'react';

const DataChart = () => {
  const chartData = [
    { date: '01/15', value: 45 },
    { date: '01/16', value: 62 },
    { date: '01/17', value: 38 },
    { date: '01/18', value: 71 },
    { date: '01/19', value: 55 },
    { date: '01/20', value: 83 },
    { date: '01/21', value: 67 },
    { date: '01/22', value: 49 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      <h3 className="text-lg font-semibold text-white mb-4">ACTIVITY TIMELINE</h3>
      
      <div className="space-y-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 text-xs text-gray-400 font-mono">
              {item.date}
            </div>
            <div className="flex-1 bg-dark-border rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-accent-red to-accent-orange h-full rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="w-8 text-xs text-white font-mono text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataChart;
