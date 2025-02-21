import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enAbout from "@/locales/en/about.json";
import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enLearn from "@/locales/en/learn.json";
import enTools from "@/locales/en/tools.json";
import plAbout from "@/locales/pl/about.json";
import plCommon from "@/locales/pl/common.json";
import plHome from "@/locales/pl/home.json";
import plLearn from "@/locales/pl/learn.json";
import plTools from "@/locales/pl/tools.json";

const deviceLanguage = getLocales()[0].languageCode ?? "en";

// Define available translations
const resources = {
  en: {
    common: enCommon,
    home: enHome,
    tools: enTools,
    about: enAbout,
    learn: enLearn,
  },
  pl: {
    common: plCommon,
    home: plHome,
    tools: plTools,
    about: plAbout,
    learn: plLearn,
  },
};

export const availableLanguagesArr = Object.keys(resources);
//this type needs a fix
export type AvailableLanguage = typeof availableLanguagesArr;

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage!,
  supportedLngs: ["en", "pl"],
  defaultNS: "common",
  ns: ["common", "home", "tools", "learn", "about"],
  // i18n.language || "pl", // Get current language or default to English
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
