'use client';

import ContactHero from '@/features/contact/components/ContactHero';
import ContactInfo from '@/features/contact/components/ContactInfo';
import ContactForm from '@/features/contact/components/ContactForm';
import ContactMap from '@/features/contact/components/ContactMap';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>

        <ContactMap />
      </div>
    </div>
  );
}
