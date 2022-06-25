import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useInput } from '@specfocus/view-focus/forms/useInput';
import FieldTitle from '@specfocus/view-focus/utils/FieldTitle';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { CommonInputProps } from './CommonInputProps';
import { InputHelperText } from './InputHelperText';
import { InputPropTypes } from './InputPropTypes';
import { sanitizeInputRestProps } from './sanitizeInputRestProps';

export const BooleanInput = (props: BooleanInputProps) => {
  const {
    className,
    row = false,
    defaultValue = false,
    format,
    label,
    fullWidth,
    helperText,
    onBlur,
    onChange,
    onFocus,
    disabled,
    parse,
    resource,
    source,
    validate,
    options,
    sx,
    ...rest
  } = props;
  const {
    id,
    field,
    isRequired,
    fieldState: { error, invalid, isTouched },
    formState: { isSubmitted },
  } = useInput({
    defaultValue,
    format,
    parse,
    resource,
    source,
    onBlur,
    onChange,
    type: 'checkbox',
    validate,
    ...rest,
  });

  const handleChange = useCallback(
    event => {
      field.onChange(event);
      // Ensure field is considered as touched
      field.onBlur();
    },
    [field]
  );

  return (
    <FormGroup
      className={clsx('input', `ra-input-${source}`, className)}
      row={row}
      sx={sx}
    >
      <FormControlLabel
        control={
          <Switch
            id={id}
            name={field.name}
            color="primary"
            onChange={handleChange}
            onFocus={onFocus}
            checked={field.value}
            {...sanitizeInputRestProps(rest)}
            {...options}
            disabled={disabled}
          />
        }
        label={
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        }
      />
      <FormHelperText error={(isTouched || isSubmitted) && invalid}>
        <InputHelperText
          touched={isTouched || isSubmitted}
          error={error?.message}
          helperText={helperText}
        />
      </FormHelperText>
    </FormGroup>
  );
};

BooleanInput.propTypes = {
  ...InputPropTypes,
  // @ts-ignore
  options: PropTypes.shape(Switch.propTypes),
  disabled: PropTypes.bool,
};

BooleanInput.defaultProps = {
  options: {},
};

export type BooleanInputProps = CommonInputProps &
  SwitchProps &
  Omit<FormGroupProps, 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus'> & {
    options: SwitchProps;
  };
