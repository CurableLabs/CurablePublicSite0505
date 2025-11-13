import { Link, useLocation } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const DesktopNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="hidden md:flex items-center space-x-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-link bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-sm sm:text-base font-poppins font-medium">
              ABOUT
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-2 w-48 bg-gunmetal-900/95 border border-spectral-crimson/30 backdrop-blur-lg shadow-lg shadow-spectral-crimson/20">
                <NavigationMenuLink asChild>
                  <Link 
                    to="/about" 
                    className="block px-3 py-2 text-sm text-foreground hover:text-spectral-glow transition-colors font-poppins"
                  >
                    About
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/whitepaper" 
                    className="block px-3 py-2 text-sm text-foreground hover:text-spectral-glow transition-colors font-poppins"
                  >
                    Whitepaper
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/tokenomics" 
                    className="block px-3 py-2 text-sm text-foreground hover:text-spectral-glow transition-colors font-poppins"
                  >
                    Tokenomics
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-link bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-sm sm:text-base font-poppins font-medium">
              PRODUCTS
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-2 w-48 bg-gunmetal-900/95 border border-cosmic-indigo/30 backdrop-blur-lg shadow-lg shadow-cosmic-indigo/20">
                <NavigationMenuLink asChild>
                  <Link 
                    to="/wearable" 
                    className="block px-3 py-2 text-sm text-foreground hover:text-cosmic-aura transition-colors font-poppins"
                  >
                    Wearable
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/agency" 
                    className="block px-3 py-2 text-sm text-foreground hover:text-cosmic-aura transition-colors font-poppins"
                  >
                    Agency
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    to="/marketplace"
                    className="block px-3 py-2 text-sm text-foreground hover:text-cosmic-aura transition-colors font-poppins"
                  >
                    Marketplace
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-link bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-sm sm:text-base font-poppins font-medium">
              APPS
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-2 w-32 bg-gunmetal-900/95 border border-quantum-cyan/30 backdrop-blur-lg shadow-lg shadow-quantum-cyan/20">
                <NavigationMenuLink asChild>
                  <a
                    href="https://curio-data.lovable.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 text-lg hover:bg-quantum-cyan/20 transition-colors rounded"
                  >
                    <span>📈 👾 ⚛️</span>
                  </a>
                </NavigationMenuLink>
                {/* Temporarily commented out - Second app link */}
                {/* <NavigationMenuLink asChild>
                  <a
                    href="https://binding-db-integrator-1-codelace77.replit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 text-lg hover:bg-cosmic-indigo/20 transition-colors rounded"
                  >
                    <span>🧬 🔭 📊</span>
                  </a>
                </NavigationMenuLink> */}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link 
        to="/news" 
        className={`nav-link after:transition-all after:duration-300 font-poppins font-medium ${isActive('/news') ? 'text-spectral-glow after:opacity-100 after:left-0 after:right-0' : ''}`}
      >
        NEWS
      </Link>

      <Link 
        to="/poetry" 
        className={`nav-link after:transition-all after:duration-300 font-poppins font-medium ${isActive('/poetry') ? 'text-cosmic-aura after:opacity-100 after:left-0 after:right-0' : ''}`}
      >
        POETRY
      </Link>

      <a 
        href="https://cureworld-1.onrender.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="nav-link after:transition-all after:duration-300 hover:text-spectral-glow font-poppins font-medium"
      >
        CUREWORLD
      </a>

    </nav>
  );
};