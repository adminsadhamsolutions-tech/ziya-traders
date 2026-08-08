import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, Loader2, Images, ArrowUp, ArrowDown, Eye, X, Edit2, Check, HardHat, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadImage, deleteImage } from '@/lib/upload';
import type { GalleryItem } from '@/types';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [category, setCategory] = useState<'sitework' | 'gallery'>('sitework');
  const [activeTab, setActiveTab] = useState<'sitework' | 'gallery'>('sitework');
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true });
    setItems((data as GalleryItem[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setTitles(files.map(() => ''));
  };

  const handleRemoveSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setTitles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    const filteredCurrentItems = items.filter((item: any) => (item.category || 'gallery') === category);
    const baseOrder = filteredCurrentItems.length;
    const records = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const folderName = category === 'sitework' ? 'site-work' : 'gallery';
      const url = await uploadImage(selectedFiles[i], folderName);
      if (url) {
        records.push({
          image_url: url,
          title: titles[i] || null,
          category: category,
          sort_order: baseOrder + i,
        });
      }
    }

    if (records.length > 0) {
      await supabase.from('gallery').insert(records);
    }

    setSelectedFiles([]);
    setTitles([]);
    setUploading(false);
    await load();
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('Delete this image?')) return;
    await deleteImage(item.image_url);
    await supabase.from('gallery').delete().eq('id', item.id);
    await load();
  };

  const handleSaveTitle = async (id: string) => {
    await supabase.from('gallery').update({ title: editingTitle || null }).eq('id', id);
    setEditingId(null);
    setEditingTitle('');
    await load();
  };

  const move = async (item: GalleryItem, direction: 'up' | 'down') => {
    const tabItems = filteredItems;
    const idx = tabItems.findIndex((i) => i.id === item.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= tabItems.length) return;
    const swapItem = tabItems[swapIdx];

    await Promise.all([
      supabase.from('gallery').update({ sort_order: swapItem.sort_order }).eq('id', item.id),
      supabase.from('gallery').update({ sort_order: item.sort_order }).eq('id', swapItem.id),
    ]);
    await load();
  };

  const filteredItems = items.filter((item: any) => {
    const itemCat = item.category || 'gallery';
    return itemCat === activeTab;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8">
      <AdminPageHeader
        title="Site Work & Gallery Uploads"
        description="Upload, categorize, and reorder site photos and general gallery images"
      />

      {/* UPLOAD FORM PANEL */}
      <div className="glass-card p-5 sm:p-8 rounded-2xl border border-gold-500/20 bg-ink-900/60 backdrop-blur-md shadow-xl">
        <h2 className="text-lg font-display font-semibold text-white mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-gold-400" /> Upload Images
        </h2>

        {/* Category Selector */}
        <div className="flex items-center gap-3 mb-6 p-1.5 bg-ink-950/80 rounded-xl border border-gold-500/20 max-w-md">
          <button
            type="button"
            onClick={() => setCategory('sitework')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              category === 'sitework'
                ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 shadow-md'
                : 'text-ink-300 hover:text-white'
            }`}
          >
            <HardHat className="w-4 h-4" /> Site Work
          </button>
          <button
            type="button"
            onClick={() => setCategory('gallery')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              category === 'gallery'
                ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 shadow-md'
                : 'text-ink-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Gallery Showcase
          </button>
        </div>

        {/* Dropzone Container */}
        <label className="block border-2 border-dashed border-gold-500/30 hover:border-gold-400 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all bg-ink-950/40 hover:bg-ink-950/70 group">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7 text-gold-400" />
          </div>
          <p className="text-base text-white font-medium">Click or drag images to upload</p>
          <p className="text-xs text-ink-400 mt-1">
            Uploading to: <span className="text-gold-400 font-semibold">{category === 'sitework' ? 'Site Work' : 'Gallery Showcase'}</span>
          </p>
        </label>

        {/* Staging List */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-gold-400">Selected Files ({selectedFiles.length})</p>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl bg-ink-950 border border-gold-500/20"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-gold-500/30"
                  />
                  <input
                    type="text"
                    value={titles[idx] || ''}
                    onChange={(e) => {
                      const n = [...titles];
                      n[idx] = e.target.value;
                      setTitles(n);
                    }}
                    className="input-lux flex-1 bg-ink-900 border-gold-500/20 text-white placeholder-ink-400 focus:border-gold-400"
                    placeholder="Image description / title (optional)"
                  />
                  <span className="text-xs text-ink-400 shrink-0 hidden sm:inline">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSelectedFile(idx)}
                    className="p-2 text-ink-400 hover:text-crimson-400 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="btn-gold w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold shadow-lg disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Uploading Images...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" /> Confirm & Upload {selectedFiles.length} Image
                  {selectedFiles.length > 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ADMIN PREVIEW TAB BAR */}
      <div>
        <div className="flex items-center gap-3 border-b border-gold-500/20 pb-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('sitework')}
            className={`pb-3 text-sm sm:text-base font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'sitework'
                ? 'border-gold-400 text-gold-400'
                : 'border-transparent text-ink-400 hover:text-white'
            }`}
          >
            <HardHat className="w-4 h-4" /> Site Work ({items.filter((i: any) => (i.category || 'gallery') === 'sitework').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 text-sm sm:text-base font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'border-gold-400 text-gold-400'
                : 'border-transparent text-ink-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Gallery Showcase ({items.filter((i: any) => (i.category || 'gallery') !== 'sitework').length})
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 sm:h-56 bg-ink-900/60 rounded-xl animate-pulse border border-gold-500/10" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-ink-900/40 rounded-2xl border border-gold-500/10">
            <Images className="w-12 h-12 text-ink-500 mx-auto mb-3" />
            <p className="text-ink-300 font-medium">No images uploaded under this section yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-ink-900/80 rounded-2xl overflow-hidden border border-gold-500/20 group relative shadow-lg flex flex-col justify-between"
              >
                <div className="relative h-44 sm:h-52 overflow-hidden bg-ink-950">
                  <img
                    src={item.image_url}
                    alt={item.title || 'Gallery item'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-2 right-2 flex gap-1 bg-ink-950/80 backdrop-blur-md p-1 rounded-xl border border-gold-500/30">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(item)}
                      title="Preview Image"
                      className="p-1.5 rounded-lg text-gold-400 hover:bg-gold-500/20 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(item, 'up')}
                      disabled={i === 0}
                      title="Move Up"
                      className="p-1.5 rounded-lg text-gold-400 hover:bg-gold-500/20 disabled:opacity-30 transition"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(item, 'down')}
                      disabled={i === filteredItems.length - 1}
                      title="Move Down"
                      className="p-1.5 rounded-lg text-gold-400 hover:bg-gold-500/20 disabled:opacity-30 transition"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      title="Delete Image"
                      className="p-1.5 rounded-lg text-crimson-400 hover:bg-crimson-500/20 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-ink-950/80 border-t border-gold-500/10">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="input-lux text-xs py-1 px-2 flex-1 bg-ink-900 border-gold-400 text-white"
                        placeholder="Set title..."
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveTitle(item.id)}
                        className="p-1.5 rounded-lg bg-gold-500 text-ink-950 hover:bg-gold-400"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-ink-200 truncate font-medium">
                        {item.title || <span className="italic text-ink-500">Untitled image</span>}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(item.id);
                          setEditingTitle(item.title || '');
                        }}
                        className="p-1 text-ink-400 hover:text-gold-400 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] bg-ink-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-ink-950/80 border border-gold-500/30 flex items-center justify-center text-white hover:text-gold-400 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-hidden flex-1 flex items-center justify-center p-2">
                <img
                  src={previewImage.image_url}
                  alt={previewImage.title || 'Preview'}
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                />
              </div>

              {previewImage.title && (
                <div className="p-4 bg-ink-950 border-t border-gold-500/20 text-center">
                  <p className="text-sm font-medium text-gold-400">{previewImage.title}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}