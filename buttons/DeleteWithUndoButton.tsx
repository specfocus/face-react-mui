import ActionDelete from '@mui/icons-material/Delete';
import { alpha, styled } from '@mui/material/styles';
import useDeleteWithUndoController from '@specfocus/view-focus/buttons/useDeleteWithUndoController';
import { useResourceContext } from '@specfocus/view-focus/resources';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import { RedirectionSideEffect } from '@specfocus/view-focus.navigation/routes/useRedirect';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ReactElement, ReactEventHandler } from 'react';
import { UseMutationOptions } from 'react-query';

import { Button, ButtonProps } from './Button';
import { DeleteParams } from '@specfocus/view-focus.data/operations/delete';

export const DeleteWithUndoButton = <RecordType extends Entity = any>(
  props: DeleteWithUndoButtonProps<RecordType>
) => {
  const {
    label = 'action.delete',
    className,
    icon = defaultIcon,
    onClick,
    redirect = 'list',
    mutationOptions,
    ...rest
  } = props;

  const record = useRecordContext(props);
  const resource = useResourceContext(props);
  const { isLoading, handleDelete } = useDeleteWithUndoController({
    record,
    resource,
    redirect,
    onClick,
    mutationOptions,
  });

  return (
    <StyledButton
      onClick={handleDelete}
      disabled={isLoading}
      label={label}
      className={clsx('delete-button', className)}
      key="button"
      {...rest}
    >
      {icon}
    </StyledButton>
  );
};

const defaultIcon = <ActionDelete />;

export interface DeleteWithUndoButtonProps<
  RecordType extends Entity = any,
  MutationOptionsError = unknown
> extends ButtonProps {
  icon?: ReactElement;
  onClick?: ReactEventHandler<any>;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    DeleteParams<RecordType>
  >;
  record?: RecordType;
  redirect?: RedirectionSideEffect;
  resource?: string;
}

DeleteWithUndoButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  record: PropTypes.any,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  resource: PropTypes.string,
  icon: PropTypes.element,
};

const PREFIX = 'DeleteWithUndoButton';

const StyledButton = styled(Button, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  color: theme.palette.error.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.12),
    // Reset on mouse devices
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
}));
