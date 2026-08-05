import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 rounded-full border-2 border-gold-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="w-20 h-20 rounded-full border-t-2 border-gold-500 absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl text-gold-gradient font-bold">Z</span>
          </div>
        </div>
        <motion.p
          className="mt-6 font-display text-base sm:text-lg tracking-[0.25em] text-gold-700 uppercase font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Ziya Traders
        </motion.p>
        <div className="mt-3 w-40 h-px bg-ink-200 overflow-hidden">
          <motion.div
            className="h-full bg-gold-gradient"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
