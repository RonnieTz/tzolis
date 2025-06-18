'use client';

import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('nav.company.name')}</h3>
            <p className="text-gray-300 mb-4">{t('home.description')}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact.title')}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Lamia, Greece</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+30 22310 81394</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@tzolis.gr</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('about.services')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{t('about.servicesList.structural')}</li>
              <li>{t('about.servicesList.fabrication')}</li>
              <li>{t('about.servicesList.repair')}</li>
              <li>{t('about.servicesList.custom')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {t('nav.company.fullName')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
