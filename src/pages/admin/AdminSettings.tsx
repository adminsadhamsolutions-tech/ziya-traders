import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Upload, Settings as SettingsIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/upload';
import { useSettings } from '@/hooks/useSettings';
import type { SiteSettings } from '@/types';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminSettings() {
  const { settings, setSettings } = useSettings();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => { setForm(settings); }, [settings]);

  const handleChange = (field: keyof SiteSettings, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = async (field: 'logo_url' | 'hero_image_url', file: File) => {
    setUploadingField(field);
    const url = await uploadImage(file, 'settings');
    if (url) handleChange(field, url);
    setUploadingField(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: existing } = await supabase.from('settings').select('id').eq('key', 'site').maybeSingle();
    if (existing) { await supabase.from('settings').update({ value: form as any }).eq('key', 'site'); }
    else { await supabase.from('settings').insert({ key: 'site', value: form as any }); }
    setSettings(form); setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader title="Settings" description="Manage your website content and company information" />

      <form onSubmit={handleSave} className="max-w-3xl space-y-5 sm:space-y-6">
        {/* Images */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 sm:p-6 rounded-2xl">
          <h3 className="font-display text-base sm:text-lg font-bold text-ink-900 mb-4">Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="label-lux">Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl glass-card overflow-hidden flex items-center justify-center shrink-0">
                  {form.logo_url ? <img src={form.logo_url} alt="Logo" className="w-full h-full object-cover" /> : <SettingsIcon className="w-6 h-6 text-ink-300" />}
                </div>
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload('logo_url', e.target.files[0])} />
                  <span className="btn-outline-gold text-sm">{uploadingField === 'logo_url' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload</span>
                </label>
              </div>
            </div>
            <div>
              <label className="label-lux">Hero Image</label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-20 rounded-xl glass-card overflow-hidden shrink-0">
                  {form.hero_image_url ? <img src={form.hero_image_url} alt="Hero" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><SettingsIcon className="w-6 h-6 text-ink-300" /></div>}
                </div>
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload('hero_image_url', e.target.files[0])} />
                  <span className="btn-outline-gold text-sm">{uploadingField === 'hero_image_url' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="font-display text-base sm:text-lg font-bold text-ink-900">Company Information</h3>
          <div className="grid grid-cols-1 sm:g
          
          rid-cols-2 gap-4">
            <div><label className="label-lux">Company Name</label><input type="text" value={form.company_name} onChange={(e) => handleChange('company_name', e.target.value)} className="input-lux" /></div>
            <div><label className="label-lux">Owner</label><input type="text" value={form.owner} onChange={(e) => handleChange('owner', e.target.value)} className="input-lux" /></div>
            <div><label className="label-lux">Tagline</label><input type="text" value={form.tagline} onChange={(e) => handleChange('tagline', e.target.value)} className="input-lux" /></div>
            <div><label className="label-lux">GST</label><input type="text" value={form.gst} onChange={(e) => handleChange('gst', e.target.value)} className="input-lux" /></div>
          </div>
          <div><label className="label-lux">Address</label><textarea rows={3} value={form.address} onChange={(e) => handleChange('address', e.target.value)} className="input-lux resize-none" /></div>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="font-display text-base sm:text-lg font-bold text-ink-900">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label-lux">Email</label><input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} className="input-lux" /></div>
            <div><label className="label-lux">Phone</label><input type="text" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} className="input-lux" /></div>
            <div><label className="label-lux">WhatsApp (digits only, with country code)</label><input type="text" value={form.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} className="input-lux" placeholder="918870380977" /></div>
          </div>
        </motion.div>

        {/* About */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5 sm:p-6 rounded-2xl">
          <label className="label-lux">About Content</label>
          <textarea rows={6} value={form.about} onChange={(e) => handleChange('about', e.target.value)} className="input-lux resize-none" />
        </motion.div>

        {/* Social */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="font-display text-base sm:text-lg font-bold text-ink-900">Social Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className="label-lux">Facebook</label><input type="text" value={form.facebook} onChange={(e) => handleChange('facebook', e.target.value)} className="input-lux" placeholder="https://facebook.com/..." /></div>
            <div><label className="label-lux">Instagram</label><input type="text" value={form.instagram} onChange={(e) => handleChange('instagram', e.target.value)} className="input-lux" placeholder="https://instagram.com/..." /></div>
            <div><label className="label-lux">LinkedIn</label><input type="text" value={form.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} className="input-lux" placeholder="https://linkedin.com/..." /></div>
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className="btn-crimson disabled:opacity-60">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Settings</button>
          {saved && <p className="text-sm text-emerald-600">Settings saved successfully!</p>}
        </div>
      </form>
    </div>
  );
}
