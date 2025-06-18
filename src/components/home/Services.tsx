'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Wrench, Factory, Cog, Settings, Clock, Shield } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: t('home.services.structural.title'),
      description: t('home.services.structural.description'),
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: t('home.services.fabrication.title'),
      description: t('home.services.fabrication.description'),
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: t('home.services.repair.title'),
      description: t('home.services.repair.description'),
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: t('home.services.custom.title'),
      description: t('home.services.custom.description'),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('home.services.emergency.title'),
      description: t('home.services.emergency.description'),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('home.services.quality.title'),
      description: t('home.services.quality.description'),
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('home.services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-orange-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
