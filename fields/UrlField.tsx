import React from 'react';
import { AnchorHTMLAttributes, memo, FunctionComponent } from 'react';
import get from 'lodash/get';
import { sanitizeFieldRestProps } from './sanitizeFieldRestProps';
import { Typography, Link } from '@mui/material';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import { PublicFieldProps, InjectedFieldProps, fieldPropTypes } from './types';

export const UrlField: FunctionComponent<UrlFieldProps> = memo(props => {
  const { className, emptyText, source, ...rest } = props;
  const record = useRecordContext(props);
  const value = get(record, source);

  if (value == null) {
    return (
      <Typography
        component="span"
        variant="body2"
        className={className}
        {...sanitizeFieldRestProps(rest)}
      >
        {emptyText}
      </Typography>
    );
  }

  return (
    <Link
      className={className}
      href={value}
      variant="body2"
      {...sanitizeFieldRestProps(rest)}
    >
      {value}
    </Link>
  );
});

UrlField.propTypes = fieldPropTypes;
UrlField.displayName = 'UrlField';

export interface UrlFieldProps
  extends PublicFieldProps,
  InjectedFieldProps,
  AnchorHTMLAttributes<HTMLAnchorElement> { }
