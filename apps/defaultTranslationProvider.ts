import defaultMessages from '@specfocus/locales/en/general';
import { createTranslationProvider } from '@specfocus/view-focus.i18next/translations/createTranslationProvider';

export const defaultTranslationProvider = createTranslationProvider(
  () => defaultMessages,
  'en'
);
