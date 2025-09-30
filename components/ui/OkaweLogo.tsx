import React from 'react';

interface OkaweLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'icon' | 'full';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

export default function OkaweLogo({ size = 'md', variant = 'icon', className = '' }: OkaweLogoProps) {
  const sizeClass = sizeClasses[size];

  if (variant === 'icon') {
    return (
      <div className={`${sizeClass} ${className} relative`}>
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circle */}
          <circle 
            cx="24" 
            cy="24" 
            r="22" 
            fill="currentColor"
            className="text-accent"
          />
          
          {/* Letter O */}
          <circle 
            cx="24" 
            cy="24" 
            r="10" 
            fill="none" 
            stroke="white" 
            strokeWidth="3"
            className="text-accent-foreground"
          />
          
          {/* Inner accent */}
          <circle 
            cx="24" 
            cy="24" 
            r="4" 
            fill="white"
            className="text-accent-foreground"
          />
          
          {/* Creative Wave */}
          <path 
            d="M12 32 Q18 28 24 32 Q30 36 36 32" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
            className="text-accent-foreground opacity-60"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={sizeClass}>
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle 
            cx="24" 
            cy="24" 
            r="22" 
            fill="currentColor"
            className="text-accent"
          />
          <circle 
            cx="24" 
            cy="24" 
            r="10" 
            fill="none" 
            stroke="white" 
            strokeWidth="3"
            className="text-accent-foreground"
          />
          <circle 
            cx="24" 
            cy="24" 
            r="4" 
            fill="white"
            className="text-accent-foreground"
          />
          <path 
            d="M12 32 Q18 28 24 32 Q30 36 36 32" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
            className="text-accent-foreground opacity-60"
          />
        </svg>
      </div>
      
      <div className="flex flex-col">
        <span className={`font-bold text-foreground ${
          size === 'sm' ? 'text-sm' : 
          size === 'md' ? 'text-base' : 
          size === 'lg' ? 'text-xl' : 'text-2xl'
        }`}>
          Okawe
        </span>
        <span className={`text-muted-foreground ${
          size === 'sm' ? 'text-xs' : 
          size === 'md' ? 'text-xs' : 
          size === 'lg' ? 'text-sm' : 'text-base'
        }`}>
          Creative Workspace
        </span>
      </div>
    </div>
  );
}