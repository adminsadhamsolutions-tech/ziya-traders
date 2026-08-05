import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, FolderTree, Images, ClipboardCheck, Mail, TrendingUp, Clock, CheckCircle2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

type Stats = { products: number; categories: number; gallery: number; inspectionRequests: number; pendingInspections: number; contacts: number; unreadContacts: number };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, categories: 0, gallery: 0, inspectionRequests: 0, pendingInspections: 0, contacts: 0, unreadContacts: 0 });
  const [recentInspections, setRecentInspections] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [products, categories, gallery, inspections, contacts] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('gallery').select('id', { count: 'exact', head: true }),
        supabase.from('inspection_requests').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
      ]);
      const inspData = inspections.data || [];
      const contactData = contacts.data || [];
      setStats({
        products: products.count || 0, categories: categories.count || 0, gallery: gallery.count || 0,
        inspectionRequests: inspData.length, pendingInspections: inspData.filter((i) => i.status === 'pending').length,
        contacts: contactData.length, unreadContacts: contactData.filter((c) => !c.is_read).length,
      });
      setRecentInspections(inspData);
      setRecentContacts(contactData);
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: 'Products', value: stats.products, Icon: Package, link: '/admin/products' },
    { label: 'Categories', value: stats.categories, Icon: FolderTree, link: '/admin/categories' },
    { label: 'Gallery Images', value: stats.gallery, Icon: Images, link: '/admin/gallery' },
    { label: 'Inspection Requests', value: stats.inspectionRequests, Icon: ClipboardCheck, link: '/admin/inspection-requests' },
    { label: 'Pending Inspections', value: stats.pendingInspections, Icon: Clock, link: '/admin/inspection-requests' },
    { label: 'Contact Messages', value: stats.contacts, Icon: Mail, link: '/admin/contacts' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader title="Dashboard" description="Overview of your ZIYA TRADERS admin panel" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <Link to={card.link} className="block glass-card p-4 sm:p-5 rounded-2xl hover:border-gold-400 hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between mb-3">
                <card.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500" />
                <TrendingUp className="w-4 h-4 text-ink-300" />
              </div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-ink-900">{card.value}</p>
              <p className="text-xs sm:text-sm text-ink-500 mt-1">{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 sm:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base sm:text-lg font-bold text-ink-900">Recent Inspection Requests</h3>
            <Link to="/admin/inspection-requests" className="text-xs text-gold-600 hover:text-gold-700">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-ink-100 rounded-xl animate-pulse" />)}</div>
          ) : recentInspections.length === 0 ? (
            <p className="text-sm text-ink-400 text-center py-8">No inspection requests yet.</p>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {recentInspections.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 border border-ink-200">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-800 truncate">{req.client_name}</p>
                    <p className="text-xs text-ink-400 truncate">{req.stone_type || 'N/A'} · {req.country || 'N/A'}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : req.status === 'reviewing' ? 'bg-blue-100 text-blue-700' : 'bg-crimson-100 text-crimson-700'}`}>{req.status}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5 sm:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base sm:text-lg font-bold text-ink-900">Recent Contact Messages</h3>
            <Link to="/admin/contacts" className="text-xs text-gold-600 hover:text-gold-700">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-ink-100 rounded-xl animate-pulse" />)}</div>
          ) : recentContacts.length === 0 ? (
            <p className="text-sm text-ink-400 text-center py-8">No contact messages yet.</p>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {recentContacts.map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 border border-ink-200">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-800 truncate">{msg.name}</p>
                    <p className="text-xs text-ink-400 truncate">{msg.email}</p>
                  </div>
                  {msg.is_read ? <CheckCircle2 className="w-4 h-4 text-ink-300 shrink-0" /> : <span className="w-2 h-2 rounded-full bg-crimson-600 shrink-0" />}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
