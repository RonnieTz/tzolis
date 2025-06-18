import { useState, useEffect } from 'react';

interface BusinessHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  specialNote: string;
}

interface BusinessSettings {
  _id?: string;
  businessHours: BusinessHours[];
  phone: string[];
  email: string[];
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
}

export const useBusinessSettings = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/business-settings');
      const result = await response.json();

      if (result.success) {
        setSettings(result.data);
        setError(null);
      } else {
        setError('Failed to load business settings');
      }
    } catch {
      setError('Error loading business settings');
    } finally {
      setLoading(false);
    }
  };

  const formatBusinessHours = (locale: 'en' | 'gr' = 'en') => {
    if (!settings) return null;

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
        return `${dayName}: ${hour.specialNote || (locale === 'en' ? 'Closed' : 'Κλειστά')}`;
      }

      return `${dayName}: ${hour.openTime} - ${hour.closeTime}`;
    });
  };

  const getFormattedBusinessHoursString = (locale: 'en' | 'gr' = 'en') => {
    const hours = formatBusinessHours(locale);
    return hours ? hours.join('\n') : '';
  };

  return {
    settings,
    loading,
    error,
    formatBusinessHours,
    getFormattedBusinessHoursString,
    refresh: fetchSettings,
  };
};
