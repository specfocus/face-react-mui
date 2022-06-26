import { styled } from '@mui/material/styles';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import { FormGroupContextProvider } from '@specfocus/view-focus.forms/forms/FormGroupContextProvider';
import { useTranslatableContext } from '@specfocus/view-focus.i18n/i18n/useTranslatableContext';
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode
} from 'react';

/**
 * Default container for a group of translatable inputs inside a TranslatableInputs component.
 * @see TranslatableInputs
 */
export const TranslatableInputsTabContent = (
  props: TranslatableInputsTabContentProps
): ReactElement => {
  const {
    children,
    groupKey = '',
    locale,
    margin,
    variant,
    ...other
  } = props;
  const { selectedLocale, getLabel, getSource } = useTranslatableContext();

  return (
    <FormGroupContextProvider name={`${groupKey}${locale}`}>
      <Root
        role="tabpanel"
        hidden={selectedLocale !== locale}
        id={`translatable-content-${groupKey}${locale}`}
        aria-labelledby={`translatable-header-${groupKey}${locale}`}
        className={TranslatableInputsTabContentClasses.root}
        {...other}
      >
        {Children.map(children, child =>
          isValidElement(child)
            ? cloneElement(child, {
              ...child.props,
              label: getLabel(
                child.props.source,
                child.props.label
              ),
              source: getSource(child.props.source, locale),
            })
            : null
        )}
      </Root>
    </FormGroupContextProvider>
  );
};

export type TranslatableInputsTabContentProps<
  RecordType extends Entity | Omit<Entity, 'id'> = any
> = {
  children: ReactNode;
  groupKey?: string;
  locale: string;
  record?: RecordType;
  resource?: string;
  margin?: 'none' | 'normal' | 'dense';
  variant?: 'standard' | 'outlined' | 'filled';
};

const PREFIX = 'TranslatableInputsTabContent';

export const TranslatableInputsTabContentClasses = {
  root: `${PREFIX}-root`,
};

const Root = styled('div', { name: PREFIX })(({ theme }) => ({
  [`&.${TranslatableInputsTabContentClasses.root}`]: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 0,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 0,
  },
}));
