import ActionDelete from '@mui/icons-material/Delete';
import { alpha, styled } from '@mui/material/styles';
import { useResourceContext } from '@specfocus/view-focus/resources/useResourceContext';
import { useDeleteMany } from '@specfocus/view-focus.data/operations/delete-many/useDeleteMany';
import { useRefresh } from '@specfocus/view-focus.data/providers/useRefresh';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useListContext, useUnselectAll } from '@specfocus/view-focus/lists';
import { useNotify } from '@specfocus/view-focus.notification/providers/useNotify';
import type { MutationMode } from '@specfocus/view-focus.data/operations/MutationMode';
import { useSafeSetState } from '@specfocus/view-focus.states/states/useSafeSetState';
import inflection from 'inflection';
import PropTypes from 'prop-types';
import React from 'react';
import { Fragment, ReactElement } from 'react';

import { Confirm } from '../layouts';
import { BulkActionProps } from '../types';
import { Button, ButtonProps } from './Button';

export const BulkDeleteWithConfirmButton = (
  props: BulkDeleteWithConfirmButtonProps
) => {
  const {
    confirmTitle = 'message.bulk_delete_title',
    confirmContent = 'message.bulk_delete_content',
    icon = defaultIcon,
    label = 'action.delete',
    mutationMode = 'pessimistic',
    onClick,
    ...rest
  } = props;
  const { selectedIds } = useListContext(props);
  const [isOpen, setOpen] = useSafeSetState(false);
  const notify = useNotify();
  const resource = useResourceContext(props);
  const unselectAll = useUnselectAll(resource);
  const refresh = useRefresh();
  const translate = useTranslate();
  const [deleteMany, { isLoading }] = useDeleteMany(
    resource,
    { ids: selectedIds },
    {
      onSuccess: () => {
        refresh();
        notify('notification.deleted', {
          type: 'info',
          messageArgs: { smart_count: selectedIds.length },
        });
        unselectAll();
        setOpen(false);
      },
      onError: (error: Error) => {
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

  const handleDelete = e => {
    deleteMany();

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
        onConfirm={handleDelete}
        onClose={handleDialogClose}
      />
    </Fragment>
  );
};

const sanitizeRestProps = ({
  classes,
  filterValues,
  label,
  selectedIds,
  ...rest
}: Omit<
  BulkDeleteWithConfirmButtonProps,
  'resource' | 'icon' | 'mutationMode'
>) => rest;

export interface BulkDeleteWithConfirmButtonProps
  extends BulkActionProps,
  ButtonProps {
  confirmContent?: React.ReactNode;
  confirmTitle?: string;
  icon?: ReactElement;
  mutationMode: MutationMode;
}

const PREFIX = 'BulkDeleteWithConfirmButton';

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

const defaultIcon = <ActionDelete />;

BulkDeleteWithConfirmButton.propTypes = {
  confirmTitle: PropTypes.string,
  confirmContent: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.string,
  mutationMode: PropTypes.oneOf(['pessimistic', 'optimistic', 'undoable']),
  resource: PropTypes.string,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
};
