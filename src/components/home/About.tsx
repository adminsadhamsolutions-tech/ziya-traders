import { motion } from 'framer-motion';
import { Award, Globe2, ClipboardCheck, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { Reveal, SectionHeading } from '@/components/Reveal';

const stats = [
  { Icon: Award, value: '20+', label: 'Years Experience' },
  { Icon: Globe2, value: '15+', label: 'Global Market Countries' },
  { Icon: ClipboardCheck, value: '500+', label: 'Inspections Done' },
  { Icon: Users, value: '50+', label: 'Trusted Suppliers' },
];

const highlights = [
  'Factory Audits & Production Monitoring',
  'Strict Pre-Shipment Quality Inspections',
  'Transparent Sourcing & Supplier Verification',
];

export default function About() {
  const { settings } = useSettings();

  return (
    <section id="about" className="section-pad relative overflow-hidden bg-ink-50/50">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-lux relative z-10">
        <SectionHeading
          eyebrow="About Us"
          title="The Bridge Between Indian Manufacturers & Overseas Buyers"
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image Frame */}
                <div className="glass-card overflow-hidden rounded-2xl p-2 shadow-xl">
                  <div className="overflow-hidden rounded-xl relative group">
                    <img
                      src="https://images.pexels.com/photos/30112372/pexels-photo-30112372.jpeg?auto=compress&cs=tinysrgb&w=1000"
                      alt="Stone manufacturing facility"
                      className="w-full h-72 sm:h-96 lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <motion.div
                  className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 glass-card-gold p-4 sm:p-5 rounded-2xl shadow-gold-md border border-gold-400/30 backdrop-blur-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold-gradient flex items-center justify-center shrink-0 shadow-gold-sm">
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-ink-900" />
                    </div>
                    <div>
                      <p className="font-display text-2xl sm:text-3xl text-gold-gradient font-bold leading-none">20+</p>
                      <p className="text-xs sm:text-sm text-ink-700 font-medium mt-1">Years Industry Expertise</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Information & Stats */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 mt-6 lg:mt-0">
            {/* About Text */}
            <Reveal delay={0.1}>
              <p className="text-ink-700 leading-relaxed text-base sm:text-lg text-balance">
                {settings?.about ||
                  'ZIYA TRADERS specializes in sourcing premium Granite, Marble, and Quartz from trusted Indian manufacturers. We provide end-to-end quality inspection, supplier verification, and export support across global markets.'}
              </p>
            </Reveal>

            {/* Founder Highlight Card */}
            <Reveal delay={0.2}>
              <div className="glass-card-gold p-4 sm:p-5 rounded-2xl border border-gold-400/20 shadow-sm transition-all hover:shadow-gold-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 shadow-gold-sm">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-ink-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-base sm:text-lg text-ink-900 font-bold">Founder: Javith Akthar</p>
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-gold-400/20 text-gold-700 px-2 py-0.5 rounded-full">
                        Industry Veteran
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-ink-600 mt-1 leading-normal">
                      20+ years specializing in Granite Procurement, Factory Audits & Quality Control Inspection.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Feature Checklist */}
            <Reveal delay={0.25}>
              <div className="grid sm:grid-cols-3 gap-3">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Stats Grid */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {stats.map(({ Icon, value, label }) => (
                  <div
                    key={label}
                    className="glass-card p-3 sm:p-4 rounded-xl text-center border border-ink-100 hover:border-gold-400/40 transition-colors"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500 mx-auto mb-1.5" />
                    <p className="font-display text-lg sm:text-2xl font-bold text-ink-900">{value}</p>
                    <p className="text-[11px] sm:text-xs text-ink-500 mt-0.5 font-medium leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}