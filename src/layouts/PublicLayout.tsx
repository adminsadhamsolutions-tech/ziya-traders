import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { useSettings } from '@/hooks/useSettings';

export default function PublicLayout() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen flex flex-col bg-ink-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer settings={settings} />
      <FloatingButtons whatsapp={settings.whatsapp} />
    </div>
  );
}
