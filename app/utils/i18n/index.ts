import { initReactI18next } from 'react-i18next';
import i18n, { ResourceLanguage } from 'i18next';

import en from './translations/en.json';
import lt from './translations/lt.json';
import { DEFAULT_LANGUAGE } from '#utils/constants';

type Translations = { [key: string]: ResourceLanguage };

const translations: Translations = { en, lt };

const availableLanguages = Object.keys(translations);

let lng: string = DEFAULT_LANGUAGE;
if (!lng || !Object.prototype.hasOwnProperty.call(translations, lng)) {
  lng = DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources: translations,
  lng,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export { translations, availableLanguages };
