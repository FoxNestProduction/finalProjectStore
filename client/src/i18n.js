import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nBackend from 'i18next-http-backend';

const getCurrentHost = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_URL
  : process.env.REACT_APP_URL_PROD;

const userLanguage = navigator.language.split('-')[0];
console.log(navigator.language);

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // мова, яка буде завантажена, якщо переклади, які шукає користувач, будуть недоступні
    // lng: 'en', // мова за замовчуванням
    lng: userLanguage, // за замовчуванням мова браузера
    interpolation: {
      escapeValue: false, // використовується для екранування значень і уникнення атак XSS
    },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    },
  });

export default i18n;
