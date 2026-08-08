import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  // Array of tiny star glints and diamond spark dots positioned around the logo
  const tinySparkles = [
    { top: '32%', left: '42%', size: 'w-2.5 h-2.5', delay: 0.8 },
    { top: '35%', right: '38%', size: 'w-3 h-3', delay: 1.2 },
    { top: '42%', right: '32%', size: 'w-2 h-2', delay: 1.6 },
    { bottom: '36%', right: '36%', size: 'w-3.5 h-3.5', delay: 2.0 },
    { bottom: '30%', left: '44%', size: 'w-2.5 h-2.5', delay: 2.4 },
    { bottom: '38%', left: '34%', size: 'w-3 h-3', delay: 2.8 },
    { top: '40%', left: '32%', size: 'w-2 h-2', delay: 3.2 },
    { top: '28%', right: '44%', size: 'w-3 h-3', delay: 3.6 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#3B0202] flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Soft Golden Ambient Radial Aura */}
        <motion.div 
          className="absolute w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-amber-500/20 blur-3xl pointer-events-none"
          animate={{
            scale: [0.5, 1.25, 1],
            opacity: [0.1, 0.7, 0.45],
          }}
          transition={{
            duration: 5,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Outer Golden Diamond Shape Frame */}
        <motion.div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 border-2 border-amber-400/40 rotate-45 pointer-events-none shadow-[0_0_25px_rgba(251,191,36,0.25)]"
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.12, 1], 
            opacity: [0, 0.8, 0.5], 
            rotate: 45,
            borderColor: ['rgba(251,191,36,0.2)', 'rgba(251,191,36,0.7)', 'rgba(251,191,36,0.4)']
          }}
          transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Inner Secondary Diamond Frame accent */}
        <motion.div
          className="absolute w-56 h-56 sm:w-72 sm:h-72 border border-amber-300/20 rotate-45 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.05, 1], opacity: [0, 0.5, 0.25] }}
          transition={{ duration: 5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Micro Golden Diamond Dust Particles */}
        {[
          { top: '38%', left: '36%', delay: 1.1 },
          { top: '30%', right: '40%', delay: 1.7 },
          { bottom: '34%', right: '35%', delay: 2.3 },
          { bottom: '28%', left: '40%', delay: 2.9 },
          { top: '48%', left: '30%', delay: 3.5 },
          { top: '26%', left: '48%', delay: 4.1 },
        ].map((pt, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1.5 h-1.5 bg-amber-300 rotate-45 shadow-[0_0_6px_rgba(251,191,36,0.9)] pointer-events-none"
            style={{ top: pt.top, left: pt.left, right: pt.right, bottom: pt.bottom }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.3, 0],
            }}
            transition={{ duration: 1.6, delay: pt.delay, ease: "easeOut" }}
          />
        ))}

        {/* Sequential Tiny Star Sparkle Glints */}
        {tinySparkles.map((s, idx) => (
          <motion.div
            key={`sparkle-${idx}`}
            className="absolute z-20 pointer-events-none"
            style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.7, 0],
              scale: [0, 1.2, 0.7, 0],
            }}
            transition={{ duration: 1.8, delay: s.delay, ease: "easeOut" }}
          >
            <svg className={`${s.size} text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </motion.div>
        ))}

        {/* Centered Brand Logo */}
        <div className="relative z-10 flex items-center justify-center p-4">
          <motion.img
            src="/logo.png"
            alt="Ziya Traders Logo"
            className="w-44 sm:w-56 h-auto object-contain"
            initial={{ scale: 0.1, opacity: 0, filter: 'brightness(2.2) contrast(1.5)' }}
            animate={{ 
              scale: [0.1, 1.15, 1], 
              opacity: [0, 1, 1],
              filter: [
                'brightness(2.5) contrast(1.8) drop-shadow(0 0 45px rgba(251,191,36,0.95))',
                'brightness(1.3) contrast(1.2) drop-shadow(0 0 30px rgba(251,191,36,0.8))',
                'brightness(1) contrast(1) drop-shadow(0 0 22px rgba(251,191,36,0.65))'
              ]
            }}
            transition={{
              duration: 5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}