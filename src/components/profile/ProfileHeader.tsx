
import React from 'react';
import { PersonAppFormat as Person } from '@/hooks/useSupabaseData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  person: Person;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ person }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-20 h-20 border-2 border-graphite-700/60">
        <AvatarImage src={person.avatar} alt={person.name} />
        <AvatarFallback className="bg-gunmetal-900/80">
          {person.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      
      <div>
        <h4 className="font-bold text-titanium-white text-sm">{person.name}</h4>
        <p className={cn(
          "text-xs font-mono",
          person.group === 'team' ? 'text-logo-blue' :
          person.group === 'advisor' ? 'text-quantum-red' : 'text-plasma-violet'
        )}>
          {person.role}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
