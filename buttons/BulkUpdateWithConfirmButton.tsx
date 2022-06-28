import ActionUpdate from '@mui/icons-material/Update';
import { alpha, styled } from '@mui/material/styles';
import { useResourceContext } from '@specfocus/view-focus/resources';
import { useRefresh } from '@specfocus/view-focus.data/providers/useRefresh';
import { useUpdateMany } from '@specfocus/view-focus.data/operations/update-many/useUpdateMany';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import { useUnselectAll } from '@specfocus/view-focus/lists/useUnselectAll';
import { useNotify } from '@specfocus/view-focus.notification/providers/useNotify';
import type { MutationMode } from '@specfocus/view-focus.data/operations/MutationMode';
import inflection from 'inflection';
import PropTypes from 'prop-types';
import React from 'react';
import { Fragment, ReactElement, useState } from 'react';
import { Confirm } from '../layouts';
import { BulkActionProps } from '../types';
import { Button, ButtonProps } from './Button';

export const BulkUpdateWithConfirmButton = (
  props: BulkUpdateWithConfirmButtonProps
) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const translate = useTranslate();
  const resource = useResourceContext(props);
  const unselectAll = useUnselectAll(resource);
  const [isOpen, setOpen] = useState(false);
  const { selectedIds } = useListContext(props);

  const {
    confirmTitle = 'message.bulk_update_title',
    confirmContent = 'message.bulk_update_content',
    data,
    icon = defaultIcon,
    label = 'action.update',
    mutationMode = 'pessimistic',
    onClick,
    onSuccess = () => {
      refresh();
      notify('notification.updated', {
        type: 'info',
        messageArgs: { smart_count: selectedIds.length },
      });
      unselectAll();
      setOpen(false);
    },
    onError = (error: Error | string) => {
      notify(
        typeof error === 'string'
          ? error
          : error.message || 'notification.http_error',
        {
          type: 'warning',
          messageArgs: {
            _:
              typeof error === 'string'
                ? error
                : error && error.message
                  ? error.message
                  : undefined,
          },
        }
      );
      setOpen(false);
    },
    ...rest
  } = props;

  const [updateMany, { isLoading }] = useUpdateMany(
    resource,
    { ids: selectedIds, data },
    {
      onSuccess,
      onError,
      mutationMode,
    }
  );

  const handleClick = e => {
    setOpen(true);
    e.stopPropagation();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleUpdate = e => {
    updateMany();

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <Fragment>
      <StyledButton
        onClick={handleClick}
        label={label}
        {...sanitizeRestProps(rest)}
      >
        {icon}
      </StyledButton>
      <Confirm
        isOpen={isOpen}
        loading={isLoading}
        title={confirmTitle}
        content={confirmContent}
        translateOptions={{
          smart_count: selectedIds.length,
          name: translate(`resources.${resource}.forcedCaseName`, {
            smart_count: selectedIds.length,
            _: inflection.humanize(
              translate(`resources.${resource}.name`, {
                smart_count: selectedIds.length,
                _: inflection.inflect(
                  resource,
                  selectedIds.length
                ),
              }),
              true
            ),
          }),
        }}
        onConfirm={handleUpdate}
        onClose={handleDialogClose}
      />
    </Fragment>
  );
};

const sanitizeRestProps = ({
  filterValues,
  label,
  onSuccess,
  onError,
  ...rest
}: Omit<
  BulkUpdateWithConfirmButtonProps,
  'resource' | 'selectedIds' | 'icon' | 'data'
>) => rest;

export interface BulkUpdateWithConfirmButtonProps
  extends BulkActionProps,
  ButtonProps {
  confirmContent?: React.ReactNode;
  confirmTitle?: string;
  icon?: ReactElement;
  data: any;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  mutationMode?: MutationMode;
}

BulkUpdateWithConfirmButton.propTypes = {
  confirmTitle: PropTypes.string,
  confirmContent: PropTypes.string,
  label: PropTypes.string,
  resource: PropTypes.string,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
  icon: PropTypes.element,
  data: PropTypes.any.isRequired,
  mutationMode: PropTypes.oneOf(['pessimistic', 'optimistic', 'undoable']),
};

const PREFIX = 'BulkUpdateWithConfirmButton';

const StyledButton = styled(Button, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    // Reset on mouse devices
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
}));

const defaultIcon = <ActionUpdate />;
