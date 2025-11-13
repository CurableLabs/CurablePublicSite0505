
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Github, Zap } from "lucide-react";
import { Tables } from '@/integrations/supabase/types';
type WhitepaperSection = Tables<'whitepaper_sections'>;

interface WhitepaperSidebarProps {
  sections: WhitepaperSection[];
  activeSection: number;
  onSectionClick: (index: number) => void;
  formatHex: (index: number) => string;
}

const WhitepaperSidebar: React.FC<WhitepaperSidebarProps> = ({ 
  sections, 
  activeSection, 
  onSectionClick,
  formatHex 
}) => {
  return (
    <aside className="w-full md:w-64 md:min-h-[calc(100vh-9rem)] border-r border-graphite-700/60 bg-dark-surface p-4 md:sticky md:top-20 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-radial opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-logo-blue/0 via-logo-blue/20 to-logo-blue/0"></div>
      
      <div className="font-mono text-sm text-titanium-white/70 mb-3 flex items-center">
        <span className="inline-block w-1 h-1 bg-bio-blue mr-1.5 rounded-full animate-pulse-dot"></span>
        // Section Index
      </div>
      
      <nav className="space-y-1 relative">
        {/* Vertical data line */}
        <div className="absolute left-1 top-2 bottom-2 w-px bg-graphite-700/30"></div>
        
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => onSectionClick(index)}
            className={`w-full text-left p-2 rounded transition-all flex items-center gap-2 hover:bg-dark-base group
              ${activeSection === index ? 'text-bio-blue bg-dark-base bg-gradient-to-r from-dark-base to-dark-base hover:from-dark-base hover:via-logo-blue/5 hover:to-dark-base' : 'text-titanium-white/70'}`}
          >
            <span className={`inline-block w-2 h-2 rounded-full z-10 transition-all duration-300
              ${activeSection === index ? 'bg-plasma-violet animate-pulse scale-110' : 'bg-titanium-white/30 group-hover:bg-titanium-white/50'}`}></span>
            <span className="text-xs text-quantum-red font-mono mr-1 transition-all">{formatHex(index)}:</span>
            <span className="font-mono text-sm truncate transition-all group-hover:translate-x-0.5">{section.title.replace(/^\d+\.\s+/, '')}</span>
          </button>
        ))}
      </nav>
      
      <div className="mt-6 pt-6 border-t border-graphite-700/60 space-y-2">
        
        
        <Button 
          variant="outline" 
          className="w-full bg-dark-base border-graphite-700/60 hover:bg-gunmetal-900 hover:border-quantum-red/60 font-mono text-quantum-red flex items-center gap-2 group relative overflow-hidden"
        >
          <Zap className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="relative z-10">fork.protocol</span>
          <div className="absolute inset-0 bg-quantum-red/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </Button>
      </div>
      
      {/* Technical data display */}
      <div className="mt-6 text-[0.6rem] font-mono text-titanium-white/30 border border-graphite-700/30 rounded p-2">
        <div className="flex justify-between items-center">
          <span>protocol-version:</span>
          <span className="text-bio-blue">2.5.0</span>
        </div>
        <div className="flex justify-between items-center">
          <span>consensus:</span>
          <span className="text-plasma-violet">multi-sig</span>
        </div>
        <div className="flex justify-between items-center">
          <span>encryption:</span>
          <span className="text-quantum-red">curve25519</span>
        </div>
      </div>
    </aside>
  );
};

export default WhitepaperSidebar;
