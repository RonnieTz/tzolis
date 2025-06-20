'use client';

import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import PrivacyNotice from '@/components/home/PrivacyNotice';

export default function HomePageClient() {
  // Track visitor on home page
  useVisitorTracking('home');

  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Contact />
      <PrivacyNotice />
    </main>
  );
}
