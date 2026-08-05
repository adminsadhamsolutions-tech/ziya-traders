import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, X, Mail, Phone, MailOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Contact } from '@/types';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    setContacts((data as Contact[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (contact: Contact) => { await supabase.from('contacts').update({ is_read: true }).eq('id', contact.id); await load(); };
  const handleDelete = async (contact: Contact) => { if (!confirm('Delete this message?')) return; await supabase.from('contacts').delete().eq('id', contact.id); setSelected(null); await load(); };
  const openDetail = (contact: Contact) => { setSelected(contact); if (!contact.is_read) markRead(contact); };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader title="Contact Messages" description="Messages submitted from the website contact form" />

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 sm:h-20 glass-card rounded-xl animate-pulse" />)}</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 sm:py-20"><Mail className="w-12 h-12 text-ink-300 mx-auto mb-4" /><p className="text-ink-400">No contact messages yet.</p></div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <motion.div key={contact.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`glass-card p-4 sm:p-5 rounded-xl flex items-center justify-between gap-3 sm:gap-4 ${!contact.is_read ? 'border-gold-300/60' : ''}`}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium text-ink-800 truncate text-sm sm:text-base">{contact.name}</p>
                  {!contact.is_read && <span className="w-2 h-2 rounded-full bg-crimson-600 shrink-0" />}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-ink-400">
                  <span>{contact.email}</span>
                  {contact.phone && <span>{contact.phone}</span>}
                  <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-ink-500 mt-1 truncate">{contact.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!contact.is_read && <button onClick={() => markRead(contact)} className="w-9 h-9 rounded-lg glass-card-gold flex items-center justify-center text-gold-700 hover:bg-gold-100" title="Mark as read"><MailOpen className="w-4 h-4" /></button>}
                <button onClick={() => openDetail(contact)} className="w-9 h-9 rounded-lg glass-card-gold flex items-center justify-center text-gold-700 hover:bg-gold-100"><Eye className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(contact)} className="w-9 h-9 rounded-lg bg-crimson-50 border border-crimson-200 flex items-center justify-center text-crimson-700 hover:bg-crimson-100"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-card rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-ink-200">
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink-900">Message from {selected.name}</h2>
                <button onClick={() => setSelected(null)} className="text-ink-400 hover:text-gold-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-xs text-ink-400 mb-1 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</p><a href={`mailto:${selected.email}`} className="text-sm text-gold-700 hover:text-gold-800">{selected.email}</a></div>
                  {selected.phone && <div><p className="text-xs text-ink-400 mb-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</p><a href={`tel:${selected.phone}`} className="text-sm text-gold-700 hover:text-gold-800">{selected.phone}</a></div>}
                </div>
                <div><p className="text-xs text-ink-400 mb-1">Message</p><p className="text-sm text-ink-700 leading-relaxed bg-ink-50 rounded-xl p-4">{selected.message}</p></div>
                <p className="text-xs text-ink-400">{new Date(selected.created_at).toLocaleString()}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
