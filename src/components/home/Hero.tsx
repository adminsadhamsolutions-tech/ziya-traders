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

  // Use settings URL first; if empty or failed to load, use the fallback image
  const displayImage = (!imageError && settings?.hero_image_url) || FALLBACK_HERO_IMAGE;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image & Editorial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={displayImage}
          alt="Premium natural stone slab background"
          className="w-full h-full object-cover opacity-60 transition-opacity duration-700"
          loading="eager"
          onError={() => setImageError(true)}
        />
        
        {/* Soft Vignette Gradients for Luxury Depth & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
      </div>

      {/* Subtle Ambient Glows aligned with Navbar Theme */}
      <motion.div
        className="absolute top-1/3 right-12 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-12 w-80 h-80 rounded-full bg-[#4A0404]/20 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container-lux px-4 sm:px-6 lg:px-12 text-center pt-20">
        {/* Quality Seal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-xl mb-8 shadow-2xl"
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold tracking-[0.2em] text-amber-200/90 uppercase">
            20+ Years of Excellence
          </span>
        </motion.div>

        {/* Professional Multi-Tone Luxury Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-bold leading-[1.12] max-w-5xl mx-auto flex flex-col gap-3 sm:gap-4 drop-shadow-2xl"
        >
          {/* Line 1: Crisp Platinum White Title */}
          <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100">
            Ziya Traders
          </span>

          {/* Line 2: Metallic Spaced Bronze Tone */}
          <span className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-[0.28em] sm:tracking-[0.35em] uppercase bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent my-1">
            Granite &bull; Marbles &bull; Quartz
          </span>

          {/* Line 3: Warm Champagne Gold Highlight */}
          <span className="text-2xl sm:text-4xl lg:text-5xl font-bold italic text-amber-400 drop-shadow-[0_2px_15px_rgba(251,191,36,0.3)]">
            &amp; Project Work Solutions
          </span>
        </motion.h1>

        {/* High-Impact Paragraph Covering All Key Business Specs */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-base sm:text-xl text-slate-300/95 max-w-4xl mx-auto leading-relaxed font-normal"
        >
          Serving <strong className="text-white font-semibold">international, domestic, and local buyers</strong> with complete solutions for <strong className="text-white font-semibold">all commercial projects</strong> and <strong className="text-white font-semibold">housing design materials</strong>. We provide rigorous <strong className="text-white font-semibold underline decoration-amber-500/50 underline-offset-4">export quality inspection</strong> alongside end-to-end <strong className="text-white font-semibold">export solutions</strong> for India’s finest natural stones.
        </motion.p>

        {/* Highlight Feature Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-amber-200/90 uppercase tracking-wider"
        >
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-lg border border-amber-500/20 shadow-md">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Commercial Projects</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-lg border border-amber-500/20 shadow-md">
            <Home className="w-4 h-4 text-amber-400" />
            <span>Housing Design Materials</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-lg border border-amber-500/20 shadow-md">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>Export Quality Inspection</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-lg border border-amber-500/20 shadow-md">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>End-to-End Export Solutions</span>
          </div>
        </motion.div>

        {/* Balanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary Action Button */}
          <Link 
            to="/#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-[#4A0404] hover:bg-[#600018] text-white font-semibold rounded-lg shadow-[0_4px_25px_rgba(74,4,4,0.5)] hover:shadow-[0_6px_30px_rgba(96,0,24,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-red-500/30 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Request Inspection
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary Action Button */}
          <Link 
            to="/#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-semibold rounded-lg border border-amber-400/40 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
        >
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.25em]">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}