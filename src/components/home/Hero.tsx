'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:+302101234567"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-colors duration-200"
              >
                <Phone className="mr-2 w-5 h-5" />
                {t('home.hero.phone')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
