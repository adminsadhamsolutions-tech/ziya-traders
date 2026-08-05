import { motion } from 'framer-motion';
import { User, Mail, Calendar, Gem, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminProfile() {
  const { admin } = useAuth();

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <AdminPageHeader title="Profile" description="Your admin account information" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        <div className="glass-card p-6 sm:p-8 rounded-2xl">
          <div className="flex items-center gap-5 mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold shrink-0">
              <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-ink-900" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900 truncate">{admin?.name || 'Admin'}</h2>
              <p className="text-sm text-gold-600 flex items-center gap-2 mt-1"><ShieldCheck className="w-4 h-4" /> Administrator</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-ink-50 border border-ink-200">
              <div className="w-10 h-10 rounded-lg bg-gold-50 border border-gold-300/50 flex items-center justify-center shrink-0"><User className="w-5 h-5 text-gold-600" /></div>
              <div><p className="text-xs text-ink-400">Name</p><p className="text-sm text-ink-800">{admin?.name || 'N/A'}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-ink-50 border border-ink-200">
              <div className="w-10 h-10 rounded-lg bg-gold-50 border border-gold-300/50 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-gold-600" /></div>
              <div className="min-w-0"><p className="text-xs text-ink-400">Email</p><p className="text-sm text-ink-800 truncate">{admin?.email || 'N/A'}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-ink-50 border border-ink-200">
              <div className="w-10 h-10 rounded-lg bg-gold-50 border border-gold-300/50 flex items-center justify-center shrink-0"><Calendar className="w-5 h-5 text-gold-600" /></div>
              <div><p className="text-xs text-ink-400">Member Since</p><p className="text-sm text-ink-800">{admin?.created_at ? new Date(admin.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
