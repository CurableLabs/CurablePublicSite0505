
import React, { useEffect, useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
type WhitepaperSectionType = Tables<'whitepaper_sections'>;

interface WhitepaperSectionProps {
  section: WhitepaperSectionType;
  index: number;
  activeSection: number;
  formatHex: (index: number) => string;
  isLast: boolean;
}

const WhitepaperSectionComponent: React.FC<WhitepaperSectionProps> = ({ 
  section, 
  index, 
  activeSection, 
  formatHex,
  isLast 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Add animation delay based on section index
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 * index);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div 
      id={`section-${index}`} 
      className={`whitepaper-section space-y-4 transition-all duration-500
        ${activeSection === index ? 'opacity-100' : 'opacity-80'}
        ${isVisible ? 'translate-y-0' : 'translate-y-4 opacity-0'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="font-mono bg-dark-surface border border-graphite-700/60 p-3 rounded flex items-center relative overflow-hidden holo-scan">
        <span className="text-bio-blue mr-2 font-bold">{formatHex(index)}:</span>
        <h2 className="text-xl text-quantum-red font-bold font-space relative z-10">
          {section.title}
        </h2>
        
        {/* Dynamic corner decorations */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bio-blue/40"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-quantum-red/40"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-quantum-red/40"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bio-blue/40"></div>
      </div>
      
      <div className="font-sans text-titanium-white/90 leading-relaxed whitespace-pre-line pl-4 ml-2 border-l-2 border-graphite-700/60 data-surge">
        {section.body}
      </div>
      
      {/* Enhanced section divider */}
      {!isLast && (
        <div className="font-mono text-xs text-titanium-white/30 pl-4 relative">
          <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-graphite-700/60 to-transparent"></div>
          <div className="pt-2"># End of section {formatHex(index)}</div>
        </div>
      )}
    </div>
  );
};

export default WhitepaperSectionComponent;
