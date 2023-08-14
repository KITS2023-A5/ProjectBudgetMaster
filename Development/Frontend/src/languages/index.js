import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ENG: {
      translation: {
        // Language: "Language",
        // Search: "Search",
        // Home: "Home",
      },
    },
    VIE: {
      translation: {
        // Language: "Ngôn ngữ",
        // Search: "Tìm kiếm",
        // Home: "Trang chủ",
      },
    },
  },
});

export default i18n;
