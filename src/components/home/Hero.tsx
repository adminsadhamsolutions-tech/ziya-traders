import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Building2, CheckCircle, Globe, Home } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

// High-resolution fallback granite/stone image
const FALLBACK_HERO_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80";

export default function Hero() {
  const { settings } = useSettings();
  const [imageError, setImageError] = useState(false);

  // Use settings URL first; if empty or failed to load, use fallback
  const displayImage = (!imageError && settings?.hero_image_url) || FALLBACK_HERO_IMAGE;

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950 pt-28 pb-12 sm:pt-32 sm:pb-20">
      {/* Background Image & Editorial Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={displayImage}
          alt="Premium natural stone slab background"
          className="w-full h-full object-cover opacity-50 sm:opacity-60 transition-opacity duration-700"
          loading="eager"
          onError={() => setImageError(true)}
        />
        
        {/* Vignette Gradients for High Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
      </div>

      {/* Ambient Glows */}
      <motion.div
        className="absolute top-1/4 right-4 sm:right-12 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-amber-500/10 blur-[90px] sm:blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-4 sm:left-12 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#4A0404]/25 blur-[80px] sm:blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container-lux px-4 sm:px-6 lg:px-12 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Quality Seal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl mb-5 sm:mb-8 shadow-2xl"
        >
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-amber-200/90 uppercase">
            20+ Years of Excellence
          </span>
        </motion.div>

        {/* Multi-Tone Typography - Scaled for Mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold leading-[1.15] w-full flex flex-col gap-1.5 sm:gap-3 drop-shadow-2xl"
        >
          {/* Line 1: Main Brand Name */}
          <span className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100">
            Ziya Traders
          </span>

          {/* Line 2: Metallic Spaced Sub-Heading */}
          <span className="text-sm sm:text-2xl lg:text-3xl font-bold tracking-[0.18em] sm:tracking-[0.35em] uppercase bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent my-0.5 sm:my-1">
            Granite &bull; Marbles &bull; Quartz
          </span>

          {/* Line 3: Champagne Gold Highlight */}
          <span className="text-xl sm:text-4xl lg:text-5xl font-bold italic text-amber-400 drop-shadow-[0_2px_15px_rgba(251,191,36,0.3)]">
            &amp; Project Work Solutions
          </span>
        </motion.h1>

        {/* Description Paragraph - Fitted for Mobile */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 sm:mt-8 text-sm sm:text-xl text-slate-300/95 max-w-3xl leading-relaxed font-normal px-2 sm:px-0"
        >
          Serving <strong className="text-white font-semibold">international, domestic, and local buyers</strong> with complete solutions for <strong className="text-white font-semibold">all commercial projects</strong> and <strong className="text-white font-semibold">housing design materials</strong>. We provide rigorous <strong className="text-white font-semibold underline decoration-amber-500/50 underline-offset-4">export quality inspection</strong> alongside end-to-end <strong className="text-white font-semibold">export solutions</strong> for India’s finest natural stones.
        </motion.p>

        {/* Feature Badges - Responsive Grid on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-4 w-full max-w-2xl text-[11px] sm:text-sm font-semibold text-amber-200/90 uppercase tracking-wider"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-slate-900/80 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-lg border border-amber-500/20 shadow-md">
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="truncate">Commercial Projects</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-slate-900/80 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-lg border border-amber-500/20 shadow-md">
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="truncate">Housing Design</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-slate-900/80 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-lg border border-amber-500/20 shadow-md">
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="truncate">Export Inspection</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-slate-900/80 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-lg border border-amber-500/20 shadow-md">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="truncate">Export Solutions</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto"
        >
          {/* Primary Action Button */}
          <Link 
            to="/#contact" 
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-[#4A0404] hover:bg-[#600018] text-white text-sm sm:text-base font-semibold rounded-lg shadow-[0_4px_25px_rgba(74,4,4,0.5)] active:scale-[0.98] transition-all duration-300 border border-red-500/30 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Request Inspection
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary Action Button */}
          <Link 
            to="/#contact" 
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-sm sm:text-base font-semibold rounded-lg border border-amber-400/40 backdrop-blur-md active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg text-center"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Scroll Indicator (Hidden on small mobile screens to keep layout compact) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 flex-col items-center gap-1.5 hidden md:flex"
        >
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.25em]">Scroll</span>
          <motion.div
            className="w-px h-8 sm:h-10 bg-gradient-to-b from-amber-400/60 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}