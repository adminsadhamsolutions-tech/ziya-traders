import { motion } from 'framer-motion';
import {
  Factory,
  ClipboardCheck,
  BadgeCheck,
  PackageSearch,
  Activity,
  Truck,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/Reveal';

const services = [
  { Icon: Factory, title: 'Factory Inspection', desc: 'Comprehensive on-site factory audits to verify production capabilities and standards.' },
  { Icon: ClipboardCheck, title: 'Quality Inspection', desc: 'Detailed quality checks on every slab to ensure it meets international specifications.' },
  { Icon: BadgeCheck, title: 'Supplier Verification', desc: 'Thorough verification of manufacturers to confirm reliability and authenticity.' },
  { Icon: PackageSearch, title: 'Granite Procurement', desc: 'Strategic sourcing of premium granite, marble and quartz from trusted Indian quarries.' },
  { Icon: Activity, title: 'Production Monitoring', desc: 'Continuous oversight during production to maintain consistent quality output.' },
  { Icon: Truck, title: 'Container Loading', desc: 'On-site supervision of container loading to ensure safe and correct shipment.' },
  { Icon: FileText, title: 'Export Documentation', desc: 'Complete assistance with all export paperwork and compliance documentation.' },
  { Icon: Lightbulb, title: 'Project Consultation', desc: 'Expert guidance for large-scale stone projects from selection to delivery.' },
];

export default function Services() {
  return (
    <section id="services" className="section-pad relative overflow-hidden bg-slate-50/90 text-slate-800">
      {/* Soft Light Background Glowing Ambient Auras */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-lux relative z-10">
        <SectionHeading
          eyebrow="Our Services"
          title="Professional Stone Sourcing & Inspection"
          subtitle="From factory audits to container loading supervision, we provide end-to-end support for international stone buyers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-8">
          {services.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              whileHover={{ y: -8 }}
              /* Clean White Card with soft shadow & cyan highlight on hover */
              className="relative group p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Subtle card-level light hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Light Cyan Icon Accent Box */}
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300 shadow-sm">
                <Icon className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors duration-300" />
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}