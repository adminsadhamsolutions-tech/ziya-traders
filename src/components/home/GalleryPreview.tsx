import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { GalleryItem } from '@/types';
import Lightbox from '@/components/Lightbox';
import { Reveal, SectionHeading } from '@/components/Reveal';

export default function GalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true })
        .limit(8);
      if (data) setItems(data as GalleryItem[]);
    })();
  }, []);

  const images = items.map((i) => i.image_url);

  return (
    <section id="gallery" className="section-pad relative bg-ink-50/50">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Project Gallery"
          title="Our Work in Natural Stone"
          subtitle="A glimpse of the granite, marble and quartz projects we've sourced and inspected."
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer glass-card"
              onClick={() => setLightbox({ open: true, index: i })}
            >
              <img
                src={item.image_url}
                alt={item.title || ''}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-white font-medium">{item.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox.open && (
        <Lightbox
          images={images}
          index={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onNavigate={(i) => setLightbox({ open: true, index: i })}
        />
      )}
    </section>
  );
}
