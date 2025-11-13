import React, { memo, useMemo, useState, useCallback } from 'react';
import { usePeople, convertPersonToAppFormat } from '@/hooks/useSupabaseData';
import { useInViewport, useReducedMotion } from '@/utils/performance';
import GradientText from '@/components/ui/GradientText';
import OptimizedProfileCard from './OptimizedProfileCard';
import { Loader2 } from 'lucide-react';

interface TeamSectionProps {
  isVisible: boolean;
}

const OptimizedTeamSection: React.FC<TeamSectionProps> = memo(({ isVisible }) => {
  const { ref, isInViewport } = useInViewport();
  const prefersReducedMotion = useReducedMotion();
  const [loadedProfiles, setLoadedProfiles] = useState<Set<number>>(new Set());
  const { data: peopleData, isLoading } = usePeople();

  const people = useMemo(() =>
    peopleData ? peopleData.map(convertPersonToAppFormat) : [],
    [peopleData]
  );

  // Memoize sorted people to prevent re-computation
  const sortedPeople = useMemo(() => {
    const groupOrder = ['founder', 'guardian', 'team', 'advisor', 'contributor'];
    return [...people].sort((a, b) => {
      const aIndex = groupOrder.indexOf(a.group);
      const bIndex = groupOrder.indexOf(b.group);
      return aIndex - bIndex;
    });
  }, [people]);

  // Handle profile load callback
  const handleProfileLoad = useCallback((index: number) => {
    setLoadedProfiles(prev => new Set(prev).add(index));
  }, []);

  // Split into chunks for better loading
  const profileChunks = useMemo(() => {
    const chunkSize = 6;
    const chunks: typeof sortedPeople[] = [];
    for (let i = 0; i < sortedPeople.length; i += chunkSize) {
      chunks.push(sortedPeople.slice(i, i + chunkSize));
    }
    return chunks;
  }, [sortedPeople]);

  if (!isVisible) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-quantum-red" />
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-8">
      {/* Optimized Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-4 text-white">
          <GradientText variant="multi" animate={!prefersReducedMotion}>
            Our Team
          </GradientText>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-quantum-red to-warm-rose mx-auto mb-6"></div>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed font-poppins">
          Brilliant minds working together to revolutionize drug discovery through decentralized science.
        </p>
      </div>

      {/* Progressive Loading Grid */}
      {isInViewport && (
        <div className="space-y-12">
          {profileChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {chunk.map((person, index) => {
                const globalIndex = chunkIndex * 6 + index;
                return (
                  <div
                    key={person.id}
                    className={`transition-opacity duration-500 ${
                      loadedProfiles.has(globalIndex) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <OptimizedProfileCard
                      person={person}
                      onLoad={() => handleProfileLoad(globalIndex)}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Simplified Stats Footer */}
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
            <p className="text-foreground/80 font-poppins">Team Members</p>
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

OptimizedTeamSection.displayName = 'OptimizedTeamSection';

export default OptimizedTeamSection;