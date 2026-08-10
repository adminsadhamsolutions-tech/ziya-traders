import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteSettings } from '@/types';

const DEFAULT_SETTINGS: SiteSettings = {
  company_name: 'ZIYA TRADERS',
  owner: 'Javith Akthar',
  tagline: 'Your Trusted Granite Inspection & Export Partner',
  email: 'javithjr2015@gmail.com',
  phone: '+91 8870380977',
  address:
    'Ziya Traders, 81, Near Cambridge School, Thiruvalluvar Nagar, Hosur, Krishnagiri District, Tamil Nadu, India, 635109',
  gst: '33BGEPJ7002C1Z4',
  logo_url: '',
  hero_image_url: '',
  about:
    'ZIYA TRADERS specializes in sourcing premium Granite, Marble and Quartz from trusted Indian manufacturers. We provide professional quality inspection, supplier verification, factory audits, production monitoring and export assistance for international buyers. Our mission is to ensure every shipment meets global quality standards before dispatch. We act as the bridge between Indian manufacturers and overseas clients by offering transparent inspection services, detailed reporting and reliable sourcing support.',
  facebook: '',
  instagram: '',
  linkedin: '',
  whatsapp: '918870380977',
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'site')
        .maybeSingle();
      if (data?.value) {
        setSettings({ ...DEFAULT_SETTINGS, ...(data.value as SiteSettings) });
      }
      setLoading(false);
    })();
  }, []);

  return { settings, loading, setSettings };
}
