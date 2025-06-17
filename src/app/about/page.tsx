'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Wrench,
  Shield,
  Award,
  Users,
  Factory,
  Cog,
  Settings,
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Wrench className="w-12 h-12" />,
      title: t('about.servicesList.structural'),
      description: t('about.servicesDescriptions.structural'),
    },
    {
      icon: <Factory className="w-12 h-12" />,
      title: t('about.servicesList.fabrication'),
      description: t('about.servicesDescriptions.fabrication'),
    },
    {
      icon: <Cog className="w-12 h-12" />,
      title: t('about.servicesList.repair'),
      description: t('about.servicesDescriptions.repair'),
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: t('about.servicesList.custom'),
      description: t('about.servicesDescriptions.custom'),
    },
  ];

  const stats = [
    { number: '20+', label: t('about.stats.experience') },
    { number: '500+', label: t('about.stats.projects') },
    { number: '100%', label: t('about.stats.satisfaction') },
    { number: '24/7', label: t('about.stats.emergency') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('about.services')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.servicesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
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

      {/* Company Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {t('about.commitment.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-8 h-8 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t('about.commitment.quality.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('about.commitment.quality.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="w-8 h-8 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t('about.commitment.certified.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('about.commitment.certified.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t('about.commitment.customer.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('about.commitment.customer.description')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-100 p-8 rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('about.whyChoose.title')}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{t('about.whyChoose.points.experience')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{t('about.whyChoose.points.equipment')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{t('about.whyChoose.points.pricing')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{t('about.whyChoose.points.emergency')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{t('about.whyChoose.points.insured')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{t('about.whyChoose.points.consultation')}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
