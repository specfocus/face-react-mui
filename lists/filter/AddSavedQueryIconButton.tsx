import React from 'react';
import { ReactElement, useState } from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';

import { AddSavedQueryDialog } from './AddSavedQueryDialog';

export const AddSavedQueryIconButton = (
  props: IconButtonProps
): ReactElement => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const translate = useTranslate();

  return (
    <>
      <IconButton
        aria-label={translate('saved_queries.new_label', {
          _: 'Save current query...',
        })}
        size="small"
        onClick={handleOpen}
        {...props}
      >
        <AddIcon />
      </IconButton>

      <AddSavedQueryDialog open={open} onClose={handleClose} />
    </>
  );
};
