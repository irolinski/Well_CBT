import { getLocales } from "expo-localization";
import i18n from "i18next";
import { ReactNode } from "react";
import { initReactI18next, Trans } from "react-i18next";
import { twelveHourRegions } from "@/constants/models/dates";
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

// Get full locale (e.g., "en-US" or "en-GB")
const fullLocale = getLocales()[0]?.languageTag ?? "en-US";

// Extract language and region separately
const [deviceLanguage, deviceRegion] = fullLocale.split("-");

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

export type AvailableLanguage = keyof typeof resources;
export type TransComponentType = ReactNode & {
  type: typeof Trans; // Restricting the type to `Trans` component
};

// Initialize i18next
const i18nInitObj = {
  resources,
  lng: deviceLanguage || "en",
  supportedLngs: ["en", "pl"],
  defaultNS: "common",
  ns: ["common", "home", "tools", "learn", "about"],
  fallbackLng: ["en"],
  interpolation: { escapeValue: false },
};

i18n.use(initReactI18next).init(i18nInitObj);

// Function to check if 12-hour format should be used
export const currentLocaleUses12hClock = () => {
  return twelveHourRegions.includes(deviceRegion); // True = 12-hour, False = 24-hour
};

// Export selected language
export const selectedLanguage = availableLanguagesArr.includes(i18n.language)
  ? i18n.language
  : i18nInitObj.fallbackLng[0]; // ensure that fallback language is selected

export default i18n;
