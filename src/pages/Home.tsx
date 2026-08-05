import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import ProductsPreview from '@/components/home/ProductsPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Process from '@/components/home/Process';
import GalleryPreview from '@/components/home/GalleryPreview';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ProductsPreview />
      <WhyChooseUs />
      <Process />
      <GalleryPreview />
      <Contact />
    </>
  );
}
