import React, { memo, useState } from 'react';
import { PersonAppFormat as Person } from '@/hooks/useSupabaseData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface SimpleProfileCardProps {
  person: Person;
}

const SimpleProfileCard: React.FC<SimpleProfileCardProps> = memo(({ person }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Simple styling maps
  const groupDisplayMap = {
    team: 'Guardian',
    advisor: 'Advisor', 
    founder: 'Founder',
    contributor: 'Contributor'
  } as const;

  const badgeColorMap = {
    team: 'text-logo-blue border-logo-blue/40',
    advisor: 'text-plasma-violet border-plasma-violet/40',
    founder: 'text-spectral-crimson border-spectral-crimson/40',
    contributor: 'text-warm-amber border-warm-amber/40'
  } as const;

  const borderColorMap = {
    team: 'border-logo-blue/50',
    advisor: 'border-plasma-violet/50',
    founder: 'border-spectral-crimson/50',
    contributor: 'border-warm-amber/50'
  } as const;

  const groupDisplay = groupDisplayMap[person.group as keyof typeof groupDisplayMap] || person.group;
  const badgeClass = badgeColorMap[person.group as keyof typeof badgeColorMap] || badgeColorMap.team;
  const borderClass = borderColorMap[person.group as keyof typeof borderColorMap] || borderColorMap.team;

  return (
    <div className="bg-brand-charcoal/40 backdrop-blur-sm border border-spectral-crimson/30 rounded-xl p-3 sm:p-4 h-full flex flex-col text-center hover:border-cosmic-indigo/50 transition-all duration-300 magnetic-spectral group">
      {/* Avatar - Optimized for denser layout */}
      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 ${borderClass} mb-2 sm:mb-3 mx-auto transition-all duration-300 group-hover:scale-105`}>
        <Avatar className="w-full h-full">
          <AvatarImage 
            src={person.avatar} 
            alt={person.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <AvatarFallback className="bg-brand-charcoal/90 text-foreground font-poppins font-bold text-sm sm:text-lg">
            {person.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        {/* Name - Optimized spacing */}
        <h3 className="text-xs sm:text-sm md:text-base font-poppins font-bold mb-1 sm:mb-2 text-foreground line-clamp-2 leading-tight">
          {person.name}
        </h3>
        
        {/* Badge - Smaller for dense layout */}
        <Badge variant="outline" className={`mb-1 sm:mb-2 mx-auto px-2 py-0.5 font-poppins font-semibold rounded-lg border ${badgeClass} text-xs bg-transparent`}>
          {groupDisplay}
        </Badge>
        
        {/* Role - Compact sizing */}
        <p className="text-spectral-crimson text-xs sm:text-sm font-poppins mb-1 sm:mb-2 font-medium line-clamp-2 leading-tight">
          {person.role}
        </p>
        
        {/* Bio - Full display */}
        {person.bio && (
          <p className="text-foreground/70 text-xs font-poppins leading-relaxed whitespace-pre-line">
            {person.bio}
          </p>
        )}
      </div>
    </div>
  );
});

SimpleProfileCard.displayName = 'SimpleProfileCard';

export default SimpleProfileCard;