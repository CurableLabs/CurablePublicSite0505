import React, { memo, useState, useCallback } from 'react';
import { PersonAppFormat as Person } from '@/hooks/useSupabaseData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getBorderStyle } from '@/utils/profileStyles';

interface OptimizedProfileCardProps {
  person: Person;
  onLoad: () => void;
  prefersReducedMotion: boolean;
}

const OptimizedProfileCard: React.FC<OptimizedProfileCardProps> = memo(({ 
  person, 
  onLoad, 
  prefersReducedMotion 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized group display mapping
  const groupDisplayMap = {
    team: 'Guardian',
    advisor: 'Advisor', 
    founder: 'Founder',
    contributor: 'Contributor'
  } as const;

  // Optimized badge styling
  const badgeStyleMap = {
    team: 'bg-logo-blue/20 text-logo-blue border-logo-blue/40',
    advisor: 'bg-plasma-violet/20 text-plasma-violet border-plasma-violet/40',
    founder: 'bg-blue-400/20 text-blue-400 border-blue-400/40',
    contributor: 'bg-warm-amber/20 text-warm-amber border-warm-amber/40'
  } as const;

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    onLoad();
  }, [onLoad]);

  const groupDisplay = groupDisplayMap[person.group as keyof typeof groupDisplayMap] || person.group;
  const badgeClass = badgeStyleMap[person.group as keyof typeof badgeStyleMap] || badgeStyleMap.team;
  const borderClass = getBorderStyle(person.group);

  // Simplified animations based on user preference
  const animationClass = prefersReducedMotion 
    ? 'transition-opacity duration-300' 
    : 'transition-all duration-300 hover:scale-105';

  return (
    <div 
      className={`
        ${animationClass}
        bg-brand-charcoal/40 backdrop-blur-sm 
        border ${borderClass}
        rounded-xl p-4 h-full
        flex flex-col text-center
        shadow-lg
        ${imageLoaded ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Minimal background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-5">
        <div className="w-full h-full bg-gradient-radial from-current to-transparent"></div>
      </div>
      
      {/* Avatar */}
      <div className={`
        w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden 
        border-2 ${borderClass.replace('border-', 'border-')}
        mb-3 mx-auto relative shadow-lg
      `}>
        <Avatar className="w-full h-full">
          <AvatarImage 
            src={person.avatar} 
            alt={person.name}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          <AvatarFallback 
            className="bg-brand-charcoal/90 text-foreground font-poppins font-bold text-lg"
            onLoad={handleImageLoad}
          >
            {person.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1 flex flex-col relative z-10">
        {/* Name */}
        <h3 className="text-sm sm:text-base font-poppins font-bold mb-2 text-foreground">
          {person.name}
        </h3>
        
        {/* Badge */}
        <Badge 
          variant="outline" 
          className={`mb-2 mx-auto px-3 py-1 font-poppins font-semibold rounded-lg 
                     border ${badgeClass} text-xs`}
        >
          {groupDisplay}
        </Badge>
        
        {/* Role */}
        <p className="text-quantum-red text-sm font-poppins mb-2 font-medium">
          {person.role}
        </p>
        
        {/* Bio - Full display */}
        <div className="flex-1 flex flex-col justify-start">
          <div className="text-foreground/80 text-xs leading-relaxed text-left font-poppins">
            {person.bio ? (
              <p className="whitespace-pre-line">
                {person.bio}
              </p>
            ) : person.gptDescription ? (
              <p className="whitespace-pre-line">
                {person.gptDescription}
              </p>
            ) : (
              <p className="italic opacity-60">Profile details coming soon...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

OptimizedProfileCard.displayName = 'OptimizedProfileCard';

export default OptimizedProfileCard;