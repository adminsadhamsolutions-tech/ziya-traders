import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, Loader2, Images, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadImage, deleteImage } from '@/lib/upload';
import type { GalleryItem } from '@/types';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [titles, setTitles] = useState<string[]>([]);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('gallery').select('*').order('sort_order', { ascending: true });
    setItems((data as GalleryItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setTitles(files.map(() => ''));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    const baseOrder = items.length;
    const records = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const url = await uploadImage(selectedFiles[i], 'gallery');
      if (url) records.push({ image_url: url, title: titles[i] || null, sort_order: baseOrder + i });
    }
    if (records.length > 0) await supabase.from('gallery').insert(records);
    setSelectedFiles([]); setTitles([]); setUploading(false); await load();
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('Delete this gallery image?')) return;
    await deleteImage(item.image_url);
    await supabase.from('gallery').delete().eq('id', item.id);
    await load();
  };

  const move = async (item: GalleryItem, direction: 'up' | 'down') => {
    const idx = items.findIndex((i) => i.id === item.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const swapItem = items[swapIdx];
    await Promise.all([
      supabase.from('gallery').update({ sort_order: swapItem.sort_order }).eq('id', item.id),
      supabase.from('gallery').update({ sort_order: item.sort_order }).eq('id', swapItem.id),
    ]);
    await load();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader title="Gallery" description="Upload and arrange project gallery images" />

      <div className="glass-card p-5 sm:p-6 rounded-2xl mb-6 sm:mb-8">
        <label className="block border-2 border-dashed border-ink-200 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-gold-400 transition mb-4">
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
          <Upload className="w-8 h-8 text-ink-400 mx-auto mb-2" />
          <p className="text-sm text-ink-500">Click to select images (multiple allowed)</p>
        </label>
        {selectedFiles.length > 0 && (
          <div className="space-y-3">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-ink-50 border border-ink-200">
                <img src={URL.createObjectURL(file)} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <input type="text" value={titles[idx]} onChange={(e) => { const n = [...titles]; n[idx] = e.target.value; setTitles(n); }} className="input-lux flex-1" placeholder="Image title (optional)" />
                <span className="text-xs text-ink-400 shrink-0 hidden sm:inline">{(file.size / 1024).toFixed(0)} KB</span>
              </div>
            ))}
            <button onClick={handleUpload} disabled={uploading} className="btn-crimson w-full disabled:opacity-60">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload {selectedFiles.length} Image{selectedFiles.length > 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">{[...Array(8)].map((_, i) => <div key={i} className="h-40 sm:h-48 glass-card rounded-xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 sm:py-20"><Images className="w-12 h-12 text-ink-300 mx-auto mb-4" /><p className="text-ink-400">No gallery images yet.</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-xl overflow-hidden group relative">
              <img src={item.image_url} alt={item.title || ''} className="w-full h-40 sm:h-48 object-cover" />
              {item.title && <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-ink-950/80 to-transparent"><p className="text-xs text-white truncate">{item.title}</p></div>}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => move(item, 'up')} disabled={i === 0} className="w-8 h-8 rounded-lg glass-card-gold flex items-center justify-center text-gold-700 hover:bg-gold-100 disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                <button onClick={() => move(item, 'down')} disabled={i === items.length - 1} className="w-8 h-8 rounded-lg glass-card-gold flex items-center justify-center text-gold-700 hover:bg-gold-100 disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item)} className="w-8 h-8 rounded-lg bg-crimson-50 border border-crimson-200 flex items-center justify-center text-crimson-700 hover:bg-crimson-100"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
