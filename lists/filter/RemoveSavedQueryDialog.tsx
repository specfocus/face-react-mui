import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import isEqual from 'lodash/isEqual';
import { ReactElement } from 'react';

import { extractValidSavedQueries, useSavedQueries } from './useSavedQueries';

export interface RemoveSavedQueryDialogProps {
  open: boolean;
  onClose: () => void;
}

export const RemoveSavedQueryDialog = ({
  open,
  onClose,
}: RemoveSavedQueryDialogProps): ReactElement => {
  const translate = useTranslate();
  const {
    resource,
    filterValues,
    sort,
    perPage,
    displayedFilters,
  } = useListContext();

  const [savedQueries, setSavedQueries] = useSavedQueries(resource);

  const removeQuery = (): void => {
    let savedQueryToRemove = {
      filter: filterValues,
      sort,
      perPage,
      displayedFilters,
    };

    const newSavedQueries = extractValidSavedQueries(savedQueries);
    const index = newSavedQueries.findIndex(savedFilter =>
      isEqual(savedFilter.value, savedQueryToRemove)
    );
    setSavedQueries([
      ...newSavedQueries.slice(0, index),
      ...newSavedQueries.slice(index + 1),
    ]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {translate('saved_queries.remove_dialog_title', {
          _: 'Remove saved query?',
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {translate('saved_queries.remove_message', {
            _:
              'Are you sure you want to remove that item from your list of saved queries?',
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {translate('action.cancel')}
        </Button>
        <Button
          onClick={removeQuery}
          color="primary"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        >
          {translate('action.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
