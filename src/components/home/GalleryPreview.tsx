import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardHat, Image as ImageIcon, X, Maximize2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Reveal, SectionHeading } from '@/components/Reveal';
import type { GalleryItem } from '@/types';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'sitework' | 'gallery'>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true });
      setItems((data as GalleryItem[]) || []);
      setLoading(false);
    };
    fetchGallery();
  }, []);

  const filteredItems = items.filter((item: any) => {
    const category = item.category || 'gallery';
    if (activeTab === 'sitework') return category === 'sitework';
    if (activeTab === 'gallery') return category === 'gallery';
    return true;
  });

  return (
    <section id="gallery" className="section-pad relative overflow-hidden bg-slate-50/90 text-slate-800 py-16 lg:py-24 font-sans">
      {/* Light Background Glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-lux relative z-10">
        <SectionHeading
          eyebrow="Portfolio & Onsite Work"
          title="Product Gallery & Factory Inspection Work"
        />

        {/* Filter Navigation Tabs - Numbers Removed */}
        <div className="flex items-center justify-center gap-3 mt-8 mb-12 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:border-cyan-400 hover:text-cyan-600'
            }`}
          >
            All Work
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sitework')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
              activeTab === 'sitework'
                ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:border-cyan-400 hover:text-cyan-600'
            }`}
          >
            <HardHat className="w-4 h-4" /> Site Work Photos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
              activeTab === 'gallery'
                ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:border-cyan-400 hover:text-cyan-600'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Stone Gallery
          </button>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-56 bg-slate-200/60 rounded-2xl animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No images available under this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item: any, idx: number) => (
              <Reveal key={item.id} delay={0.05 * (idx % 8)}>
                <motion.div
                  whileHover={{ y: -6 }}
                  onClick={() => setLightboxImage(item)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 shadow-sm group cursor-pointer relative h-56 sm:h-64 flex flex-col justify-end"
                >
                  <img
                    src={item.image_url}
                    alt="Gallery showcase"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Clean Expand Icon Only (Work Title Removed) */}
                  <div className="relative z-10 p-4 flex items-center justify-end w-full">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform shrink-0">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/80 border border-slate-700 flex items-center justify-center text-slate-200 hover:text-cyan-400 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-hidden flex-1 flex items-center justify-center p-2">
                <img
                  src={lightboxImage.image_url}
                  alt="Enlarged Preview"
                  className="max-h-[80vh] w-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}