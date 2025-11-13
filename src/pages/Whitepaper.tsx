
import React, { useState, useEffect } from 'react';
import { useWhitepaperSections } from '@/hooks/useSupabaseData';
import { ScrollArea } from "@/components/ui/scroll-area";
import WhitepaperHeader from '@/components/whitepaper/WhitepaperHeader';
import WhitepaperSidebar from '@/components/whitepaper/WhitepaperSidebar';
import WhitepaperSectionComponent from '@/components/whitepaper/WhitepaperSection';
import SignatureBlock from '@/components/whitepaper/SignatureBlock';
import CallToAction from '@/components/whitepaper/CallToAction';
import ParticleBackground from '@/components/ParticleBackground';
import { Loader2 } from 'lucide-react';

const Whitepaper = () => {
  const { data: sections, isLoading, error } = useWhitepaperSections();
  const [activeSection, setActiveSection] = useState(0);
  const fullTerminalText = '> initializing whitepaper_v2.5...\n> system loaded: curable-core-protocol\n> rendering document...';

  // Intersection observer for scrollspy functionality
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.id.split('-')[1]);
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all section elements
    document.querySelectorAll('.whitepaper-section').forEach(
      section => observer.observe(section)
    );

    return () => {
      document.querySelectorAll('.whitepaper-section').forEach(
        section => observer.unobserve(section)
      );
    };
  }, []);

  // Handle section click
  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format section index as hex
  const formatHex = (index: number) => {
    return `0x${index.toString(16).padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="container max-w-full p-0 min-h-[calc(100vh-5rem)] relative overflow-hidden flex items-center justify-center">
        <ParticleBackground count={30} color="blue" intensity="low" speed="slow" />
        <div className="card-glass p-12 text-center z-10">
          <Loader2 className="w-12 h-12 animate-spin text-logo-blue mx-auto mb-4" />
          <p className="text-body text-foreground/60">Loading whitepaper...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-full p-0 min-h-[calc(100vh-5rem)] relative overflow-hidden flex items-center justify-center">
        <ParticleBackground count={30} color="blue" intensity="low" speed="slow" />
        <div className="card-glass p-12 text-center z-10">
          <p className="text-body text-red-400">Error loading whitepaper: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-full p-0 min-h-[calc(100vh-5rem)] relative overflow-hidden">
      {/* Subtle particle background */}
      <ParticleBackground count={30} color="blue" intensity="low" speed="slow" />

      <WhitepaperHeader fullTerminalText={fullTerminalText} />

      <div className="flex flex-col md:flex-row">
        <WhitepaperSidebar
          sections={sections || []}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          formatHex={formatHex}
        />

        {/* Main content area */}
        <main className="flex-1 bg-gunmetal-900/80 backdrop-blur-sm min-h-[calc(100vh-9rem)] relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-radial opacity-10 pointer-events-none"></div>
          <div className="absolute inset-0 grid-overlay opacity-5 pointer-events-none"></div>

          <ScrollArea className="h-[calc(100vh-9rem)]">
            <div className="p-6 md:p-8 space-y-12">
              {(sections || []).map((section, index) => (
                <WhitepaperSectionComponent
                  key={index}
                  section={section}
                  index={index}
                  activeSection={activeSection}
                  formatHex={formatHex}
                  isLast={index === (sections?.length || 0) - 1}
                />
              ))}

              <SignatureBlock />
              <CallToAction />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default Whitepaper;
