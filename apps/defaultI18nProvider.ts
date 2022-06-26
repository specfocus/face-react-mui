import defaultMessages from '@specfocus/locales/en/general';
import createI18nProvider from '@specfocus/view-focus.i18next/providers';

export const defaultI18nProvider = createI18nProvider(
  () => defaultMessages,
  'en'
);
