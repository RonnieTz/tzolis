'use client';

import ContactHero from './components/ContactHero';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import ContactMap from './components/ContactMap';

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
