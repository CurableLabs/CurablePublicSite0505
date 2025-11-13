
import React, { useState, useCallback } from 'react';
import Card from './Card';
import { PersonAppFormat } from '@/hooks/useSupabaseData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { getBorderStyle, getGlowStyle } from '@/utils/profileStyles';

interface ProfileCardProps {
  person: PersonAppFormat;
  isActive?: boolean;
  featured?: boolean;
  compact?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  person, 
  isActive = false 
}) => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Map the group to a display name
  const getGroupDisplay = (group: string) => {
    switch (group) {
      case 'team': return 'Guardian';
      case 'advisor': return 'Advisor';
      case 'founder': return 'Founder';
      case 'contributor': return 'Contributor';
      default: return group;
    }
  };
  
  // Get badge styling based on group
  const getBadgeStyle = (group: string) => {
    switch (group) {
      case 'team': 
        return 'bg-logo-blue/20 text-logo-blue border-logo-blue/40';
      case 'advisor': 
        return 'bg-plasma-violet/20 text-plasma-violet border-plasma-violet/40';
      case 'founder': 
        return 'bg-blue-400/20 text-blue-400 border-blue-400/40';
      case 'contributor':
        return 'bg-warm-amber/20 text-warm-amber border-warm-amber/40';
      default: 
        return 'bg-logo-blue/20 text-logo-blue border-logo-blue/40';
    }
  };

  const groupDisplay = getGroupDisplay(person.group);
  const badgeClass = getBadgeStyle(person.group);
  const borderClass = getBorderStyle(person.group);
  const glowClass = getGlowStyle(person.group);

  return (
    <Card 
      className={`card-quantum-enhanced flex flex-col text-center h-full p-4 
                border ${borderClass} ${glowClass} quantum-barrier data-pulse
                ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      glowColor={person.group === 'team' ? 'blue' : 
                person.group === 'advisor' ? 'red' : 
                person.group === 'contributor' ? 'amber' : 'purple'}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className="neural-network-optimized opacity-10">
          <div className="neural-node-optimized"></div>
          <div className="neural-node-optimized"></div>
        </div>
        <div className="quantum-particles-optimized opacity-15"></div>
      </div>
      
      {/* Avatar - consistent size for everyone */}
      <div 
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 
                   ${person.group === 'founder' ? 'border-plasma-violet/50' : 
                     person.group === 'advisor' ? 'border-quantum-red/50' : 
                     person.group === 'team' ? 'border-logo-blue/50' : 'border-warm-amber/50'} 
                   mb-3 mx-auto relative shadow-lg
                   ${person.group === 'founder' ? 'shadow-plasma-violet/20' : 
                     person.group === 'advisor' ? 'shadow-quantum-red/20' : 
                     person.group === 'team' ? 'shadow-logo-blue/20' : 'shadow-warm-amber/20'}`}
      >
        <Avatar className="w-full h-full">
          <AvatarImage 
            src={person.avatar} 
            alt={person.name} 
            className="w-full h-full object-cover"
            onLoad={() => setIsLoaded(true)}
          />
          <AvatarFallback 
            className="bg-brand-charcoal/90 text-foreground font-poppins font-bold holographic-text text-lg"
            onLoad={() => setIsLoaded(true)}
          >
            {person.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1 flex flex-col relative z-10">
        {/* Name - consistent size */}
        <h3 className="text-sm sm:text-base font-poppins font-bold mb-2 text-foreground">
          {person.name}
        </h3>
        
        {/* Badge - consistent styling */}
        <Badge 
          variant="outline" 
          className={`mb-2 mx-auto px-3 py-1 font-poppins font-semibold rounded-lg 
                     border ${badgeClass} shadow-lg text-xs`}
        >
          {groupDisplay}
        </Badge>
        
        {/* Role - consistent styling */}
        <p className="text-quantum-red text-sm font-poppins mb-2 font-medium holographic-text">
          {person.role}
        </p>
        
        {/* Bio section - full information preserved, consistent layout */}
        <div className="flex-1 flex flex-col justify-start">
          <div className="text-foreground/80 text-xs leading-relaxed text-left font-poppins">
            {person.bio ? (
              person.bio.split('\n').filter(line => line.trim()).map((line, index) => (
                <p key={index} className="mb-1 last:mb-0">
                  {line.trim()}
                </p>
              ))
            ) : person.gptDescription ? (
              person.gptDescription.split('\n').filter(line => line.trim()).map((line, index) => (
                <p key={index} className="mb-1 last:mb-0">
                  {line.trim()}
                </p>
              ))
            ) : (
              <p className="italic opacity-60">Profile details coming soon...</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Removed hover effects */}
    </Card>
  );
};

export default ProfileCard;
