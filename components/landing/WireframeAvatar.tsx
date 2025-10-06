'use client';

import React from 'react';

interface WireframeAvatarProps {
  name: string;
  initials: string;
  size?: number;
  className?: string;
}

const WireframeAvatar: React.FC<WireframeAvatarProps> = ({ 
  name, 
  initials, 
  size = 80, 
  className = '' 
}) => {
  // Generate unique seed based on name for consistent wireframe
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate random but consistent variations based on seed
  const random = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };

  // Generate wireframe points for a more detailed face
  const generateWireframePoints = () => {
    const points = [];
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    
    // Face outline points (more detailed)
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const variation = random(0.85, 1.15);
      const x = centerX + Math.cos(angle) * radius * variation;
      const y = centerY + Math.sin(angle) * radius * variation;
      points.push({ x, y });
    }
    
    // Add facial feature points
    // Eyes (more detailed)
    points.push({ x: centerX - size * 0.18, y: centerY - size * 0.12 });
    points.push({ x: centerX - size * 0.12, y: centerY - size * 0.12 });
    points.push({ x: centerX + size * 0.12, y: centerY - size * 0.12 });
    points.push({ x: centerX + size * 0.18, y: centerY - size * 0.12 });
    
    // Nose (more detailed)
    points.push({ x: centerX, y: centerY - size * 0.05 });
    points.push({ x: centerX - size * 0.05, y: centerY + size * 0.05 });
    points.push({ x: centerX + size * 0.05, y: centerY + size * 0.05 });
    
    // Mouth (more detailed)
    points.push({ x: centerX - size * 0.12, y: centerY + size * 0.18 });
    points.push({ x: centerX - size * 0.06, y: centerY + size * 0.15 });
    points.push({ x: centerX, y: centerY + size * 0.15 });
    points.push({ x: centerX + size * 0.06, y: centerY + size * 0.15 });
    points.push({ x: centerX + size * 0.12, y: centerY + size * 0.18 });
    
    // Cheekbones
    points.push({ x: centerX - size * 0.25, y: centerY });
    points.push({ x: centerX + size * 0.25, y: centerY });
    
    return points;
  };

  const points = generateWireframePoints();
  
  // Generate triangles for wireframe mesh
  const generateTriangles = () => {
    const triangles = [];
    const numPoints = points.length;
    
    for (let i = 0; i < numPoints - 2; i++) {
      for (let j = i + 1; j < numPoints - 1; j++) {
        for (let k = j + 1; k < numPoints; k++) {
          // Only create triangles that are reasonably sized
          const p1 = points[i];
          const p2 = points[j];
          const p3 = points[k];
          
          const dist1 = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          const dist2 = Math.sqrt((p2.x - p3.x) ** 2 + (p2.y - p3.y) ** 2);
          const dist3 = Math.sqrt((p3.x - p1.x) ** 2 + (p3.y - p1.y) ** 2);
          
          const maxDist = Math.max(dist1, dist2, dist3);
          const minDist = Math.min(dist1, dist2, dist3);
          
          // Only create triangles with reasonable proportions
          if (maxDist < size * 0.35 && minDist > size * 0.03) {
            triangles.push([i, j, k]);
          }
        }
      }
    }
    
    return triangles.slice(0, 25); // Limit number of triangles
  };

  const triangles = generateTriangles();

  return (
    <div className={`relative ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        {/* Background circle with glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="pulse">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={size * 0.4} 
          fill="none" 
          stroke="rgba(6,182,212,0.2)" 
          strokeWidth="1"
          filter="url(#glow)"
        />
        
        {/* Wireframe triangles with different colors */}
        {triangles.map((triangle, index) => {
          const p1 = points[triangle[0]];
          const p2 = points[triangle[1]];
          const p3 = points[triangle[2]];
          
          const colors = [
            'rgba(6,182,212,0.6)',   // Cyan
            'rgba(34,197,94,0.5)',   // Green
            'rgba(239,68,68,0.5)',   // Red
            'rgba(168,85,247,0.5)',  // Purple
            'rgba(245,158,11,0.5)'   // Yellow
          ];
          
          const color = colors[index % colors.length];
          
          return (
            <polygon
              key={index}
              points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
              className="animate-pulse"
              style={{
                animationDelay: `${index * 0.08}s`,
                animationDuration: '3s'
              }}
            />
          );
        })}
        
        {/* Wireframe vertices with different sizes */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={index < 24 ? "1.2" : "0.8"} // Face outline points are larger
            fill="rgba(255,255,255,0.9)"
            className="animate-ping"
            style={{
              animationDelay: `${index * 0.03}s`,
              animationDuration: '2s'
            }}
            filter="url(#pulse)"
          />
        ))}
        
        {/* Enhanced targeting brackets */}
        <g stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" fill="none" filter="url(#glow)">
          {/* Top-left bracket */}
          <path d={`M ${size * 0.08} ${size * 0.08} L ${size * 0.08} ${size * 0.22} L ${size * 0.22} ${size * 0.22}`} />
          {/* Bottom-left bracket */}
          <path d={`M ${size * 0.08} ${size * 0.78} L ${size * 0.08} ${size * 0.92} L ${size * 0.22} ${size * 0.92}`} />
          {/* Top-right bracket */}
          <path d={`M ${size * 0.78} ${size * 0.08} L ${size * 0.78} ${size * 0.22} L ${size * 0.92} ${size * 0.22}`} />
          {/* Bottom-right bracket */}
          <path d={`M ${size * 0.78} ${size * 0.78} L ${size * 0.78} ${size * 0.92} L ${size * 0.92} ${size * 0.92}`} />
        </g>
        
        {/* Scanning lines with different patterns */}
        <g stroke="rgba(6,182,212,0.4)" strokeWidth="0.6" fill="none" filter="url(#glow)">
          <line 
            x1={size * 0.1} 
            y1={size * 0.25} 
            x2={size * 0.9} 
            y2={size * 0.25}
            className="animate-pulse"
            style={{ animationDelay: '0.5s', animationDuration: '2s' }}
          />
          <line 
            x1={size * 0.1} 
            y1={size * 0.5} 
            x2={size * 0.9} 
            y2={size * 0.5}
            className="animate-pulse"
            style={{ animationDelay: '1s', animationDuration: '2s' }}
          />
          <line 
            x1={size * 0.1} 
            y1={size * 0.75} 
            x2={size * 0.9} 
            y2={size * 0.75}
            className="animate-pulse"
            style={{ animationDelay: '1.5s', animationDuration: '2s' }}
          />
        </g>
        
        {/* Data flow lines */}
        <g stroke="rgba(34,197,94,0.3)" strokeWidth="0.4" fill="none">
          <path 
            d={`M ${size * 0.2} ${size * 0.1} Q ${size * 0.5} ${size * 0.3} ${size * 0.8} ${size * 0.1}`}
            className="animate-pulse"
            style={{ animationDelay: '0.8s', animationDuration: '2.5s' }}
          />
          <path 
            d={`M ${size * 0.2} ${size * 0.9} Q ${size * 0.5} ${size * 0.7} ${size * 0.8} ${size * 0.9}`}
            className="animate-pulse"
            style={{ animationDelay: '1.2s', animationDuration: '2.5s' }}
          />
        </g>
      </svg>
      
      {/* Fallback initials with better styling */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-mono font-bold text-xs opacity-20">
          {initials}
        </span>
      </div>
    </div>
  );
};

export default WireframeAvatar;
