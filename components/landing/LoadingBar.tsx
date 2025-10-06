'use client';

import React from 'react';

interface LoadingBarProps {
  progress: number;
  className?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress, className = '' }) => (
  <div className={`w-full bg-gray-700 rounded-full h-2 overflow-hidden ${className}`}>
    <div
      className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default LoadingBar;


