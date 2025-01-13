import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en_US from './locales/en-US.json';
import zh_CN from './locales/zh-CN.json';

const resources = {
  'en-US': {
    translation: en_US,
  },
  'zh-CN': {
    translation: zh_CN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  // {"isRTL":false,"languageTag":"zh-CN","countryCode":"CN","languageCode":"zh"}
  lng: RNLocalize.getLocales()[0].languageTag,
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
