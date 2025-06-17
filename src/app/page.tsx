'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Wrench,
  Shield,
  Award,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: t('about.servicesList.structural'),
      description: t('about.featuresDescriptions.structural'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('about.servicesList.fabrication'),
      description: t('about.featuresDescriptions.fabrication'),
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('about.servicesList.repair'),
      description: t('about.featuresDescriptions.repair'),
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('about.servicesList.custom'),
      description: t('about.featuresDescriptions.custom'),
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Sparkles className="w-12 h-12 text-orange-400 mr-4" />
            <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-24"></div>
            <Sparkles className="w-12 h-12 text-orange-400 ml-4" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-orange-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 50 }}
          >
            {t('home.title')}
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl mb-8 text-gray-200 font-light tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: 'spring',
              stiffness: 50,
            }}
          >
            {t('home.subtitle')}
          </motion.p>

          <motion.p
            className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              type: 'spring',
              stiffness: 50,
            }}
          >
            {t('home.description')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              type: 'spring',
              stiffness: 50,
            }}
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center gap-2"
            >
              <span>{t('home.cta')}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/gallery"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full text-lg font-semibold border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl"
            >
              {t('home.viewWork')}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              {t('about.services')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 text-center overflow-hidden hover:bg-white/10 transition-all duration-500">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                  ></div>

                  {/* Icon container */}
                  <div
                    className={`relative inline-flex p-4 rounded-full bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-gray-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-size-200 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('home.ctaSection.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-orange-100 max-w-3xl mx-auto">
              {t('home.ctaSection.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/gallery"
                className="group px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>{t('nav.gallery')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>{t('nav.contact')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
