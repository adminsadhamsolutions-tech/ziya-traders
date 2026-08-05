import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/Reveal';

const categories = [
  {
    name: 'Granite',
    slug: 'granite',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1000&auto=format&fit=crop',
    desc: 'Durable, high-gloss natural granite for monuments, countertops, and architectural projects.',
  },
  {
    name: 'Marble',
    slug: 'marble',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    desc: 'Timeless Italian & Indian marble with striking veining for luxury interiors and flooring.',
  },
  {
    name: 'Quartz',
    slug: 'quartz',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
    desc: 'Engineered quartz surfaces combining non-porous beauty with exceptional scratch resistance.',
  },
];

export default function ProductsPreview() {
  return (
    <section id="products" className="section-pad relative bg-slate-50 text-slate-800 py-16 sm:py-24 overflow-hidden">
      {/* Light Ambient Lighting Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container-lux relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Products"
          title="Premium Stone Collections"
          subtitle="Explore our curated selection of granite, marble, and quartz sourced from India's finest manufacturers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={`/products?category=${cat.slug}`}
                className="group relative block overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-500 h-80 sm:h-96 lg:h-[460px]"
              >
                {/* Product Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Light-friendly Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1">
                      <Sparkles className="w-3 h-3" /> Sourcing Collection
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <span className="text-xs sm:text-sm font-semibold text-amber-300 group-hover:text-amber-200 transition-colors">
                      Explore {cat.name}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Top Corner Floating Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="w-4 h-4 text-amber-600 -rotate-45" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}