import ActionUpdate from '@mui/icons-material/Update';
import { alpha, styled } from '@mui/material/styles';
import { useResourceContext } from '@specfocus/view-focus/core/useResourceContext';
import { useRefresh } from '@specfocus/view-focus.data/providers/useRefresh';
import { useUpdateMany } from '@specfocus/view-focus.data/operations/update-many/useUpdateMany';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import { useUnselectAll } from '@specfocus/view-focus/lists/useUnselectAll';
import { useNotify } from '@specfocus/view-focus.notification/providers/useNotify';
import PropTypes from 'prop-types';
import { ReactElement } from 'react';

import { BulkActionProps } from '../types';
import { Button, ButtonProps } from './Button';

export const BulkUpdateWithUndoButton = (
  props: BulkUpdateWithUndoButtonProps
) => {
  const { selectedIds } = useListContext(props);

  const notify = useNotify();
  const resource = useResourceContext(props);
  const unselectAll = useUnselectAll(resource);
  const refresh = useRefresh();

  const {
    data,
    label = 'action.update',
    icon = defaultIcon,
    onClick,
    onSuccess = () => {
      notify('notification.updated', {
        type: 'info',
        messageArgs: { smart_count: selectedIds.length },
        undoable: true,
      });
      unselectAll();
      refresh();
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
      refresh();
    },
    ...rest
  } = props;

  const [updateMany, { isLoading }] = useUpdateMany(
    resource,
    { ids: selectedIds, data },
    {
      onSuccess,
      onError,
      mutationMode: 'undoable',
    }
  );

  const handleClick = e => {
    updateMany();
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <StyledButton
      onClick={handleClick}
      label={label}
      disabled={isLoading}
      {...sanitizeRestProps(rest)}
    >
      {icon}
    </StyledButton>
  );
};

const defaultIcon = <ActionUpdate />;

const sanitizeRestProps = ({
  filterValues,
  label,
  selectedIds,
  onSuccess,
  onError,
  ...rest
}: Omit<BulkUpdateWithUndoButtonProps, 'resource' | 'icon' | 'data'>) => rest;

export interface BulkUpdateWithUndoButtonProps
  extends BulkActionProps,
  ButtonProps {
  icon?: ReactElement;
  data: any;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

BulkUpdateWithUndoButton.propTypes = {
  label: PropTypes.string,
  resource: PropTypes.string,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
  icon: PropTypes.element,
  data: PropTypes.any.isRequired,
};

const PREFIX = 'BulkUpdateWithUndoButton';

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
