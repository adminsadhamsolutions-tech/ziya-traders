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
    <section id="services" className="section-pad relative bg-ink-50/50">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Our Services"
          title="Professional Stone Sourcing & Inspection"
          subtitle="From factory audits to container loading supervision, we provide end-to-end support for international stone buyers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card p-5 sm:p-6 group hover:border-gold-400 hover:shadow-card-hover cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-300/50 flex items-center justify-center mb-4 group-hover:bg-gold-gradient group-hover:border-transparent transition-all duration-300">
                <Icon className="w-6 h-6 text-gold-600 group-hover:text-ink-900 transition-colors duration-300" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-ink-900 mb-2">{title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
