
import React from 'react';
// TODO: Migrate tokenomics data to Supabase
const tokenRows = [
  { category: 'Core Team', percentage: '30%' },
  { category: 'Capital', percentage: '19%' },
  { category: 'Treasury Reserve', percentage: '51%' }
];
const tokenIntro = 'Tokenomics distribution for $CURE token';
const vestingText = '1-year cliff, 3-year linear vesting for Core Team allocation';
import { Link } from 'react-router-dom';
import CommandHUDHeader from '@/components/CommandHUDHeader';
import CommandPatternBackground from '@/components/CommandPatternBackground';
import HUDGrid from '@/components/HUDGrid';
import { ArrowRight, CircleDollarSign, TrendingUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TokenTable = ({ rows }) => {
  return (
    <div className="card-holo relative h-full overflow-hidden">
      <CommandPatternBackground variant="grid" intensity="high" animated={true} color="blue" />
      <div className="relative z-10">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-graphite-700/60">
              <TableHead className="px-2 py-1 text-left font-mono text-spectral-crimson text-xs w-3/4">Category</TableHead>
              <TableHead className="px-2 py-1 text-right font-mono text-spectral-crimson text-xs w-1/4">Allocation %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow 
                key={index} 
                className={`
                  ${index === rows.length - 1 ? 'border-t-2 border-graphite-700/60' : 'border-b border-graphite-700/30'} 
                  ${row.cat.startsWith('—') ? 'text-titanium-white/60' : ''}
                  hover:bg-dark-surface/50 transition-colors
                `}
              >
                <TableCell className="px-2 py-1 text-left font-mono text-xs">
                  {row.cat}
                </TableCell>
                <TableCell className="px-2 py-1 text-right font-mono text-xs">
                  {row.pct}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const VestingSchedule = () => {
  return (
    <div className="card-holo relative h-full overflow-hidden">
      <CommandPatternBackground variant="nodes" intensity="high" animated={true} color="violet" />
      <div className="space-y-2 relative z-10 p-2">
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-mono text-xs text-titanium-white/80">Core Team</span>
            <span className="font-mono text-xs text-cosmic-indigo">4 year vesting, 1 year cliff</span>
          </div>
          <div className="h-2 bg-graphite-700/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cosmic-indigo rounded-full animate-[vesting_2s_ease-out_forwards]"
              style={{ width: '25%' }}
            />
          </div>
        </div>
      </div>
      <div className="mt-2 prose prose-invert max-w-none text-titanium-white/90 text-xs leading-tight relative z-10 p-2">
        <div dangerouslySetInnerHTML={{ __html: vestingText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-spectral-glow">$1</strong>').replace(/\n/g, '<br/>') }} />
      </div>
    </div>
  );
};

const Tokenomics = () => {
  return (
    <div className="container mx-auto p-4 relative">
      {/* Background pattern with increased visibility */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HUDGrid variant="dense" color="violet" intensity="high" />
      </div>
      
      {/* Intro */}
      <div className="max-w-5xl mx-auto relative z-10">
        <CommandHUDHeader 
          title="CURE Token Economics"
          subtitle="Decentralized biomedical incentive mechanism"
          statusText="TOKENOMICS MODULE" 
          className="mb-3"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Token Intro Panel */}
          <div className="glass-panel p-3 relative group overflow-hidden">
            {/* Enhanced background pattern */}
            <CommandPatternBackground variant="circuit" intensity="high" animated={true} color="multi" />
            <div className="absolute inset-0 bg-dark-surface/50 rounded-lg -z-10 backdrop-blur-md"></div>
            
            {/* Add animated corners */}
            <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t border-l border-spectral-crimson/50 rounded-tl-sm group-hover:border-spectral-crimson transition-colors duration-300"></div>
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t border-r border-cosmic-indigo/50 rounded-tr-sm group-hover:border-cosmic-indigo transition-colors duration-300"></div>
            <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b border-l border-cosmic-indigo/50 rounded-bl-sm group-hover:border-cosmic-indigo transition-colors duration-300"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b border-r border-spectral-crimson/50 rounded-br-sm group-hover:border-spectral-crimson transition-colors duration-300"></div>
            
            <div className="flex items-start gap-2 relative z-10">
              <CircleDollarSign className="text-spectral-crimson w-4 h-4 mt-1 shrink-0" />
              <p className="text-xs text-titanium-white leading-tight">
                {tokenIntro}
              </p>
            </div>
          </div>
          
          {/* Token Table */}
          <div>
            <div className="mb-1 font-mono text-xs text-titanium-white flex items-center">
              <span className="text-spectral-crimson mr-2">&gt;</span> Token Allocation
              <TrendingUp className="ml-2 text-cosmic-indigo w-3 h-3" />
            </div>
            <TokenTable rows={tokenRows} />
          </div>
          
          {/* Vesting Schedule */}
          <div>
            <div className="mb-1 font-mono text-xs text-titanium-white">
              <span className="text-spectral-crimson mr-2">&gt;</span> Vesting Schedule
            </div>
            <VestingSchedule />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="mt-3">
          {/* Call-to-Action */}
          <div className="glass-panel p-3 text-center relative group overflow-hidden">
            <CommandPatternBackground variant="matrix" intensity="high" animated={true} color="green" />
            <div className="absolute inset-0 bg-dark-surface/60 backdrop-blur-md -z-10"></div>
            <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t border-l border-spectral-glow/50 rounded-tl-sm"></div>
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t border-r border-spectral-glow/50 rounded-tr-sm"></div>
            <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b border-l border-spectral-glow/50 rounded-bl-sm"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b border-r border-spectral-glow/50 rounded-br-sm"></div>
            <h3 className="text-sm font-poppins font-bold text-titanium-white mb-1 relative z-10">
              <span className="text-spectral-crimson">&gt;</span> Get Involved
            </h3>
            <p className="text-titanium-white/90 mb-2 text-xs relative z-10">
              Join the Curable DAO community and contribute to the future of decentralized biomedical research.
            </p>
            <Link 
              to="/join" 
              className="bg-spectral-crimson text-titanium-white hover:bg-spectral-crimson/90 font-poppins font-bold flex items-center gap-2 shadow-[0_0_12px_hsl(var(--spectral-crimson)/0.3)] hover:shadow-[0_0_20px_hsl(var(--spectral-crimson)/0.5)] transition-all duration-300 relative overflow-hidden group px-3 py-1.5 rounded-lg mx-auto inline-flex text-sm z-10"
            >
              <span className="relative z-10">JOIN THE DAO</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-spectral-crimson to-cosmic-indigo -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;

