import defaultMessages from '@specfocus/locales/en/general';
import { provideTranslationContextValue } from '@specfocus/view-focus.i18next/translations/provideTranslationContextValue';

export const defaultTranslationProvider = provideTranslationContextValue(
  () => defaultMessages,
  'en'
);
