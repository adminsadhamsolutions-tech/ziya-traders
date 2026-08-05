import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export default function Hero() {
  const { settings } = useSettings();
  const heroImg = settings.hero_image_url || undefined;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {heroImg ? (
          <img
            src={heroImg}
            alt="Premium stone"
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-soft-radial" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent" />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-gold-400/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full bg-crimson-700/8 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container-lux px-4 sm:px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-gold mb-5"
        >
          <ShieldCheck className="w-4 h-4 text-gold-600" />
          <span className="text-xs font-bold tracking-wider text-gold-700 uppercase">
            20+ Years of Excellence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="heading-display text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-ink-900 max-w-4xl mx-auto text-balance"
        >
          Premium Granite Inspection &amp;{' '}
          <span className="text-gold-gradient italic">Export Solutions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-5 text-base sm:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed"
        >
          Helping international buyers source high-quality natural stones from India's trusted
          manufacturers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/#contact" className="btn-crimson w-full sm:w-auto group">
            Request Inspection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/#contact" className="btn-outline-gold w-full sm:w-auto">
            Contact Us
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
        >
          <span className="text-xs text-ink-400 uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-gold-500 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
