import React from 'react';
import { memo } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';

export const PaginationLimit = memo(() => {
  const translate = useTranslate();
  return (
    <CardContent>
      <Typography variant="body2">
        {translate('navigation.no_results')}
      </Typography>
    </CardContent>
  );
});
