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
  { Icon: Award, title: '20+ Years Experience', desc: "Two decades of deep expertise in India's natural stone industry." },
  { Icon: ClipboardCheck, title: 'Professional Inspection', desc: 'Rigorous quality checks by experienced inspectors on every order.' },
  { Icon: Handshake, title: 'Trusted Manufacturers', desc: 'We work only with verified, reliable Indian stone manufacturers.' },
  { Icon: FileBarChart, title: 'Transparent Reports', desc: 'Detailed inspection reports with full transparency at every stage.' },
  { Icon: Globe2, title: 'Worldwide Export Support', desc: 'Complete export assistance for buyers across the globe.' },
  { Icon: Zap, title: 'Fast Response', desc: 'Quick turnaround on inquiries, inspections and documentation.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad relative overflow-hidden bg-slate-50/90 text-slate-800">
      {/* Soft Light Background Glowing Ambient Auras */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-lux relative z-10">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Trusted by International Buyers Worldwide"
          subtitle="We combine decades of industry expertise with a commitment to quality and transparency."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mt-8">
          {reasons.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              /* Clean White Card with soft shadow & cyan highlight on hover */
              className="relative group p-5 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex gap-4 sm:gap-5 overflow-hidden"
            >
              {/* Subtle card-level light hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Light Cyan Icon Accent Box */}
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300 shadow-sm">
                <Icon className="w-6 h-6 sm:w-7 text-cyan-600 group-hover:text-white transition-colors duration-300" />
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-1.5">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}