import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactInfoData, ContactInfoItem } from '../constants/contactInfo';

export default function ContactInfo() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>

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
              {item.content.map((line: string, lineIndex: number) => (
                <p key={lineIndex} className="text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Emergency Contact */}
      <motion.div
        className="mt-8 p-6 bg-orange-100 rounded-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-orange-800 mb-2">
          Emergency Services
        </h3>
        <p className="text-orange-700">
          For urgent welding repairs, call us 24/7 at{' '}
          <span className="font-semibold">+30 694 567 8901</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
