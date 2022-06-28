import defaultMessages from '@specfocus/locales/en/general';
import createTranslationProvider from '@specfocus/view-focus.i18next/translations';

export const defaultI18nProvider = createTranslationProvider(
  () => defaultMessages,
  'en'
);
