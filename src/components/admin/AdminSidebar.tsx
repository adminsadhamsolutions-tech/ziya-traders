import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gem,
  LayoutDashboard,
  Package,
  FolderTree,
  Images,
  ClipboardCheck,
  Mail,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', Icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', Icon: Package },
  { label: 'Categories', path: '/admin/categories', Icon: FolderTree },
  { label: 'Gallery', path: '/admin/gallery', Icon: Images },
  { label: 'Inspection Requests', path: '/admin/inspection-requests', Icon: ClipboardCheck },
  { label: 'Contact Messages', path: '/admin/contacts', Icon: Mail },
  { label: 'Settings', path: '/admin/settings', Icon: Settings },
  { label: 'Profile', path: '/admin/profile', Icon: User },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, admin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isActive = (path: string) =>
    path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path);

  const content = (
    <div className="flex flex-col h-full">
      <Link to="/admin" className="flex items-center gap-3 px-5 py-5 border-b border-ink-200">
        <span className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
          <Gem className="w-5 h-5 text-ink-900" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-ink-900 leading-tight truncate">ZIYA TRADERS</p>
          <p className="text-xs text-ink-400">Admin Panel</p>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, path, Icon }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(path)
                ? 'bg-gold-50 border border-gold-300/50 text-gold-700'
                : 'text-ink-500 hover:text-ink-900 hover:bg-ink-100'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-ink-200">
        <div className="px-4 py-2 mb-2 min-w-0">
          <p className="text-sm font-medium text-ink-800 truncate">{admin?.name || 'Admin'}</p>
          <p className="text-xs text-ink-400 truncate">{admin?.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-crimson-700 hover:bg-crimson-50 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-ink-200 z-30 hidden lg:block">
        {content}
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-40 w-10 h-10 rounded-xl glass-card-gold flex items-center justify-center text-gold-700"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-72 h-full bg-white border-r border-ink-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg glass-card flex items-center justify-center text-ink-400"
              >
                <X className="w-5 h-5" />
              </button>
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
