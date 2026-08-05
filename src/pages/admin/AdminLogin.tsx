import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, Lock, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@ziyatraders.com');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { setError(error); } else { navigate('/admin'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-ink-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-soft-radial" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/8 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <span className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-sm">
                <Gem className="w-6 h-6 text-ink-900" />
              </span>
            </Link>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-ink-900 mb-1">Admin Panel</h1>
            <p className="text-sm text-ink-500">Sign in to manage ZIYA TRADERS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="label-lux">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-lux pl-12" placeholder="admin@ziyatraders.com" />
              </div>
            </div>
            <div>
              <label className="label-lux">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input type={showPass ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="input-lux pl-12 pr-12" placeholder="Enter password" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-gold-600">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <div className="text-sm text-crimson-700 bg-crimson-50 border border-crimson-200 rounded-lg px-4 py-3">{error}</div>}

            <button type="submit" disabled={loading} className="btn-crimson w-full disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-ink-200">
            <p className="text-xs text-ink-400 text-center mb-3">Demo credentials: admin@ziyatraders.com / admin123</p>
            <Link to="/" className="flex items-center justify-center gap-2 text-sm text-ink-500 hover:text-gold-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
