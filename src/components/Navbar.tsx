import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/#about' },
  { label: 'Services', path: '/#services' },
  { label: 'Products', path: '/products' },
  { label: 'Board Management', path: '/leadership' },
  { label: 'Gallery', path: '/#gallery' },
  { label: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Unified click handler for both desktop and mobile navigation
  const handleNavigation = (path: string) => {
    setOpen(false); // Close mobile menu immediately on tap

    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');

      // If we are already on the home page, perform smooth scrolling
      if (location.pathname === '/' || location.pathname === '') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we are on a different page (like /products), navigate to home first with the anchor
        navigate(basePath || '/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    } else {
      // Normal route navigation
      navigate(path);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 py-2.5 bg-white/85 backdrop-blur-md border-b border-sky-100 shadow-md shadow-sky-900/5 font-sans"
    >
      <nav className="container-lux px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* LOGO IMAGE WITH SKY ILLUMINATION GLOW */}
        <Link 
          to="/" 
          onClick={() => handleNavigation('/')}
          className="group shrink-0 flex items-center py-1" 
          aria-label="Ziya Traders Home"
        >
          <img 
            src="/logo01.png" 
            alt="Ziya Traders Logo" 
            className="h-14 sm:h-20 lg:h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(2,132,199,0.3)]" 
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.path}>
              <button
                onClick={() => handleNavigation(l.path)}
                className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors relative group py-1 bg-transparent border-none cursor-pointer"
              >
                {l.label}
                {/* Sky Blue Underline Hover Effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(2,132,199,0.6)]" />
              </button>
            </li>
          ))}
        </ul>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden lg:block">
          <button 
            onClick={() => handleNavigation('/#contact')} 
            className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 rounded-lg shadow-md shadow-sky-600/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-sky-400/30"
          >
            Request Inspection
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="lg:hidden text-slate-700 p-2 -mr-2 rounded-lg hover:bg-sky-50 transition-colors focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Navigation Menu"
        >
          {open ? <X className="w-7 h-7 text-sky-600" /> : <Menu className="w-7 h-7 text-slate-700" />}
        </button>
      </nav>

      {/* MOBILE RESPONSIVE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-sky-100 shadow-xl"
          >
            <ul className="flex flex-col px-5 py-4 gap-1">
              {links.map((l) => (
                <li key={l.path}>
                  <button
                    onClick={() => handleNavigation(l.path)}
                    className="block w-full text-left py-3.5 text-slate-700 hover:text-sky-600 font-semibold text-base border-b border-sky-100 transition-colors bg-transparent border-x-0 border-t-0 cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <button
                  onClick={() => handleNavigation('/#contact')}
                  className="w-full text-base py-3.5 text-center block text-white bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg font-bold shadow-md shadow-sky-600/20 cursor-pointer active:scale-98 transition-transform"
                >
                  Request Inspection
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}