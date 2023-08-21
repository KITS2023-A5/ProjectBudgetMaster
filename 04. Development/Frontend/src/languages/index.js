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
        Home: "Home",
        Transaction: "Transaction",
        Budget: "Budget",
        Statistic: "Statistic",
      },
    },
    VIE: {
      translation: {
        Home: "Trang chủ",
        Transaction: "Giao dịch",
        Budget: "Ngân sách",
        Statistic: "Thống kê",
      },
    },
  },
});

export default i18n;
