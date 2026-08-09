import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-10 lg:mb-12`}>
      {eyebrow && (
        <Reveal>
          <div className={`${center ? 'justify-center' : ''} flex items-center gap-3 mb-3`}>
            <span className="w-6 h-px bg-cyan-500 sm:w-8" />
            <span className="eyebrow text-cyan-600 font-semibold tracking-wider text-xs uppercase">{eyebrow}</span>
            {center && <span className="w-6 h-px bg-cyan-500 sm:w-8" />}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-3 text-slate-600 leading-relaxed text-base sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}