import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactInfoData, ContactInfoItem } from '../constants/contactInfo';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

export default function ContactInfo() {
  const { t, i18n } = useTranslation();
  const { settings, loading } = useBusinessSettings();

  const getContentForItem = (item: ContactInfoItem) => {
    if (item.content === 'address') {
      // Use dynamic address from business settings if available, fallback to translations
      if (settings?.address) {
        return [
          settings.address.line1,
          settings.address.line2,
          settings.address.line3,
        ];
      }
      return [
        t('contact.addressContent.line1'),
        t('contact.addressContent.line2'),
        t('contact.addressContent.line3'),
      ];
    }
    if (item.content === 'businessHours') {
      // Use dynamic business hours from business settings if available
      if (settings?.businessHours) {
        const locale = i18n.language === 'gr' ? 'gr' : 'en';
        const dayTranslations = {
          en: {
            monday: 'Monday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
            thursday: 'Thursday',
            friday: 'Friday',
            saturday: 'Saturday',
            sunday: 'Sunday',
          },
          gr: {
            monday: 'Δευτέρα',
            tuesday: 'Τρίτη',
            wednesday: 'Τετάρτη',
            thursday: 'Πέμπτη',
            friday: 'Παρασκευή',
            saturday: 'Σάββατο',
            sunday: 'Κυριακή',
          },
        };

        return settings.businessHours.map((hour) => {
          const dayName =
            dayTranslations[locale][
              hour.day as keyof (typeof dayTranslations)[typeof locale]
            ];

          if (!hour.isOpen) {
            return `${dayName}: ${
              hour.specialNote || (locale === 'en' ? 'Closed' : 'Κλειστά')
            }`;
          }

          return `${dayName}: ${hour.openTime} - ${hour.closeTime}`;
        });
      }
      // Fallback to translated business hours content
      return [
        t('contact.businessHoursContent.weekdays'),
        t('contact.businessHoursContent.saturday'),
        t('contact.businessHoursContent.sunday'),
      ];
    }

    // Handle phone and email from business settings
    if (item.title === 'contact.phone' && settings?.phone) {
      return settings.phone;
    }
    if (item.title === 'contact.email' && settings?.email) {
      return settings.email;
    }

    return item.content as string[];
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center h-64"
      >
        <div className="text-gray-600">Loading contact information...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        {t('contact.getInTouch')}
      </h2>

      <div className="space-y-6">
        {contactInfoData.map((item: ContactInfoItem, index: number) => (
          <motion.div
            key={index}
            className="flex items-start space-x-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="text-orange-500 mt-1">{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title.startsWith('contact.') ? t(item.title) : item.title}
              </h3>
              {getContentForItem(item).map(
                (line: string, lineIndex: number) => (
                  <p key={lineIndex} className="text-gray-600">
                    {line}
                  </p>
                )
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
