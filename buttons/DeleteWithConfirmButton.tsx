import ActionDelete from '@mui/icons-material/Delete';
import { alpha, styled } from '@mui/material/styles';
import useDeleteWithConfirmController from '@specfocus/view-focus/buttons/useDeleteWithConfirmController';
import { useResourceContext } from '@specfocus/view-focus/resources';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import { RedirectionSideEffect } from '@specfocus/view-focus.navigation/routes/useRedirect';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import clsx from 'clsx';
import inflection from 'inflection';
import PropTypes from 'prop-types';
import React, { Fragment, ReactElement, ReactEventHandler } from 'react';
import { UseMutationOptions } from 'react-query';
import { Confirm } from '../layouts';
import { Button, ButtonProps } from './Button';
import { MutationMode } from '@specfocus/view-focus.data/operations/MutationMode';
import { DeleteParams } from '@specfocus/view-focus.data/operations/delete';

export const DeleteWithConfirmButton = <RecordType extends Entity = any>(
  props: DeleteWithConfirmButtonProps<RecordType>
) => {
  const {
    className,
    confirmTitle = 'message.delete_title',
    confirmContent = 'message.delete_content',
    icon = defaultIcon,
    label = 'action.delete',
    mutationMode = 'pessimistic',
    onClick,
    redirect = 'list',
    translateOptions = {},
    mutationOptions,
    ...rest
  } = props;
  const translate = useTranslate();
  const record = useRecordContext(props);
  const resource = useResourceContext(props);

  const {
    open,
    isLoading,
    handleDialogOpen,
    handleDialogClose,
    handleDelete,
  } = useDeleteWithConfirmController({
    record,
    redirect,
    mutationMode,
    onClick,
    mutationOptions,
    resource,
  });

  return (
    <Fragment>
      <StyledButton
        onClick={handleDialogOpen}
        label={label}
        className={clsx('delete-button', className)}
        key="button"
        {...rest}
      >
        {icon}
      </StyledButton>
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={confirmTitle}
        content={confirmContent}
        translateOptions={{
          name: translate(`resources.${resource}.forcedCaseName`, {
            smart_count: 1,
            _: inflection.humanize(
              translate(`resources.${resource}.name`, {
                smart_count: 1,
                _: inflection.singularize(resource),
              }),
              true
            ),
          }),
          id: record.id,
          ...translateOptions,
        }}
        onConfirm={handleDelete}
        onClose={handleDialogClose}
      />
    </Fragment>
  );
};

const defaultIcon = <ActionDelete />;

export interface DeleteWithConfirmButtonProps<
  RecordType extends Entity = any,
  MutationOptionsError = unknown
> extends ButtonProps {
  confirmTitle?: string;
  confirmContent?: React.ReactNode;
  icon?: ReactElement;
  mutationMode?: MutationMode;
  onClick?: ReactEventHandler<any>;
  // May be injected by Toolbar - sanitized in Button
  translateOptions?: object;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    DeleteParams<RecordType>
  >;
  record?: RecordType;
  redirect?: RedirectionSideEffect;
  resource?: string;
}

DeleteWithConfirmButton.propTypes = {
  className: PropTypes.string,
  confirmTitle: PropTypes.string,
  confirmContent: PropTypes.string,
  label: PropTypes.string,
  mutationMode: PropTypes.oneOf(['pessimistic', 'optimistic', 'undoable']),
  record: PropTypes.any,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  resource: PropTypes.string,
  icon: PropTypes.element,
  translateOptions: PropTypes.object,
};

const PREFIX = 'DeleteWithConfirmButton';

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
