import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const next = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);
  const prev = useCallback(() => onNavigate((index - 1 + images.length) % images.length), [index, images.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-cyan-400 hover:border-cyan-500/60 hover:bg-slate-800 transition z-10 shadow-lg"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          className="absolute left-3 sm:left-8 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-cyan-400 hover:border-cyan-500/60 hover:bg-slate-800 transition z-10 shadow-lg"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Active Image */}
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          className="max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] object-contain rounded-xl shadow-2xl border border-slate-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next Button */}
        <button
          className="absolute right-3 sm:right-8 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-cyan-400 hover:border-cyan-500/60 hover:bg-slate-800 transition z-10 shadow-lg"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Counter Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest text-slate-300 bg-slate-900/80 border border-slate-700/80 px-4 py-1.5 rounded-full shadow-lg">
          <span className="text-cyan-400">{index + 1}</span> / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}