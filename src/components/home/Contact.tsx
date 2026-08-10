import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
  User,
  MessageSquare,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/hooks/useSettings';
import { Reveal, SectionHeading } from '@/components/Reveal';

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    const { error } = await supabase.from('contacts').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Headquarters & Office',
      value: settings?.address || 'Hosur, Tamil Nadu, India',
      href: `https://www.google.com/maps?q=${encodeURIComponent(settings?.address || 'Hosur, Tamil Nadu, India')}`,
      isExternal: true,
    },
    {
      icon: Phone,
      label: 'Direct Line / Call Us',
      value: settings?.phone || '+91 8870380977',
      href: `tel:${settings?.phone}`,
      isExternal: false,
    },
    {
      icon: Mail,
      label: 'Official Email',
      value: settings?.email || 'javithjr2015@gmail.com',
      href: `mailto:${settings?.email}`,
      isExternal: false,
    },
  ];

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-slate-50/90 text-slate-800 py-16 lg:py-24">
      {/* Light Cyan Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container-lux relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Discuss Your Natural Stone & Sourcing Needs"
          subtitle="Direct procurement assistance, factory audit requests, or pre-shipment inspection queries—our team responds within 12 business hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          
          {/* Left Column: Contact Cards, WhatsApp & Map */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="space-y-3.5">
                {contactDetails.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    rel={item.isExternal ? 'noreferrer' : ''}
                    className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex items-start gap-4 block shadow-sm"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 mb-0.5">{item.label}</p>
                      <p className="text-sm sm:text-base font-medium text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug break-words">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* WhatsApp Card */}
            <Reveal delay={0.1}>
              <div className="bg-emerald-50/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-200 relative overflow-hidden group shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Instant Chat Available</p>
                    </div>
                    <p className="font-display text-base font-bold text-slate-900">Need Immediate Sourcing Help?</p>
                    <p className="text-xs text-slate-600">Connect directly with Javith Akthar on WhatsApp</p>
                  </div>

                  <a
                    href={`https://wa.me/${settings?.whatsapp || '918870380977'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-semibold text-sm shadow-md shadow-emerald-600/20 shrink-0"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>WhatsApp Now</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Embedded Google Map Box */}
            <Reveal delay={0.15}>
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm relative group h-60 sm:h-64">
                <iframe
                  title="ZIYA TRADERS Location"
                  src="https://www.google.com/maps?q=Hosur,Tamil+Nadu,India&output=embed"
                  className="w-full h-full border-0 opacity-90 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm border border-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="font-medium">Hosur Granite Sourcing Hub</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Clean Light Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Send Us a Direct Message</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Fill out the parameters below to request product availability or inspection quotes.</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 hidden sm:flex">
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 text-slate-700">
                      <User className="w-3.5 h-3.5 text-cyan-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all text-sm"
                      placeholder="e.g. John Doe / Global Stone Imports"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 text-slate-700">
                        <Mail className="w-3.5 h-3.5 text-cyan-600" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all text-sm"
                        placeholder="buyer@company.com"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-cyan-600" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all text-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 text-slate-700">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-600" />
                      Inquiry Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all text-sm resize-none"
                      placeholder="Specify your stone requirement (e.g. Granite, Marble, Quartz), dimensions, quantity, or inspection site locations..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'sent'}
                    className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 hover:shadow-lg disabled:opacity-70 transition-all duration-300"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Inquiry...
                      </span>
                    ) : status === 'sent' ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-white" /> Message Submitted Successfully!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Direct Inquiry
                      </span>
                    )}
                  </button>

                  {/* Status Banner Messages */}
                  <AnimatePresence>
                    {status === 'sent' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs sm:text-sm flex items-center gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm flex items-center gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Unable to dispatch message right now. Please verify your connection or try reaching us on WhatsApp.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Average response time: &lt; 12 hours</span>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}