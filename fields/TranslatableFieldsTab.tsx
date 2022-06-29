import React from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { capitalize } from 'inflection';

/**
 * Single tab that selects a locale in a TranslatableFields component.
 * @see TranslatableFields
 */
export const TranslatableFieldsTab = (
  props: TranslatableFieldsTabProps & TabProps
) => {
  const { locale, groupKey = '', ...rest } = props;
  const translate = useTranslate();

  return (
    <Tab
      id={`translatable-header-${groupKey}${locale}`}
      label={translate(`locales.${groupKey}${locale}`, {
        _: capitalize(locale),
      })}
      {...rest}
    />
  );
};

export interface TranslatableFieldsTabProps {
  locale: string;
  groupKey?: string;
}
