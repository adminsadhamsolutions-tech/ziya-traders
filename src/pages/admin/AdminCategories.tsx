import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Loader2, FolderTree } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/types';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', sort_order: 0 });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
    setCategories((data as Category[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', slug: '', sort_order: categories.length + 1 }); setShowModal(true); };
  const openEdit = (cat: Category) => { setEditing(cat); setForm({ name: cat.name, slug: cat.slug, sort_order: cat.sort_order }); setShowModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = form.slug.toLowerCase().replace(/\s+/g, '-');
    if (editing) { await supabase.from('categories').update({ name: form.name, slug, sort_order: form.sort_order }).eq('id', editing.id); }
    else { await supabase.from('categories').insert({ name: form.name, slug, sort_order: form.sort_order }); }
    setSaving(false); setShowModal(false); await load();
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Delete category "${cat.name}"? This will also delete all products in this category.`)) return;
    await supabase.from('categories').delete().eq('id', cat.id);
    await load();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader title="Categories" description="Manage product categories"
        action={<button onClick={openCreate} className="btn-crimson text-sm"><Plus className="w-4 h-4" /> Add Category</button>}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">{[...Array(3)].map((_, i) => <div key={i} className="h-32 glass-card rounded-2xl animate-pulse" />)}</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 sm:py-20"><FolderTree className="w-12 h-12 text-ink-300 mx-auto mb-4" /><p className="text-ink-400">No categories yet.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 sm:p-6 rounded-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-300/50 flex items-center justify-center"><FolderTree className="w-6 h-6 text-gold-600" /></div>
                <span className="text-xs text-ink-400">/{cat.slug}</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-ink-900 mb-1">{cat.name}</h3>
              <p className="text-xs text-ink-400 mb-4">Order: {cat.sort_order}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(cat)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg glass-card-gold text-gold-700 hover:bg-gold-100 transition text-sm"><Pencil className="w-4 h-4" /> Edit</button>
                <button onClick={() => handleDelete(cat)} className="px-3 py-2 rounded-lg bg-crimson-50 border border-crimson-200 text-crimson-700 hover:bg-crimson-100 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-card rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-ink-200">
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink-900">{editing ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={() => setShowModal(false)} className="text-ink-400 hover:text-gold-600"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4">
                <div><label className="label-lux">Name *</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-lux" placeholder="e.g. Granite" /></div>
                <div><label className="label-lux">Slug *</label><input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-lux" placeholder="e.g. granite" /></div>
                <div><label className="label-lux">Sort Order</label><input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="input-lux" /></div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl glass-card text-ink-600 hover:bg-ink-100 transition">Cancel</button>
                  <button type="submit" disabled={saving} className="btn-crimson flex-1 disabled:opacity-60">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}{editing ? 'Save' : 'Create'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
