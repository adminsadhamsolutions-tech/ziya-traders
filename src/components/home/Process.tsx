import { motion } from 'framer-motion';
import {
  ClipboardList,
  Search,
  Factory,
  ClipboardCheck,
  Activity,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '@/components/Reveal';

const steps = [
  {
    Icon: ClipboardList,
    title: 'Receive Buyer Requirement',
    desc: 'We analyze your exact stone specifications—granite slab dimensions, gangsaw sizes, surface finishes (polished, flamed, honed), and color shades.',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop',
    alt: 'Granite and marble specifications catalog',
  },
  {
    Icon: Search,
    title: 'Quarry & Manufacturer Sourcing',
    desc: 'We locate top Indian granite quarries and processing yards matching your required stone shade (e.g., Black Galaxy, Absolute Black, Tan Brown).',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop',
    alt: 'Granite quarry blocks sourcing',
  },
  {
    Icon: Factory,
    title: 'Factory & Machinery Audit',
    desc: 'Our inspector visits the processing plant to verify gangsaw cutter precision, resin treatment lines, and automated multi-head polishing machines.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    alt: 'Granite gangsaw factory processing',
  },
  {
    Icon: ClipboardCheck,
    title: 'Slab Quality & Thickness Inspection',
    desc: 'Every granite slab is inspected with digital calipers and gloss meters for exact thickness (20mm/30mm), gloss levels, micro-fissures, and shade uniformity.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    alt: 'Polished granite slab surface inspection',
  },
  {
    Icon: Activity,
    title: 'Production & Dressing Monitoring',
    desc: 'We monitor edge-dressing, epoxy filling, net backing, and final buffing to ensure zero manufacturing flaws prior to packaging.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    alt: 'Granite slab polishing and net backing',
  },
  {
    Icon: Truck,
    title: 'Wooden Crate & Container Stuffing',
    desc: 'We oversee loading into heavy-duty fumigated ISPM-15 wooden A-frame crates and supervise container lashing for safe sea transit.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    alt: 'Granite container stuffing and wooden crate packing',
  },
  {
    Icon: CheckCircle2,
    title: 'Inspection Report & Port Release',
    desc: 'High-definition inspection photos, gloss test readings, weight certificates, and port shipping documents are dispatched for final client approval.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    alt: 'Granite shipment documentation and signoff',
  },
];

export default function Process() {
  return (
    <section id="process" className="section-pad relative bg-slate-50 text-slate-800 overflow-hidden py-20">
      {/* Background Lighting Accents */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container-lux relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Workflow"
          title="Granite Sourcing to Export in 7 Steps"
          subtitle="A transparent, quality-first process engineered to give international stone buyers total peace of mind."
        />

        <div className="relative mt-12 lg:mt-20">
          {/* Center Vertical Timeline Line (Desktop) */}
          <div className="absolute left-1/2 top-4 bottom-12 w-0.5 bg-slate-200 -translate-x-1/2 hidden lg:block" />

          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
                >
                  {/* Content Box */}
                  <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'}`}>
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                          <step.Icon className="w-5 h-5" />
                        </div>
                        <span className="font-display text-2xl font-bold text-amber-600">
                          Step {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot Indicator (Desktop) */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-10">
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-amber-500 shadow-md flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-500" />
                    </div>
                  </div>

                  {/* Image Card Box */}
                  <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-white p-2 group hover:shadow-md transition-shadow">
                      <div className="overflow-hidden rounded-2xl h-56 sm:h-64 relative">
                        <img
                          src={step.image}
                          alt={step.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:opacity-0 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}