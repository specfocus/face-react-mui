import { Link, LinkProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import get from 'lodash/get';
import { FunctionComponent, memo } from 'react';
import { sanitizeFieldRestProps } from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';

export const EmailField: FunctionComponent<EmailFieldProps> = memo(props => {
  const { className, source, emptyText, ...rest } = props;
  const record = useRecordContext(props);
  const value = get(record, source);

  if (value == null) {
    return emptyText ? (
      <Typography
        component="span"
        variant="body2"
        className={className}
        {...sanitizeFieldRestProps(rest)}
      >
        {emptyText}
      </Typography>
    ) : null;
  }

  return (
    <Link
      className={className}
      href={`mailto:${value}`}
      onClick={stopPropagation}
      variant="body2"
      {...sanitizeFieldRestProps(rest)}
    >
      {value}
    </Link>
  );
});

EmailField.propTypes = fieldPropTypes;
EmailField.displayName = 'EmailField';

export interface EmailFieldProps
  extends PublicFieldProps,
  InjectedFieldProps,
  Omit<LinkProps, 'textAlign'> { }

// useful to prevent click bubbling in a Datagrid with rowClick
const stopPropagation = e => e.stopPropagation();
