import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Play, Pause, Shuffle, RotateCcw, Loader2 } from 'lucide-react';
import { useHaikus, convertHaikuToAppFormat, type HaikuAppFormat } from '@/hooks/useSupabaseData';
import ParticleBackground from '@/components/ParticleBackground';

const Poetry = () => {
  const { data: haikuData, isLoading, error } = useHaikus();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentHaiku, setCurrentHaiku] = useState<HaikuAppFormat | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showTitle, setShowTitle] = useState(true);

  // Convert haikus from DB format to app format
  const haikus = useMemo(() =>
    haikuData ? haikuData.map(convertHaikuToAppFormat) : [],
    [haikuData]
  );

  const categories = Array.from(new Set(haikus.map(h => h.category)));

  const filteredHaikus = selectedCategory
    ? haikus.filter(h => h.category === selectedCategory)
    : haikus;

  // Auto-hide title after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentHaiku(prevHaiku => {
        const availableHaikus = filteredHaikus.filter(h => h.id !== prevHaiku?.id);
        if (availableHaikus.length === 0) return prevHaiku;
        return availableHaikus[Math.floor(Math.random() * availableHaikus.length)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, filteredHaikus]);

  const showRandomHaiku = () => {
    setCurrentHaiku(prevHaiku => {
      const availableHaikus = filteredHaikus.filter(h => h.id !== prevHaiku?.id);
      if (availableHaikus.length === 0) return filteredHaikus[0] || null;
      return availableHaikus[Math.floor(Math.random() * availableHaikus.length)];
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      philosophy: 'bg-warm-rose/20 text-warm-rose border-warm-rose/30',
      science: 'bg-logo-blue/20 text-logo-blue border-logo-blue/30',
      healing: 'bg-warm-amber/20 text-warm-amber border-warm-amber/30',
      technology: 'bg-warm-coral/20 text-warm-coral border-warm-coral/30',
      nature: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-titanium-white/20 text-titanium-white border-titanium-white/30';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gunmetal-900">
      {/* Background Effects */}
      <ParticleBackground 
        count={80} 
        color="multi" 
        speed="slow" 
        intensity="low"
        interactive={true}
      />
      
      <div className="fixed inset-0 bg-gradient-radial from-quantum-red/10 via-brand-charcoal/5 to-logo-blue/5 pointer-events-none" />
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full bg-warm-amber/5 blur-3xl opacity-30 animate-pulse" />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full bg-warm-coral/5 blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Enhanced Title Section */}
      <AnimatePresence>
        {showTitle && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20"
          >
            <div className="card-glass p-12 shadow-glow">
              <h1 className="text-display text-gradient-biotech mb-6 animate-fade-in-up">
                Poetry Sanctuary
              </h1>
              <p className="text-body-large text-foreground/80 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Where science meets soul, healing finds voice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isLoading && (
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="card-glass p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-warm-rose mx-auto mb-4" />
            <p className="text-body text-foreground/60">Loading haikus...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="card-glass p-12 text-center">
            <p className="text-body text-red-400">Error loading haikus: {error.message}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && (
      <div className="relative z-10 min-h-screen p-8">
        {/* Enhanced Controls */}
        <div className={`fixed top-24 left-8 right-8 z-30 transition-all duration-500 ${currentHaiku ? 'opacity-100 scale-100' : 'opacity-60 scale-95 pointer-events-none'}`}>
          <div className={`card-glass p-6 transition-all duration-300 ${currentHaiku ? 'shadow-biotech' : 'shadow-md'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`btn-ghost text-xs ${selectedCategory === null ? 'btn-primary' : ''}`}
                >
                  All ({haikus.length})
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn-ghost text-xs capitalize ${selectedCategory === category ? 'btn-primary' : ''}`}
                  >
                    {category} ({haikus.filter(h => h.category === category).length})
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`btn-magnetic flex items-center gap-2 text-xs ${currentHaiku ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isAutoPlay ? 'Pause' : 'Auto-Play'}
                </button>
                <button
                  onClick={showRandomHaiku}
                  className={`btn-magnetic flex items-center gap-2 text-xs ${currentHaiku ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <Shuffle className="w-4 h-4" />
                  {currentHaiku ? 'Next' : 'Random'}
                </button>
                <button
                  onClick={() => setCurrentHaiku(null)}
                  className={`btn-ghost flex items-center gap-2 text-xs ${currentHaiku ? 'opacity-100' : 'opacity-50'}`}
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Haiku Display */}
        <div className="flex items-center justify-center min-h-screen pt-32">
          <AnimatePresence mode="wait">
            {currentHaiku && (
              <motion.div
                key={currentHaiku.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl w-full"
              >
                <div className="card-glass p-16 text-center shadow-neural animate-scale-in">
                  <div className="space-y-8">
                    {/* Haiku Lines */}
                    <div className="space-y-6">
                      {currentHaiku.lines.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.3, duration: 0.5 }}
                          className="text-headline text-gradient-biotech leading-relaxed animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.3}s` }}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Metadata */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="flex flex-col items-center gap-4 pt-8 border-t border-foreground/10"
                    >
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant="outline" 
                          className={`${getCategoryColor(currentHaiku.category)} font-mono text-xs px-3 py-1`}
                        >
                          {currentHaiku.category}
                        </Badge>
                        <span className="text-body text-foreground/60">
                          {currentHaiku.theme}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!currentHaiku && !showTitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-titanium-white/40 font-poppins text-lg mb-6">
                Ready to explore the poetry sanctuary
              </p>
              <Button
                onClick={showRandomHaiku}
                className="bg-warm-rose/20 hover:bg-warm-rose/30 border-warm-rose/30"
                variant="outline"
              >
                Begin Journey
              </Button>
            </motion.div>
          )}
        </div>

        {/* Footer Status */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="text-center">
            <p className="text-xs text-titanium-white/30 font-mono">
              {isAutoPlay && currentHaiku ? 'Auto-playing...' : `${filteredHaikus.length} haikus available`}
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Poetry;