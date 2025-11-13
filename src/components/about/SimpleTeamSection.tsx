import React, { memo, useMemo } from 'react';
import { usePeople, convertPersonToAppFormat } from '@/hooks/useSupabaseData';
import GradientText from '@/components/ui/GradientText';
import SimpleProfileCard from './SimpleProfileCard';
import { Loader2 } from 'lucide-react';

interface SimpleTeamSectionProps {
  isVisible: boolean;
}

const SimpleTeamSection: React.FC<SimpleTeamSectionProps> = memo(({ isVisible }) => {
  const { data: peopleData, isLoading } = usePeople();

  const people = useMemo(() =>
    peopleData ? peopleData.map(convertPersonToAppFormat) : [],
    [peopleData]
  );

  if (!isVisible) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-quantum-red" />
      </div>
    );
  }

  // Simple sorting - no complex logic
  const sortedPeople = [...people].sort((a, b) => {
    const order = ['founder', 'guardian', 'team', 'advisor', 'contributor'];
    return order.indexOf(a.group) - order.indexOf(b.group);
  });

  return (
    <div className="space-y-8">
      {/* Simple Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-4 text-white">
          Our Team
        </h2>
        <div className="w-20 h-1 bg-quantum-red mx-auto mb-6"></div>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed font-poppins">
          Brilliant minds working together to revolutionize drug discovery.
        </p>
      </div>

      {/* Optimized Grid - 6+ users per row to maximize real estate */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
        {sortedPeople.map((person) => (
          <SimpleProfileCard key={person.id} person={person} />
        ))}
      </div>

      {/* Simple Stats */}
      <div className="mt-12 pt-8 border-t border-quantum-red/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-quantum-red mb-2">
              {sortedPeople.filter(p => p.group === 'founder').length}
            </div>
            <p className="text-foreground/80 font-poppins">Founders</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-logo-blue mb-2">
              {sortedPeople.filter(p => p.group === 'team').length}
            </div>
            <p className="text-foreground/80 font-poppins">Team</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-plasma-violet mb-2">
              {sortedPeople.filter(p => p.group === 'advisor').length}
            </div>
            <p className="text-foreground/80 font-poppins">Advisors</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-warm-amber mb-2">
              {sortedPeople.filter(p => p.group === 'contributor').length}
            </div>
            <p className="text-foreground/80 font-poppins">Contributors</p>
          </div>
        </div>
      </div>
    </div>
  );
});

SimpleTeamSection.displayName = 'SimpleTeamSection';

export default SimpleTeamSection;