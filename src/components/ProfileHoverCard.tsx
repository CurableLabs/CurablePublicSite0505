
import React, { useState } from 'react';
import { PersonAppFormat as Person } from '@/hooks/useSupabaseData';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import useHoverState from '@/hooks/useHoverState';
import ProfileCardContent from './profile/ProfileCardContent';
import { getBorderStyle, getBackgroundStyle, getGlowStyle } from '@/utils/profileStyles';

interface ProfileHoverCardProps {
  person: Person;
  children: React.ReactNode;
  isActive?: boolean;
}

const ProfileHoverCard = ({ person, children, isActive = false }: ProfileHoverCardProps) => {
  const isMobile = useIsMobile();
  const [isSticky, setIsSticky] = useState(false);
  
  // Use hover state with instant transitions
  const { isActive: isHovering, hoverProps } = useHoverState();
  
  // Show card when either external isActive prop is true or component's hover state is active
  const showCard = isActive || isHovering || isSticky;
  
  // Get style classes
  const backgroundClass = getBackgroundStyle(person.group);
  const borderClass = getBorderStyle(person.group);
  const glowClass = getGlowStyle(person.group);
  
  // Lock the hover card in place when clicked (toggle)
  const handleCardClick = () => {
    setIsSticky(!isSticky);
  };
  
  return (
    <HoverCard open={showCard}>
      <HoverCardTrigger asChild>
        <div 
          className="cursor-pointer" 
          {...hoverProps}
        >
          {children}
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent 
        className={cn(
          "w-80 border-2 p-0 shadow-xl z-50", 
          borderClass,
          backgroundClass,
          glowClass,
          isSticky ? "ring-2 ring-titanium-white/30" : "",
          "backdrop-blur-lg profile-card-enter pointer-events-none" // Allow mouse events to pass through
        )}
        side="right"
        align="start"
        sideOffset={5}
        onClick={handleCardClick}
        onMouseEnter={() => {
          // Re-activate hover state when mouse enters content
          hoverProps.onMouseEnter();
        }}
      >
        <div className="pointer-events-auto"> {/* Restore pointer events for the content */}
          <ProfileCardContent 
            person={person} 
            isSticky={isSticky} 
            onCloseSticky={() => setIsSticky(false)} 
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileHoverCard;
