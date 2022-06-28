import ContentSave from '@mui/icons-material/Save';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import warning from '@specfocus/spec-focus/rules/warning';
import { CreateParams } from '@specfocus/view-focus.data/operations/create';
import { UpdateParams } from '@specfocus/view-focus.data/operations/update';
import { TransformData } from '@specfocus/view-focus.data/providers/DataProvider';
import { setSubmissionErrors } from '@specfocus/view-focus.forms/forms/setSubmissionErrors';
import { useFormContext } from '@specfocus/view-focus.forms/forms/useFormContext';
import { useFormState } from '@specfocus/view-focus.forms/forms/useFormState';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useSaveContext } from '@specfocus/view-focus/mutations/useSaveContext';
import PropTypes from 'prop-types';
import { MouseEventHandler, ReactElement, useCallback } from 'react';
import { UseMutationOptions } from 'react-query';

/**
 * Submit button for resource forms (Edit and Create).
 *
 * @typedef {Object} Props the props you can use (other props are injected by the <Toolbar>)
 * @prop {string} className
 * @prop {string} label Button label. Defaults to 'action.save', translated.
 * @prop {boolean} disabled Disable the button.
 * @prop {string} variant MUI variant for the button. Defaults to 'contained'.
 * @prop {ReactElement} icon
 * @prop {function} mutationOptions Object of options passed to react-query.
 * @prop {function} transform Callback to execute before calling the dataProvider. Receives the data from the form, must return that transformed data. Can be asynchronous (and return a Promise)
 * @prop {boolean} alwaysEnable Force enabling the <SaveButton>. If it's not defined, the `<SaveButton>` will be enabled using `react-hook-form`'s `isValidating` state props and form context's `saving` prop (disabled if isValidating or saving, enabled otherwise).
 *
 * @param {Props} props
 *
 * @example // with custom success side effect
 *
 * const MySaveButton = props => {
 *     const notify = useNotify();
 *     const redirect = useRedirect();
 *     const onSuccess = (response) => {
 *         notify(`Post "${response.data.title}" saved!`);
 *         redirect('/posts');
 *     };
 *     return <SaveButton {...props} mutationOptions={{ onSuccess }} />;
 * }
 */
export const SaveButton = <RecordType extends Entity = any>(
  props: SaveButtonProps<RecordType>
) => {
  const {
    color = 'primary',
    icon = defaultIcon,
    invalid,
    label = 'action.save',
    onClick,
    mutationOptions,
    saving,
    disabled: disabledProp,
    type = 'submit',
    transform,
    variant = 'contained',
    alwaysEnable = false,
    ...rest
  } = props;
  const translate = useTranslate();
  const form = useFormContext();
  const saveContext = useSaveContext();
  const { isDirty, isValidating } = useFormState();
  // Use form isDirty, isValidating and form context saving to enable or disable the save button
  // if alwaysEnable is undefined
  const disabled = valueOrDefault(
    alwaysEnable === false || alwaysEnable === undefined
      ? undefined
      : !alwaysEnable,
    disabledProp || !isDirty || isValidating || saveContext?.saving
  );

  warning(
    type === 'submit' &&
    ((mutationOptions &&
      (mutationOptions.onSuccess || mutationOptions.onError)) ||
      transform),
    'Cannot use <SaveButton mutationOptions> props on a button of type "submit". To override the default mutation options on a particular save button, set the <SaveButton type="button"> prop, or set mutationOptions in the main view component (<Create> or <Edit>).'
  );

  const handleSubmit = useCallback(
    async values => {
      let errors;
      if (saveContext?.save) {
        errors = await saveContext.save(values, {
          ...mutationOptions,
          transform,
        });
      }
      if (errors != null) {
        setSubmissionErrors(errors, form.setError);
      }
    },
    [form.setError, saveContext, mutationOptions, transform]
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async event => {
      if (onClick) {
        onClick(event);
      }
      if (event.defaultPrevented) {
        return;
      }
      if (type === 'button') {
        // this button doesn't submit the form, so it doesn't trigger useIsFormInvalid in <FormContent>
        // therefore we need to check for errors manually
        event.stopPropagation();
        await form.handleSubmit(handleSubmit)(event);
      }
    },
    [onClick, type, form, handleSubmit]
  );

  const displayedLabel = label && translate(label, { _: label });
  const finalSaving =
    typeof saving !== 'undefined' ? saving : saveContext?.saving;

  return (
    <StyledButton
      variant={variant}
      type={type}
      color={color}
      aria-label={displayedLabel}
      disabled={disabled}
      onClick={handleClick}
      // TODO: find a way to display the loading state (LoadingButton from mui Lab?)
      {...rest}
    >
      {finalSaving ? <CircularProgress size={18} thickness={2} /> : icon}
      {displayedLabel}
    </StyledButton>
  );
};

const defaultIcon = <ContentSave />;

interface Props<
  RecordType extends Entity = any,
  MutationOptionsError = unknown
> {
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  invalid?: boolean;
  label?: string;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    CreateParams<RecordType> | UpdateParams<RecordType>
  >;
  transform?: TransformData;
  saving?: boolean;
  variant?: string;
}

export type SaveButtonProps<RecordType extends Entity = any> = Props<
  RecordType
> &
  ButtonProps & {
    alwaysEnable?: boolean;
  };

SaveButton.propTypes = {
  className: PropTypes.string,
  invalid: PropTypes.bool,
  label: PropTypes.string,
  saving: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  icon: PropTypes.element,
  alwaysEnable: PropTypes.bool,
};

const PREFIX = 'SaveButton';

const StyledButton = styled(Button, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  position: 'relative',
  [`& .MuiSvgIcon-root, & .MuiIcon-root, & .MuiCircularProgress-root`]: {
    marginRight: theme.spacing(1),
  },
  [`& .MuiSvgIcon-root, & .MuiIcon-root`]: {
    fontSize: 18,
  },
}));

const valueOrDefault = (value, defaultValue) =>
  typeof value === 'undefined' ? defaultValue : value;
