
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { usePeople, convertPersonToAppFormat } from '@/hooks/useSupabaseData';
import ProfileCard from '@/components/ProfileCard';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useInViewport } from '@/utils/performance';
import GradientText from '@/components/ui/GradientText';
import { Loader2 } from 'lucide-react';

interface TeamSectionProps {
  isVisible: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ isVisible }) => {
  const { ref, isInViewport } = useInViewport();
  const { data: peopleData, isLoading } = usePeople();
  const [revealCards, setRevealCards] = useState<number[]>([]);

  // Convert people from DB format to app format
  const people = useMemo(() =>
    peopleData ? peopleData.map(convertPersonToAppFormat) : [],
    [peopleData]
  );

  // Group and sort people by priority
  const sortedPeople = useMemo(() => [
    ...people.filter(person => person.group === 'founder'),
    ...people.filter(person => person.group === 'team'),
    ...people.filter(person => person.group === 'advisor'),
    ...people.filter(person => person.group === 'contributor')
  ], [people]);

  // Staggered reveal animation
  useEffect(() => {
    if (isVisible && sortedPeople.length > 0) {
      const timer = setTimeout(() => {
        sortedPeople.forEach((_, index) => {
          setTimeout(() => {
            setRevealCards(prev => [...prev, index]);
          }, index * 80);
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, sortedPeople.length]);
  
  if (isLoading) {
    return (
      <div className="relative w-full flex items-center justify-center py-20">
        <div className="card-glass p-12 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-quantum-red mx-auto mb-4" />
          <p className="text-body text-foreground/60">Loading team...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="team-section"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full"
    >
      {/* Revolutionary Quantum Field Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Multi-layered quantum effects */}
        <div className="quantum-particles-optimized opacity-20"></div>
        <div className="neural-network-optimized opacity-15">
          <div className="neural-node-optimized"></div>
          <div className="neural-node-optimized"></div>
          <div className="neural-node-optimized"></div>
          <div className="neural-node-optimized"></div>
        </div>
        <div className="data-stream-optimized opacity-10"></div>
        <div className="holographic-mesh-optimized opacity-12"></div>
        
        {/* Flowing gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-quantum-red/20 via-plasma-violet/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-logo-blue/20 via-bio-green/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Revolutionary Header Design */}
        <div className="text-center mb-16">
          {/* Main Title */}
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins font-black mb-6">
              Meet Our{' '}
              <GradientText variant="multi" className="inline-block font-black">
                Quantum Team
              </GradientText>
            </h2>
            
            {/* Elegant divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-quantum-red to-transparent"></div>
              <div className="w-4 h-4 rounded-full bg-quantum-red shadow-lg shadow-quantum-red/50 animate-pulse"></div>
              <div className="w-24 h-1 bg-gradient-to-r from-quantum-red via-plasma-violet to-logo-blue"></div>
              <div className="w-4 h-4 rounded-full bg-logo-blue shadow-lg shadow-logo-blue/50 animate-pulse"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-logo-blue via-transparent to-transparent"></div>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-foreground/80 max-w-5xl mx-auto leading-relaxed font-poppins">
            A diverse collective of{' '}
            <span className="text-quantum-red font-bold holographic-text">scientists</span>,{' '}
            <span className="text-plasma-violet font-bold holographic-text">engineers</span>, and{' '}
            <span className="text-logo-blue font-bold holographic-text">visionaries</span>{' '}
            working to revolutionize biotech research through decentralized innovation and AI-powered discovery.
          </p>
        </div>
        
        {/* Enhanced Team Grid */}
        <TooltipProvider>
          <div className="card-quantum-optimized bg-brand-charcoal/30 backdrop-blur-lg border border-quantum-red/20 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-quantum-red/20">
            {/* Grid container with improved responsiveness */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8">
              {sortedPeople.map((person, index) => (
                <div 
                  key={`team-member-${person.id}`}
                  className={`transform transition-all duration-1000 
                            ${revealCards.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-90'}`}
                  style={{ 
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  <ProfileCard person={person} />
                </div>
              ))}
            </div>
            
            {/* Team Stats Footer */}
            <div className="mt-12 pt-8 border-t border-quantum-red/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-quantum-red holographic-text mb-2">
                    {people.filter(p => p.group === 'founder').length}
                  </div>
                  <div className="text-foreground/70 font-poppins font-medium">Founders</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-logo-blue holographic-text mb-2">
                    {people.filter(p => p.group === 'team').length}
                  </div>
                  <div className="text-foreground/70 font-poppins font-medium">Core Guardians</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-plasma-violet holographic-text mb-2">
                    {people.filter(p => p.group === 'advisor').length}
                  </div>
                  <div className="text-foreground/70 font-poppins font-medium">Strategic Advisors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-warm-amber holographic-text mb-2">
                    {people.filter(p => p.group === 'contributor').length}
                  </div>
                  <div className="text-foreground/70 font-poppins font-medium">Contributors</div>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TeamSection;
