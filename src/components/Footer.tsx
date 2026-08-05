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
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 text-slate-700">
      <div className="container-lux px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand & Logo */}
          <div className="space-y-4">
            <Link 
              to="/" 
              onClick={() => handleNavigation('/')} 
              className="inline-block group"
              aria-label="Ziya Traders Home"
            >
              <img
                src="/logo.png"
                alt="Ziya Traders Logo"
                className="h-12 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
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
                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
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
                    className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/products?category=granite" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors">
                  Granite Collections
                </Link>
              </li>
              <li>
                <Link to="/products?category=marble" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors">
                  Marble Slabs
                </Link>
              </li>
              <li>
                <Link to="/products?category=quartz" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors">
                  Engineered Quartz
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
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
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
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