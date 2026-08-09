import { motion } from 'framer-motion';
import { Award, Globe2, ClipboardCheck, Users, ShieldCheck, CheckCircle2, Search, Eye } from 'lucide-react';
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

const services = [
{
  icon: Search,
  title: 'Custom Product Sourcing',
  description:
    'Looking for specific products from other suppliers? We identify, negotiate, and source high-grade materials directly from reliable sellers matched to your exact specifications.',
  image: '/room01.png',
  tag: 'Sourcing Support',
},
{
  icon: Eye,
  title: 'Third-Party Product Inspection',
  description:
    'Already buying from another seller? Our expert team conducts independent, onsite quality, dimension, and packaging verification before final shipment.',
  image: '/inspection01.png',
  tag: 'Quality Control',
},
];

export default function About() {
  const { settings } = useSettings();

  return (
    <section id="about" className="section-pad relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-sky-50/40 text-slate-900 py-16 lg:py-24">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-sky-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-lux relative z-10 space-y-16 lg:space-y-24">
        {/* SECTION 1: MAIN ABOUT CONTENT */}
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="The Bridge Between Indian Manufacturers & Overseas Buyers"
          />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-10">
            {/* Left Showcase Image */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Glassmorphic Frame */}
                  <div className="bg-white/80 backdrop-blur-md overflow-hidden rounded-2xl p-2.5 border border-sky-200/80 shadow-2xl shadow-sky-900/10">
                    <div className="overflow-hidden rounded-xl relative group">
                      <img
                        src="https://images.pexels.com/photos/30112372/pexels-photo-30112372.jpeg?auto=compress&cs=tinysrgb&w=1000"
                        alt="Stone manufacturing facility"
                        className="w-full h-72 sm:h-96 lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                    </div>
                  </div>

                  {/* Floating Metric Badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 bg-white/95 p-4 sm:p-5 rounded-2xl border border-sky-200 shadow-xl shadow-sky-900/10 backdrop-blur-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md text-white">
                        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <p className="font-display text-2xl sm:text-3xl text-sky-700 font-extrabold leading-none">
                          20+
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                          Years Industry Expertise
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>

            {/* Right Information & Stats */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 mt-6 lg:mt-0">
              <Reveal delay={0.1}>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-normal text-balance">
                  {settings?.about ||
                    'ZIYA TRADERS specializes in sourcing premium Granite, Marble, and Quartz from trusted Indian manufacturers. We provide end-to-end quality inspection, supplier verification, and export support across global markets.'}
                </p>
              </Reveal>

              {/* Founder Highlight Card */}
<Reveal delay={0.2}>
  <div className="bg-white/80 p-5 sm:p-7 rounded-2xl border border-sky-200/80 shadow-lg shadow-sky-900/5 backdrop-blur-md hover:border-sky-400/50 transition-all">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
      {/* Bigger Founder Profile Avatar Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-lg shrink-0 bg-sky-100">
        <img
          src="/mdimg.jpeg"
          alt="Javith Akthar - Founder"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <p className="font-display text-lg sm:text-xl text-slate-900 font-bold">
            Founder: Javith Akthar
          </p>
          <span className="text-[10px] uppercase tracking-wider font-bold bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded-full">
            Industry Veteran
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          20+ years specializing in Granite Procurement, Factory Audits & Quality Control Inspection.
        </p>
      </div>
    </div>
  </div>
</Reveal>

              {/* Highlight Bullet Points */}
              <Reveal delay={0.25}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
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
                      className="bg-white/70 p-3.5 sm:p-4 rounded-xl text-center border border-sky-200/80 hover:border-sky-400/60 shadow-sm transition-all backdrop-blur-sm"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 mx-auto mb-1.5" />
                      <p className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                        {value}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium leading-tight">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* SECTION 2: SOURCING & INSPECTION SERVICES */}
        <div>
          <SectionHeading
            eyebrow="Extended Services"
            title="Sourcing & Onsite Inspection for Buyers & Sellers"
          />

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-10">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Reveal key={service.title} delay={0.1 * (index + 1)}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/80 backdrop-blur-md overflow-hidden rounded-2xl border border-sky-200/80 hover:border-sky-400/60 transition-all duration-300 shadow-xl shadow-sky-900/5 flex flex-col h-full group"
                  >
                    {/* Visual Banner Header */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-sky-800 text-xs font-semibold px-3 py-1 rounded-full border border-sky-200 shadow-sm">
                        {service.tag}
                      </span>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md text-white">
                          <ServiceIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        {service.description}
                      </p>

                      <div className="mt-5 pt-4 border-t border-sky-100 flex items-center gap-2 text-sky-700 font-semibold text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-sky-600" />
                        <span>Tailored service available upon request</span>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}