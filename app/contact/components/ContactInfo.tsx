import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactInfoData, ContactInfoItem } from '../constants/contactInfo';

export default function ContactInfo() {
  const { t } = useTranslation();

  const getContentForItem = (item: ContactInfoItem) => {
    if (item.content === 'address') {
      // Return translated address content
      return [
        t('contact.addressContent.line1'),
        t('contact.addressContent.line2'),
        t('contact.addressContent.line3'),
      ];
    }
    if (item.content === 'businessHours') {
      // Return translated business hours content
      return [
        t('contact.businessHoursContent.weekdays'),
        t('contact.businessHoursContent.saturday'),
        t('contact.businessHoursContent.sunday'),
      ];
    }
    return item.content as string[];
  };

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
