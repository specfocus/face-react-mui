import defaultMessages from '@specfocus/locales/en/core';
import createI18nProvider from '@specfocus/view-focus.i18next/providers';

export const defaultI18nProvider = createI18nProvider(
  () => defaultMessages,
  'en'
);
