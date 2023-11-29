import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nBackend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// const getCurrentHost = import.meta.env.MODE === 'development'
//   ? 'http://localhost:5173'
//   : 'LINK TO PROD';

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'ua',
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   // loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    //   loadPath: 'http://localhost:5173/i18n/{{lng}}.json',
    // },
    resources: {
      en: {
        translation: {
          menu: 'Menu',
          restaurants: 'Restaurants',
          reviews: 'Reviews',
          contact: 'Contact',
        },
      },
      ua: {
        translation: {
          menu: 'Меню',
          restaurants: 'Ресторани',
          reviews: 'Відгуки',
          contact: 'Контакт',
        },
      },
    },
  });

export default i18n;
