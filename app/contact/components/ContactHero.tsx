import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ContactHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl">
            Get in touch with us for your welding and metal fabrication needs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
