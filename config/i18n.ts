import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from '../src/lib/locales/en';
import * as gr from '../src/lib/locales/gr';

const resources = {
  en: {
    translation: {
      nav: en.nav,
      home: en.home,
      about: en.about,
      gallery: en.gallery,
      contact: en.contact,
      login: en.login,
      admin: en.admin,
    },
  },
  gr: {
    translation: {
      nav: gr.nav,
      home: gr.home,
      about: gr.about,
      gallery: gr.gallery,
      contact: gr.contact,
      login: gr.login,
      admin: gr.admin,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'gr',
  fallbackLng: 'gr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
