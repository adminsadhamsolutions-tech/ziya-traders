import { motion } from 'framer-motion';
import {
  Award,
  ClipboardCheck,
  Handshake,
  FileBarChart,
  Globe2,
  Zap,
} from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/Reveal';

const reasons = [
  { Icon: Award, title: '20+ Years Experience', desc: 'Two decades of deep expertise in India\'s natural stone industry.' },
  { Icon: ClipboardCheck, title: 'Professional Inspection', desc: 'Rigorous quality checks by experienced inspectors on every order.' },
  { Icon: Handshake, title: 'Trusted Manufacturers', desc: 'We work only with verified, reliable Indian stone manufacturers.' },
  { Icon: FileBarChart, title: 'Transparent Reports', desc: 'Detailed inspection reports with full transparency at every stage.' },
  { Icon: Globe2, title: 'Worldwide Export Support', desc: 'Complete export assistance for buyers across the globe.' },
  { Icon: Zap, title: 'Fast Response', desc: 'Quick turnaround on inquiries, inspections and documentation.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad relative overflow-hidden bg-ink-50/50">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-crimson-700/5 rounded-full blur-3xl" />
      <div className="container-lux relative">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Trusted by International Buyers Worldwide"
          subtitle="We combine decades of industry expertise with a commitment to quality and transparency."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {reasons.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass-card p-5 sm:p-7 flex gap-4 sm:gap-5 group hover:border-gold-400 hover:shadow-card-hover transition-all"
            >
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold-50 border border-gold-300/50 flex items-center justify-center group-hover:bg-gold-gradient group-hover:border-transparent transition-all duration-300">
                <Icon className="w-6 h-6 sm:w-7 text-gold-600 group-hover:text-ink-900 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-ink-900 mb-1.5">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
