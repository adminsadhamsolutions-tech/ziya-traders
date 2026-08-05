import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload, Images, Loader2, Star, Clipboard } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadImage, deleteImage } from '@/lib/upload';
import type { Category, Product, ProductImage } from '@/types';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

type ProductWithRelations = Product & { category?: Category; product_images?: ProductImage[] };

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ProductWithRelations | null>(null);
  const [form, setForm] = useState({ name: '', category_id: '', status: 'active' });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const load = async () => {
    setLoading(true);
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from('products').select('*, category:categories(*), product_images(*)').order('sort_order', { ascending: true }),
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    ]);
    setProducts((prods as ProductWithRelations[]) || []);
    setCategories((cats as Category[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Helper to add files avoiding duplicates
  const addFiles = (files: File[]) => {
    const validImageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (validImageFiles.length > 0) {
      setNewImages((prev) => [...prev, ...validImageFiles]);
    }
  };

  // Clipboard Paste Event Handler
  const handlePaste = useCallback((e: ClipboardEvent) => {
    if (!showModal) return;
    const items = e.clipboardData?.items;
    if (!items) return;

    const pastedFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) pastedFiles.push(file);
      }
    }
    if (pastedFiles.length > 0) {
      addFiles(pastedFiles);
    }
  }, [showModal]);

  // Attach window paste listener when modal is open
  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const openCreate = () => { 
    setEditing(null); 
    setForm({ name: '', category_id: categories[0]?.id || '', status: 'active' }); 
    setNewImages([]); 
    setExistingImages([]); 
    setShowModal(true); 
  };

  const openEdit = (product: ProductWithRelations) => { 
    setEditing(product); 
    setForm({ name: product.name, category_id: product.category_id, status: product.status }); 
    setNewImages([]); 
    setExistingImages(product.product_images || []); 
    setShowModal(true); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const removeNewImage = (idx: number) => setNewImages((prev) => prev.filter((_, i) => i !== idx));

  const removeExistingImage = async (img: ProductImage) => {
    await deleteImage(img.image_url);
    await supabase.from('product_images').delete().eq('id', img.id);
    setExistingImages((prev) => prev.filter((i) => i.id !== img.id));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category_id) return;
    setSaving(true);
    try {
      let productId = editing?.id;
      if (editing) { 
        await supabase.from('products').update({ name: form.name, category_id: form.category_id, status: form.status }).eq('id', editing.id); 
      } else { 
        const { data } = await supabase.from('products').insert({ name: form.name, category_id: form.category_id, status: form.status }).select().single(); 
        productId = data?.id; 
      }

      if (productId && newImages.length > 0) {
        const imageRecords = [];
        for (let i = 0; i < newImages.length; i++) { 
          const url = await uploadImage(newImages[i], `products/${productId}`); 
          if (url) imageRecords.push({ product_id: productId, image_url: url, sort_order: existingImages.length + i }); 
        }
        if (imageRecords.length > 0) await supabase.from('product_images').insert(imageRecords);
      }
      setShowModal(false); 
      await load();
    } finally { 
      setSaving(false); 
    }
  };

  const handleDelete = async (product: ProductWithRelations) => {
    if (!confirm(`Delete "${product.name}" and all its images?`)) return;
    for (const img of product.product_images || []) await deleteImage(img.image_url);
    await supabase.from('products').delete().eq('id', product.id);
    await load();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader 
        title="Products" 
        description="Manage your stone product catalog"
        action={<button onClick={openCreate} className="btn-crimson text-sm"><Plus className="w-4 h-4" /> Add Product</button>}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="h-64 glass-card rounded-2xl animate-pulse" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <Images className="w-12 h-12 text-ink-300 mx-auto mb-4" />
          <p className="text-ink-400">No products yet. Click "Add Product" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {products.map((product) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl overflow-hidden">
              <div className="relative h-44 sm:h-48 bg-ink-100">
                {product.product_images?.[0] ? (
                  <img src={product.product_images[0].image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full"><Images className="w-10 h-10 text-ink-300" /></div>
                )}
                <div className="absolute top-3 left-3 glass-card-gold px-3 py-1 rounded-full text-xs text-gold-700 font-medium">
                  {product.category?.name || 'Uncategorized'}
                </div>
                <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-500'}`}>
                  {product.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-base sm:text-lg font-bold text-ink-900 mb-1">{product.name}</h3>
                <p className="text-xs text-ink-400 mb-3">{product.product_images?.length || 0} images</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(product)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg glass-card-gold text-gold-700 hover:bg-gold-100 transition text-sm font-medium">
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handleDelete(product)} className="px-3 py-2 rounded-lg bg-crimson-50 border border-crimson-200 text-crimson-700 hover:bg-crimson-100 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm flex items-center justify-center p-4" 
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-ink-200 sticky top-0 bg-white/90 backdrop-blur-xl z-10">
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink-900">
                  {editing ? 'Edit Product' : 'Add Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-ink-400 hover:text-gold-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <label className="label-lux">Product Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-lux" placeholder="e.g. Absolute Black Granite" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-lux">Category *</label>
                    <select required value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="input-lux">
                      {categories.map((cat) => <option key={cat.id} value={cat.id} className="bg-white">{cat.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label-lux">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-lux">
                      <option value="active" className="bg-white">Active</option>
                      <option value="inactive" className="bg-white">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Existing Saved Images */}
                {existingImages.length > 0 && (
                  <div>
                    <label className="label-lux">Current Saved Images</label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {existingImages.map((img) => (
                        <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                          <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeExistingImage(img)} className="absolute inset-0 bg-crimson-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Upload / Drag / Paste Area */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="label-lux mb-0">Upload Product Images</label>
                    <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                      <Clipboard className="w-3.5 h-3.5" /> Ctrl + V to Paste
                    </span>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      isDragging 
                        ? 'border-amber-500 bg-amber-50/60 scale-[1.01]' 
                        : 'border-slate-300 hover:border-amber-500 bg-slate-50/50'
                    }`}
                  >
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="file-input-upload" />
                    <label htmlFor="file-input-upload" className="cursor-pointer block w-full h-full">
                      <Upload className={`w-8 h-8 mx-auto mb-2 transition-colors ${isDragging ? 'text-amber-600' : 'text-slate-400'}`} />
                      <p className="text-sm font-semibold text-slate-800">
                        {isDragging ? 'Drop images here' : 'Drag & drop images here or click to browse'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports JPEG, PNG, WebP • You can also paste (<kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-[10px] font-mono">Ctrl+V</kbd>) copied images directly
                      </p>
                    </label>
                  </div>

                  {/* New Staged Images Preview */}
                  {newImages.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-slate-600 mb-2">New Images to Upload ({newImages.length}):</p>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {newImages.map((file, idx) => (
                          <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-amber-300 shadow-sm">
                            <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => removeNewImage(idx)} 
                              className="absolute inset-0 bg-crimson-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl glass-card text-ink-600 hover:bg-ink-100 transition font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn-crimson flex-1 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
                    {editing ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}