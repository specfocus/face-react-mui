import defaultMessages from '@specfocus/locales/en/general';
import { useTranslator } from '@specfocus/view-focus.i18next/translations/useTranslator';

export const defaultTranslator = useTranslator(
  'en',
  () => defaultMessages
);
