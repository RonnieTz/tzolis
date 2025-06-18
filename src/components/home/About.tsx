'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { number: '20+', label: t('home.about.stats.experience') },
    { number: '500+', label: t('home.about.stats.projects') },
    { number: '100%', label: t('home.about.stats.satisfaction') },
    { number: '24/7', label: t('home.about.stats.emergency') },
  ];

  const features = [
    t('home.about.features.certified'),
    t('home.about.features.experienced'),
    t('home.about.features.equipment'),
    t('home.about.features.insured'),
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('home.about.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('home.about.description')}
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {t('home.about.cta')}
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
