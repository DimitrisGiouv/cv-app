import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import el from './locales/el/translation.json';

const savedLanguage = localStorage.getItem('app_language');
const browserLanguage = navigator.language?.toLowerCase().startsWith('el') ? 'el' : 'en';
const initialLanguage = savedLanguage || browserLanguage;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    el: { translation: el },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
