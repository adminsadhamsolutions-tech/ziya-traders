import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import type { SiteSettings } from '@/types';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');

      if (location.pathname === '/' || location.pathname === '') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(basePath || '/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    } else {
      navigate(path);
    }
  };

  const socials = [
    { url: settings?.facebook, Icon: Facebook, label: 'Facebook' },
    { url: settings?.instagram, Icon: Instagram, label: 'Instagram' },
    { url: settings?.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-slate-50/90 border-t border-slate-200/80 pt-16 pb-8 text-slate-700 relative overflow-hidden">
      {/* Premium Golden & Blue Ambient Lighting Glows */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-amber-200/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-lux px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand & Logo */}
          <div className="space-y-5">
            <Link 
              to="/" 
              onClick={() => handleNavigation('/')} 
              className="inline-block group"
              aria-label="Ziya Traders Home"
            >
              {/* Premium Glass Frame with Rich Golden Glow */}
              <div className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-amber-200/60 shadow-xl shadow-amber-500/10 group-hover:border-amber-400/80 transition-all duration-300">
                <img
                  src="/logo01.png"
                  alt="Ziya Traders Logo"
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(217,119,6,0.35)]"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              {settings?.tagline || 'Your Trusted Granite, Marble & Quartz Sourcing & Inspection Partner'}
            </p>

            {socials.length > 0 && (
              <div className="flex gap-2.5 pt-1">
                {socials.map(({ url, Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white border border-amber-200/70 flex items-center justify-center text-amber-600 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/#about' },
                { label: 'Services', path: '/#services' },
                { label: 'Gallery', path: '/#gallery' },
                { label: 'Contact', path: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors bg-transparent border-none p-0 cursor-pointer text-left font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/products?category=granite" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium">
                  Granite Collections
                </Link>
              </li>
              <li>
                <Link to="/products?category=marble" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium">
                  Marble Slabs
                </Link>
              </li>
              <li>
                <Link to="/products?category=quartz" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium">
                  Engineered Quartz
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span>{settings?.address || 'Hosur, Tamil Nadu, India'}</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`tel:${settings?.phone}`} className="hover:text-amber-600 transition-colors">
                  {settings?.phone || '+91 8870380977'}
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`mailto:${settings?.email}`} className="hover:text-amber-600 transition-colors break-all">
                  {settings?.email || 'javithjr2015@gmail.com'}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            &copy; {year} ZIYA TRADERS. All rights reserved. {settings?.gst ? `GST: ${settings.gst}` : ''}
          </p>
          <p className="text-xs text-slate-400 text-center sm:text-right">
            Premium Granite, Marble &amp; Quartz Sourcing &amp; Quality Control
          </p>
        </div>
      </div>
    </footer>
  );
}