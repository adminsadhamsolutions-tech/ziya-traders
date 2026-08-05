import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, X, Mail, Phone, Globe, Building2, Package, ClipboardCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { InspectionRequest, InspectionStatus } from '@/types';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const statusColors: Record<InspectionStatus, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-300',
  reviewing: 'bg-blue-100 text-blue-700 border-blue-300',
  approved: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  rejected: 'bg-crimson-100 text-crimson-700 border-crimson-300',
};

export default function AdminInspectionRequests() {
  const [requests, setRequests] = useState<InspectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InspectionRequest | null>(null);
  const [filter, setFilter] = useState<InspectionStatus | 'all'>('all');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('inspection_requests').select('*').order('created_at', { ascending: false });
    setRequests((data as InspectionRequest[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (req: InspectionRequest) => { await supabase.from('inspection_requests').update({ is_read: true }).eq('id', req.id); await load(); };
  const updateStatus = async (id: string, status: InspectionStatus) => { await supabase.from('inspection_requests').update({ status }).eq('id', id); await load(); setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev)); };
  const handleDelete = async (req: InspectionRequest) => { if (!confirm('Delete this inspection request?')) return; await supabase.from('inspection_requests').delete().eq('id', req.id); setSelected(null); await load(); };
  const openDetail = (req: InspectionRequest) => { setSelected(req); if (!req.is_read) markRead(req); };

  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter);
  const statuses: (InspectionStatus | 'all')[] = ['all', 'pending', 'reviewing', 'approved', 'rejected'];

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader title="Inspection Requests" description="Manage client inspection inquiries" />

      <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium capitalize transition ${filter === s ? 'bg-gold-gradient text-ink-900' : 'glass-card text-ink-600 hover:text-gold-600'}`}>{s}</button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 sm:h-20 glass-card rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 sm:py-20"><ClipboardCheck className="w-12 h-12 text-ink-300 mx-auto mb-4" /><p className="text-ink-400">No inspection requests found.</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 sm:p-5 rounded-xl flex items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium text-ink-800 truncate text-sm sm:text-base">{req.client_name}</p>
                  {!req.is_read && <span className="w-2 h-2 rounded-full bg-crimson-600 shrink-0" />}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-ink-400">
                  {req.company && <span>{req.company}</span>}
                  {req.country && <span>{req.country}</span>}
                  {req.stone_type && <span>{req.stone_type}</span>}
                  <span>{new Date(req.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[req.status]}`}>{req.status}</span>
                <button onClick={() => openDetail(req)} className="w-9 h-9 rounded-lg glass-card-gold flex items-center justify-center text-gold-700 hover:bg-gold-100"><Eye className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(req)} className="w-9 h-9 rounded-lg bg-crimson-50 border border-crimson-200 flex items-center justify-center text-crimson-700 hover:bg-crimson-100"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-ink-200">
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink-900">Inspection Request</h2>
                <button onClick={() => setSelected(null)} className="text-ink-400 hover:text-gold-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field Icon={ClipboardCheck} label="Client Name" value={selected.client_name} />
                  <Field Icon={Building2} label="Company" value={selected.company || 'N/A'} />
                  <Field Icon={Globe} label="Country" value={selected.country || 'N/A'} />
                  <Field Icon={Phone} label="Phone" value={selected.phone} />
                  <Field Icon={Mail} label="Email" value={selected.email} />
                  <Field Icon={Package} label="Stone Type" value={selected.stone_type || 'N/A'} />
                  <Field Icon={Package} label="Quantity" value={selected.quantity || 'N/A'} />
                </div>
                {selected.message && <div><p className="text-xs text-ink-400 mb-1">Message</p><p className="text-sm text-ink-700 leading-relaxed bg-ink-50 rounded-xl p-4">{selected.message}</p></div>}
                <div>
                  <p className="text-xs text-ink-400 mb-2">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(['pending', 'reviewing', 'approved', 'rejected'] as InspectionStatus[]).map((s) => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-4 py-2 rounded-full text-sm capitalize transition ${selected.status === s ? `border ${statusColors[s]}` : 'glass-card text-ink-500 hover:text-ink-800'}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ Icon, label, value }: { Icon: any; label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-ink-400 mb-1 flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" /> {label}</p>
      <p className="text-sm text-ink-800">{value}</p>
    </div>
  );
}
