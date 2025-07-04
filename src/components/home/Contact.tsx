'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useBusinessSettings } from '@/features/contact/hooks/useBusinessSettings';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const { settings, loading } = useBusinessSettings();

  // Use dynamic data if available, fallback to static data
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('home.contact.phone.title'),
      value: settings?.phone?.[0] || '+30 22310 81394',
      href: `tel:${settings?.phone?.[0]?.replace(/\s/g, '') || '+302231081394'}`,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('home.contact.email.title'),
      value: settings?.email?.[0] || 'contact@tzolis.gr',
      href: `mailto:${settings?.email?.[0] || 'contact@tzolis.gr'}`,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('home.contact.address.title'),
      value:
        settings?.address?.line1 && settings?.address?.line2
          ? `${settings.address.line1}, ${settings.address.line2}`
          : t('home.contact.address.value'),
      href: null,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('home.contact.hours.title'),
      value: getBusinessHoursString(),
      href: null,
    },
  ];

  function getBusinessHoursString() {
    if (loading) return t('home.contact.hours.value');

    if (settings?.businessHours) {
      const locale = i18n.language === 'gr' ? 'gr' : 'en';

      // Find weekday hours (Monday-Friday)
      const weekdayHours = settings.businessHours.filter((h) =>
        ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(h.day)
      );

      // Check if all weekdays have the same hours
      const firstWeekday = weekdayHours[0];
      const allSameHours = weekdayHours.every(
        (h) =>
          h.isOpen === firstWeekday?.isOpen &&
          h.openTime === firstWeekday?.openTime &&
          h.closeTime === firstWeekday?.closeTime
      );

      if (allSameHours && firstWeekday?.isOpen) {
        const dayRange =
          locale === 'en' ? 'Monday - Friday' : 'Δευτέρα - Παρασκευή';
        return `${dayRange}: ${firstWeekday.openTime} - ${firstWeekday.closeTime}`;
      }
    }

    // Fallback to translation
    return t('home.contact.hours.value');
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('home.contact.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('home.contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-orange-500 mt-1">{info.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-300">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-gray-800 p-8 rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">
              {t('home.contact.cta.title')}
            </h3>
            <p className="text-gray-300 mb-8">
              {t('home.contact.cta.description')}
            </p>
            <div className="space-y-4">
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {t('home.contact.cta.form')}
              </Link>
              <a
                href={contactInfo[0].href || undefined}
                className="block w-full text-center px-6 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {t('home.contact.cta.call')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
