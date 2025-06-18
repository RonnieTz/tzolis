'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GavelIcon } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const sections = [
    'introduction',
    'acceptance',
    'services',
    'content',
    'userAccounts',
    'intellectual',
    'privacy',
    'termination',
    'limitation',
    'governing',
    'changes',
    'contact',
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <GavelIcon
              className="mr-3 text-blue-600 dark:text-blue-400"
              size={32}
            />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {t('terms.title')}
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('terms.lastUpdated')}: {t('terms.updateDate')}
            </p>

            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-6">{t('terms.welcome')}</p>

              {sections.map((section) => (
                <div
                  key={section}
                  className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4"
                >
                  <button
                    onClick={() => toggleSection(section)}
                    className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{t(`terms.sections.${section}.title`)}</span>
                    <span className="text-xl">
                      {activeSection === section ? '−' : '+'}
                    </span>
                  </button>

                  {activeSection === section && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 text-gray-600 dark:text-gray-300"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: t(`terms.sections.${section}.content`),
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
