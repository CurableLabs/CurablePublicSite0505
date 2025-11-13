
import React from 'react';
import { PersonAppFormat as Person } from '@/hooks/useSupabaseData';
import ProfileHeader from './ProfileHeader';
import ProfileBio from './ProfileBio';
import ProfileSocialLinks from './ProfileSocialLinks';
import CloseButton from './CloseButton';

interface ProfileCardContentProps {
  person: Person;
  isSticky: boolean;
  onCloseSticky: () => void;
}

const ProfileCardContent: React.FC<ProfileCardContentProps> = ({ 
  person, 
  isSticky, 
  onCloseSticky 
}) => {
  // Extract LinkedIn URL if it exists in the bio
  const hasLinkedIn = person.bio?.includes('linkedin.com');
  const linkedInUrl = hasLinkedIn ? 
    person.bio.match(/https?:\/\/(?:www\.)?linkedin\.com\/[^\s]+/)?.[0] : null;
  
  return (
    <div className="p-4 space-y-3">
      {/* Close button for easier dismissal */}
      {isSticky && <CloseButton onClick={onCloseSticky} />}
      
      <ProfileHeader person={person} />
      
      <ProfileBio 
        bio={person.bio} 
        gptDescription={person.gptDescription} 
      />
      
      <ProfileSocialLinks 
        linkedInUrl={linkedInUrl} 
        website={person.website} 
      />
    </div>
  );
};

export default ProfileCardContent;
