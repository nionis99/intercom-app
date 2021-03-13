import { initReactI18next } from "react-i18next";
import i18n, { ResourceLanguage } from "i18next";
import en from "./translations/en.json";
import lt from "./translations/lt.json";
import ru from "./translations/ru.json";

type Translations = { [key: string]: ResourceLanguage };

const translations: Translations = { en, lt, ru };

const availableLanguages = Object.keys(translations);

let lng = "en";
if (!lng || !Object.prototype.hasOwnProperty.call(translations, lng)) {
  lng = "en";
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
