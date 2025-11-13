
import React, { useRef, useEffect, useState } from 'react';
import Card from './Card';
import GradientText from './ui/GradientText';
import { Tables } from '@/integrations/supabase/types';
type Value = Tables<'core_values'>;

interface ValueCardProps {
  value: Value;
  isHovered: boolean;
}

const ValueCard: React.FC<ValueCardProps> = ({ value, isHovered }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Removed magnetic movement effect
  
  const iconMap = {
    transparency: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    rigor: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    governance: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    access: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6M3 15v-2m4 4v-6m4 0V7a4 4 0 014-4" />
      </svg>
    ),
  };

  const valueDetailMap = {
    transparency: "Transparency metric: 98.7% transactions verified",
    rigor: "Scientific rigidity: 42 peer validations this week",
    governance: "Governance health: 89% participation rate",
    access: "Access index: 1,287 open datasets available",
  };

  // Color schemes for different value types
  const getValueColorScheme = (icon: string) => {
    switch (icon) {
      case 'rigor':
        return {
          gradientFrom: 'from-logo-blue/10',
          gradientTo: 'to-bio-blue/5',
          ringColor: 'border-logo-blue/40',
          glowColor: 'blue'
        };
      case 'access':
        return {
          gradientFrom: 'from-bio-blue/10',
          gradientTo: 'to-bio-green/5',
          ringColor: 'border-bio-blue/40',
          glowColor: 'blue'
        };
      case 'governance':
        return {
          gradientFrom: 'from-blue-400/10',
          gradientTo: 'to-quantum-red/5',
          ringColor: 'border-blue-400/40',
          glowColor: 'purple'
        };
      default: // transparency
        return {
          gradientFrom: 'from-blue-400/10',
          gradientTo: 'to-logo-blue/5',
          ringColor: 'border-blue-400/40',
          glowColor: 'purple'
        };
    }
  };

  const colorScheme = getValueColorScheme(value.icon);

  return (
    <Card 
      ref={cardRef}
      className="card-quantum-enhanced flex flex-col items-center text-center h-full p-3 quantum-barrier"
      glowColor={colorScheme.glowColor === 'blue' ? 'blue' : 'purple'}
    >
      {/* Performance-optimized quantum background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="quantum-particles-optimized opacity-15"></div>
      </div>
      
      {/* Enhanced background effect with quantum colors */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-spectral-crimson/6 via-cosmic-indigo/8 to-spectral-glow/4 rounded-xl transition-opacity duration-300 opacity-60"></div>
      )}
      
      <div className={`mb-3 relative z-10 ${isHovered ? 'animate-pulse-dot' : ''}`}>
        <div className={`absolute inset-0 rounded-full bg-gradient-radial from-spectral-crimson/20 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-40' : ''}`}></div>
        {iconMap[value.icon as keyof typeof iconMap]}
        
        {/* Subtle orbiting particle effect */}
        {isHovered && (
          <div className="absolute inset-[-12px] pointer-events-none">
            <div className="absolute w-1.5 h-1.5 rounded-full bg-spectral-crimson/60 animate-orbit" style={{animationDuration: '4s'}}></div>
            <div className="absolute w-1 h-1 rounded-full bg-cosmic-indigo/60 animate-orbit" style={{animationDuration: '5s', animationDelay: '0.5s'}}></div>
          </div>
        )}
      </div>
      
      <h3 className={`text-lg font-poppins font-bold mb-2 transition-all duration-300 relative z-10 ${isHovered ? '' : 'text-foreground'}`}>
        {isHovered ? (
          <GradientText variant="red" animate={true}>
            {value.title}
          </GradientText>
        ) : (
          <span className="holographic-text">{value.title}</span>
        )}
      </h3>
      
      <p className={`text-foreground/80 text-sm mb-2 transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-75'} relative z-10 font-poppins`}>
        {value.description}
      </p>
      
      {isHovered && (
        <div className="mt-3 pt-3 border-t border-spectral-crimson/20 w-full fade-in-up relative z-10">
          <p className="text-sm font-poppins text-spectral-crimson flex items-center">
            <span className="mr-2 opacity-70 text-base">›</span>
            {valueDetailMap[value.icon as keyof typeof valueDetailMap]}
          </p>
          <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-transparent via-spectral-crimson/40 to-transparent rounded-full"></div>
          
          {/* Subtle data visualization bar */}
          <div className="mt-3 w-full h-1.5 bg-gunmetal-900/50 rounded-full overflow-hidden border border-spectral-crimson/10">
            <div 
              className="h-full bg-gradient-to-r from-spectral-crimson to-cosmic-indigo rounded-full transition-all duration-700"
              style={{
                width: value.icon === 'transparency' ? '98%' : 
                       value.icon === 'rigor' ? '84%' : 
                       value.icon === 'governance' ? '89%' : '75%'
              }}
            ></div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ValueCard;
