
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';
import { NavLogo } from './NavLogo';
import { ActionButtons } from './ActionButtons';
import { useState } from 'react';

export const MobileNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [productsOpen, setProductsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-graphite-700/40 border border-blue-400/30 shadow-md shadow-blue-400/20 hover:shadow-blue-400/40 hover:border-blue-400/50 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-titanium-white" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 border-0 w-full max-w-full sm:max-w-md bg-gunmetal-900/95 backdrop-blur-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-graphite-700/40">
            <NavLogo />
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <nav className="flex flex-col space-y-4">
              <div className="border-b border-graphite-700/40">
                <button 
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className="w-full flex items-center justify-between text-base font-poppins font-semibold py-3 text-titanium-white"
                >
                  ABOUT
                  <ChevronDown className={`w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>
                {aboutOpen && (
                  <div className="pb-3 pl-4 space-y-2">
                    <SheetClose asChild>
                      <Link 
                        to="/about" 
                        className={`block text-sm py-2 ${isActive('/about') ? 'text-blue-400' : 'text-titanium-white/80'}`}
                      >
                        About
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        to="/whitepaper" 
                        className={`block text-sm py-2 ${isActive('/whitepaper') ? 'text-blue-400' : 'text-titanium-white/80'}`}
                      >
                        Whitepaper
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        to="/tokenomics" 
                        className={`block text-sm py-2 ${isActive('/tokenomics') ? 'text-blue-400' : 'text-titanium-white/80'}`}
                      >
                        Tokenomics
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>
              
              <div className="border-b border-graphite-700/40">
                <button 
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="w-full flex items-center justify-between text-base font-poppins font-semibold py-3 text-titanium-white"
                >
                  PRODUCTS
                  <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                {productsOpen && (
                  <div className="pb-3 pl-4 space-y-2">
                    <SheetClose asChild>
                      <Link 
                        to="/wearable" 
                        className={`block text-sm py-2 ${isActive('/wearable') ? 'text-blue-400' : 'text-titanium-white/80'}`}
                      >
                        Wearable
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        to="/agency" 
                        className={`block text-sm py-2 ${isActive('/agency') ? 'text-blue-400' : 'text-titanium-white/80'}`}
                      >
                        Agency
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/marketplace"
                        className={`block text-sm py-2 ${isActive('/marketplace') ? 'text-blue-400' : 'text-titanium-white/80'}`}
                      >
                        Marketplace
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>
              
              <a 
                href="https://cureworld-1.onrender.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base font-poppins font-semibold py-3 border-b border-graphite-700/40 text-titanium-white hover:text-blue-400"
              >
                CUREWORLD
              </a>

              <SheetClose asChild>
                <Link 
                  to="/news" 
                  className={`text-base font-poppins font-semibold py-3 border-b border-graphite-700/40 ${isActive('/news') ? 'text-blue-400' : 'text-titanium-white'}`}
                >
                  NEWS
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link 
                  to="/poetry" 
                  className={`text-base font-poppins font-semibold py-3 border-b border-graphite-700/40 ${isActive('/poetry') ? 'text-blue-400' : 'text-titanium-white'}`}
                >
                  POETRY
                </Link>
              </SheetClose>

            </nav>
          </div>
          
          <div className="p-4 pt-0">
            <ActionButtons isMobile={true} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
