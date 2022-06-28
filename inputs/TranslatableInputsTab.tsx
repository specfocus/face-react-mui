import { styled } from '@mui/material/styles';
import Tab, { TabProps } from '@mui/material/Tab';
import { useFormGroup } from '@specfocus/view-focus.forms/forms/useFormGroup';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import clsx from 'clsx';
import { capitalize } from 'inflection';

/**
 * Single tab that selects a locale in a TranslatableInputs component.
 * @see TranslatableInputs
 */
export const TranslatableInputsTab = (
  props: TranslatableInputsTabProps & TabProps
) => {
  const { groupKey = '', locale, ...rest } = props;
  const { isValid, isTouched } = useFormGroup(`${groupKey}${locale}`);
  const translate = useTranslate();

  return (
    <StyledTab
      id={`translatable-header-${groupKey}${locale}`}
      label={translate(`ra.locales.${locale}`, {
        _: capitalize(locale),
      })}
      className={clsx(TranslatableInputsTabClasses.root, {
        [TranslatableInputsTabClasses.error]: !isValid && isTouched,
      })}
      {...rest}
    />
  );
};

export interface TranslatableInputsTabProps {
  groupKey?: string;
  locale: string;
}

const PREFIX = 'TranslatableInputsTab';

export const TranslatableInputsTabClasses = {
  root: `${PREFIX}-root`,
  error: `${PREFIX}-error`,
};

const StyledTab = styled(Tab, { name: PREFIX })(({ theme }) => ({
  [`&.${TranslatableInputsTabClasses.root}`]: {
    fontSize: '0.8em',
    minHeight: theme.spacing(3),
    minWidth: theme.spacing(6),
  },

  [`&.${TranslatableInputsTabClasses.error}`]: {
    color: theme.palette.error.main,
  },
}));
