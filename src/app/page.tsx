import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = generateMetadata({
  title: {
    gr: 'Tzolis Welding - Επαγγελματικές Υπηρεσίες Συγκόλλησης & Κατασκευής Μετάλλων',
    en: 'Tzolis Welding - Professional Welding & Metal Fabrication Services',
  },
  description: {
    gr: 'Εξειδικευμένες υπηρεσίες συγκόλλησης, κατασκευής μετάλλων και επισκευών. Πάνω από 20 χρόνια εμπειρίας σε δομική συγκόλληση, προσαρμοσμένες μεταλλικές κατασκευές και επείγουσες επισκευές. Εγγυημένη ποιότητα εργασίας.',
    en: 'Expert welding, metal fabrication, and repair services. Over 20 years of experience in structural welding, custom metalwork, and emergency repairs. Quality craftsmanship guaranteed.',
  },
  keywords: {
    gr: 'συγκόλληση, κατασκευή μετάλλων, δομική συγκόλληση, προσαρμοσμένες μεταλλικές κατασκευές, υπηρεσίες επισκευής, επείγουσα συγκόλληση, επαγγελματίας συγκολλητής, μεταλλικές εργασίες',
    en: 'welding, metal fabrication, structural welding, custom metalwork, repair services, emergency welding, professional welder, metal work',
  },
  url: '/',
});

export default function HomePage() {
  return <HomePageClient />;
}
