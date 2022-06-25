import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';

import { extractValidSavedQueries, useSavedQueries } from './useSavedQueries';

export const AddSavedQueryDialog = ({
  open,
  onClose,
}: AddSavedQueryDialogProps): ReactElement => {
  const translate = useTranslate();
  const {
    resource,
    filterValues,
    displayedFilters,
    sort,
    perPage,
  } = useListContext();

  const [savedQueries, setSavedQueries] = useSavedQueries(resource);

  // input state
  const [queryName, setQueryName] = useState('');
  const handleQueryNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setQueryName(event.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addQuery();
  };

  const addQuery = (): void => {
    const newSavedQuery = {
      label: queryName,
      value: {
        filter: filterValues,
        sort,
        perPage,
        displayedFilters,
      },
    };
    const newSavedQueries = extractValidSavedQueries(savedQueries);
    setSavedQueries(newSavedQueries.concat(newSavedQuery));
    setQueryName('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {translate('saved_queries.new_dialog_title', {
          _: 'Save current query as',
        })}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            margin="dense"
            id="name"
            label={translate('saved_queries.query_name', {
              _: 'Query name',
            })}
            fullWidth
            value={queryName}
            onChange={handleQueryNameChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {translate('action.cancel')}
        </Button>
        <Button onClick={addQuery} color="primary">
          {translate('action.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface AddSavedQueryDialogProps {
  open: boolean;
  onClose: () => void;
}
