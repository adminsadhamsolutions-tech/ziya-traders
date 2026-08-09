import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Images } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Category, Product } from '@/types';
import Lightbox from '@/components/Lightbox';
import { Reveal } from '@/components/Reveal';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get('category') || 'all';
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ open: boolean; images: string[]; index: number }>({
    open: false, images: [], index: 0,
  });

  useEffect(() => {
    (async () => {
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
        supabase.from('products').select('*, category:categories(*), product_images(*)').eq('status', 'active').order('sort_order', { ascending: true }),
      ]);
      setCategories((cats as Category[]) || []);
      setProducts((prods as Product[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = activeSlug === 'all' ? products : products.filter((p) => p.category?.slug === activeSlug);
  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const openLightbox = (images: string[], index: number) => setLightbox({ open: true, images, index });

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 min-h-screen relative bg-slate-50/90 text-slate-800 overflow-hidden">
      {/* Light Ambient Background Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-lux px-4 sm:px-6 lg:px-12 relative z-10">
        <Reveal>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-5 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-cyan-500 sm:w-8" />
            <span className="eyebrow text-cyan-600 font-semibold tracking-wider text-xs uppercase">Our Products</span>
          </div>
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            {activeCategory ? activeCategory.name : 'All Stone Collections'}
          </h1>
          <p className="text-slate-600 max-w-2xl mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            Browse our premium selection of {activeCategory ? activeCategory.name.toLowerCase() : 'natural stone'} sourced from India's finest manufacturers. Click any image to view in full detail.
          </p>
        </Reveal>

        {/* Filter Buttons */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeSlug === 'all'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-white/80 border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-400'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeSlug === cat.slug
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-white/80 border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/60 border border-slate-200 rounded-2xl h-72 sm:h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white/60 rounded-3xl border border-slate-200">
            <Images className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No products in this category yet. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((product, i) => {
              const images = (product.product_images || []).sort((a, b) => a.sort_order - b.sort_order);
              const cover = images[0]?.image_url;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  <div
                    className="relative h-56 sm:h-64 overflow-hidden cursor-pointer"
                    onClick={() => images.length > 0 && openLightbox(images.map((img) => img.image_url), 0)}
                  >
                    {cover ? (
                      <img src={cover} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <Images className="w-10 h-10 text-slate-300" />
                      </div>
                    )}
                    {images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm">
                        {images.length} photos
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-cyan-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm">
                      {product.category?.name}
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-3">{product.name}</h3>
                    {images.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
                        {images.slice(0, 5).map((img, idx) => (
                          <button
                            key={img.id}
                            onClick={() => openLightbox(images.map((im) => im.image_url), idx)}
                            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-slate-200 hover:border-cyan-500 transition-all shadow-sm"
                          >
                            <img src={img.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {lightbox.open && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox({ open: false, images: [], index: 0 })}
          onNavigate={(i) => setLightbox((prev) => ({ ...prev, index: i }))}
        />
      )}
    </div>
  );
}