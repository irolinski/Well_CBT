import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home/index.json";
import plCommon from "@/locales/pl/common.json";
import plHome from "@/locales/pl/home/index.json";

// Define available translations
const resources = {
  en: { common: enCommon, home: enHome },
  pl: { common: plCommon, home: plHome },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  // i18n.language || "pl", // Get current language or default to English
  fallbackLng: "pl",
  interpolation: { escapeValue: false },
});

export default i18n;
