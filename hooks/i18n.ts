import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAbout from '@/locales/en/about.json';
import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import enTools from '@/locales/en/tools.json';
import plAbout from '@/locales/pl/about.json';
import plCommon from '@/locales/pl/common.json';
import plHome from '@/locales/pl/home.json';
import plTools from '@/locales/pl/tools.json';

// Define available translations
const resources = {
  en: { common: enCommon, home: enHome, tools: enTools, about: enAbout },
  pl: { common: plCommon, home: plHome, tools: plTools, about: plAbout },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  defaultNS: "common",
  ns: ["common", "home", "tools", "about"],
  // i18n.language || "pl", // Get current language or default to English
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
