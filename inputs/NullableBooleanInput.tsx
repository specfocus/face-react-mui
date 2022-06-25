import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useInput } from '@specfocus/view-focus/forms/useInput';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import { FieldTitle } from '@specfocus/view-focus/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CommonInputProps } from './CommonInputProps';
import { InputHelperText } from './InputHelperText';
import { sanitizeInputRestProps } from './sanitizeInputRestProps';

export const NullableBooleanInput = (props: NullableBooleanInputProps) => {
  const {
    className,
    format = getStringFromBoolean,
    helperText,
    label,
    margin,
    onBlur,
    onChange,
    parse = getBooleanFromString,
    resource,
    source,
    validate,
    variant,
    nullLabel = 'boolean.null',
    falseLabel = 'boolean.false',
    trueLabel = 'boolean.true',
    ...rest
  } = props;

  const translate = useTranslate();

  const {
    field,
    fieldState: { error, invalid, isTouched },
    formState: { isSubmitted },
    id,
    isRequired,
  } = useInput({
    format,
    parse,
    onBlur,
    onChange,
    resource,
    source,
    validate,
    ...rest,
  });

  return (
    <StyledTextField
      id={id}
      size="small"
      {...field}
      className={clsx(
        'ra-input',
        `ra-input-${source}`,
        NullableBooleanInputClasses.input,
        className
      )}
      select
      margin={margin}
      label={
        <FieldTitle
          label={label}
          source={source}
          resource={resource}
          isRequired={isRequired}
        />
      }
      error={(isTouched || isSubmitted) && invalid}
      helperText={
        <InputHelperText
          touched={isTouched || isSubmitted}
          error={error?.message}
          helperText={helperText}
        />
      }
      variant={variant}
      {...sanitizeInputRestProps(rest)}
    >
      <MenuItem value="">{translate(nullLabel)}</MenuItem>
      <MenuItem value="false">{translate(falseLabel)}</MenuItem>
      <MenuItem value="true">{translate(trueLabel)}</MenuItem>
    </StyledTextField>
  );
};

NullableBooleanInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  nullLabel: PropTypes.string,
  falseLabel: PropTypes.string,
  trueLabel: PropTypes.string,
};

const PREFIX = 'RaNullableBooleanInput';

export const NullableBooleanInputClasses = {
  input: `${PREFIX}-input`,
};

const StyledTextField = styled(TextField, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme, fullWidth }) => ({
  [`&.${NullableBooleanInputClasses.input}`]: {
    width: fullWidth ? '100%' : theme.spacing(16),
  },
}));

const getBooleanFromString = (value: string): boolean | null => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
};

const getStringFromBoolean = (value?: boolean | null): string => {
  if (value === true) return 'true';
  if (value === false) return 'false';
  return '';
};

export type NullableBooleanInputProps = CommonInputProps &
  Omit<TextFieldProps, 'label' | 'helperText'> & {
    nullLabel?: string;
    falseLabel?: string;
    trueLabel?: string;
  };
