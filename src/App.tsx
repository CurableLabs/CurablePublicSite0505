
import { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BottomNavigation } from "./components/BottomNavigation";
import CommandPatternBackground from "./components/CommandPatternBackground";
import ParticleBackground from "./components/ParticleBackground";
import Index from "./pages/Index";
import About from "./pages/About";
import Whitepaper from "./pages/Whitepaper";
import Tokenomics from "./pages/Tokenomics";
import Poetry from "./pages/Poetry";


import Join from "./pages/Join";
import Novel from "./pages/Novel";
import Wearable from "./pages/Wearable";
import Agency from "./pages/Agency";
import Marketplace from "./pages/Marketplace";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Page transition wrapper component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);
  const [transitionClass, setTransitionClass] = useState("page-enter");
  
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      // Page change detected
      setTransitionClass("warm-flash page-enter");
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);
  
  return (
    <div className={transitionClass}>
      {children}
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced dramatic entrance with longer animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Enhanced App Loader with more dramatic appearance */}
            <div 
              className={`fixed inset-0 bg-gunmetal-900 z-50 flex items-center justify-center transition-opacity duration-1500 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex flex-col items-center magnetic-pull">
                <div className="w-28 h-28 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-logo-blue/20"></div>
                  <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-warm-rose animate-spin"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-4 border-warm-amber animate-pulse opacity-70"></div>
                </div>
                <div className="mt-6 font-space text-titanium-white text-3xl relative">
                  <span className="text-warm-rose animate-pulse">Curable</span>
                  <span className="text-titanium-white"> Labs</span>
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-warm-rose to-transparent animate-expand"></div>
                </div>
                <div className="mt-8 text-titanium-white/60 font-mono text-sm animate-pulse">
                  Initializing protocol...
                </div>
              </div>
            </div>

            <div className="flex min-h-screen w-full bg-gunmetal-900 text-titanium-white">
              <div className="flex-1 relative overflow-x-hidden">
                {/* Enhanced background effects */}
                <div className="fixed inset-0 bg-gradient-radial from-dark-surface/20 to-dark-base/95 pointer-events-none"></div>
                <div className="fixed inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
                
                {/* Enhanced glow effects at corners */}
                <div className="fixed top-0 left-0 w-72 h-72 rounded-full bg-warm-rose/10 blur-3xl"></div>
                <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full bg-warm-amber/10 blur-3xl"></div>
                <div className="fixed top-1/2 right-0 w-64 h-64 rounded-full bg-warm-coral/5 blur-3xl"></div>
                
                <Navbar />
                <main className={`relative z-10 transition-all duration-1000 magnetic-transition navbar-padding pb-20 ${isLoading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0 active'}`}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={
                      <PageTransition>
                        <Index />
                      </PageTransition>
                    } />
                    <Route path="/about" element={
                      <PageTransition>
                        <About />
                      </PageTransition>
                    } />
                    <Route path="/whitepaper" element={
                      <PageTransition>
                        <Whitepaper />
                      </PageTransition>
                    } />
                    <Route path="/tokenomics" element={
                      <PageTransition>
                        <Tokenomics />
                      </PageTransition>
                    } />
                    <Route path="/poetry" element={
                      <PageTransition>
                        <Poetry />
                      </PageTransition>
                    } />
                    <Route path="/wearable" element={
                      <PageTransition>
                        <Wearable />
                      </PageTransition>
                    } />
                    <Route path="/agency" element={
                      <PageTransition>
                        <Agency />
                      </PageTransition>
                    } />
                    <Route path="/marketplace" element={
                      <PageTransition>
                        <Marketplace />
                      </PageTransition>
                    } />
                    <Route path="/news" element={
                      <PageTransition>
                        <News />
                      </PageTransition>
                    } />
                    <Route path="/join" element={
                      <PageTransition>
                        <Join />
                      </PageTransition>
                    } />
                    <Route path="/novel" element={
                      <PageTransition>
                        <Novel />
                      </PageTransition>
                    } />
                    <Route path="*" element={
                      <PageTransition>
                        <NotFound />
                      </PageTransition>
                    } />
                  </Routes>
                </main>
                
                {/* Bottom Navigation */}
                <BottomNavigation />
              </div>
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
