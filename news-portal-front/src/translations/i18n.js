import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS_EN } from "./en/translations.js";
import { TRANSLATIONS_RU } from "./ru/translations.js";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: TRANSLATIONS_EN
            },
            ru: {
                translation: TRANSLATIONS_RU
            }
        },
        fallbackLng: 'ru',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
