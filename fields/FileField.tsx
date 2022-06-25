import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Typography from '@mui/material/Typography';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';

import { sanitizeFieldRestProps } from './sanitizeFieldRestProps';
import { PublicFieldProps, InjectedFieldProps, fieldPropTypes } from './types';
import { SxProps } from '@mui/system';
import { Link } from '@mui/material';

/**
 * Render a link to a file based on a path contained in a record field
 *
 * @example
 * import { FileField } from '@specfocus/view-focus.mui-demo';
 *
 * <FileField source="url" title="title" />
 *
 * // renders the record { id: 123, url: 'doc.pdf', title: 'Presentation' } as
 * <div>
 *     <a href="doc.pdf" title="Presentation">Presentation</a>
 * </div>
 */
export const FileField = (props: FileFieldProps) => {
  const {
    className,
    emptyText,
    source,
    title,
    src,
    target,
    download,
    ping,
    rel,
    ...rest
  } = props;
  const record = useRecordContext(props);
  const sourceValue = get(record, source);

  if (!sourceValue) {
    return emptyText ? (
      <Typography
        component="span"
        variant="body2"
        className={className}
        {...sanitizeFieldRestProps(rest)}
      >
        {emptyText}
      </Typography>
    ) : (
      <Root className={className} {...sanitizeFieldRestProps(rest)} />
    );
  }

  if (Array.isArray(sourceValue)) {
    return (
      <StyledList className={className} {...sanitizeFieldRestProps(rest)}>
        {sourceValue.map((file, index) => {
          const fileTitleValue = get(file, title) || title;
          const srcValue = get(file, src) || title;

          return (
            <li key={index}>
              <Link
                href={srcValue}
                title={fileTitleValue}
                target={target}
                download={download}
                ping={ping}
                rel={rel}
                variant="body2"
              >
                {fileTitleValue}
              </Link>
            </li>
          );
        })}
      </StyledList>
    );
  }

  const titleValue = get(record, title) || title;

  return (
    <Root className={className} {...sanitizeFieldRestProps(rest)}>
      <Link
        href={sourceValue}
        title={titleValue}
        target={target}
        download={download}
        ping={ping}
        rel={rel}
        variant="body2"
      >
        {titleValue}
      </Link>
    </Root>
  );
};

export interface FileFieldProps extends PublicFieldProps, InjectedFieldProps {
  src?: string;
  title?: string;
  target?: string;
  download?: boolean | string;
  ping?: string;
  rel?: string;
  sx?: SxProps;
}

FileField.propTypes = {
  ...fieldPropTypes,
  src: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ping: PropTypes.string,
  rel: PropTypes.string,
};

const PREFIX = 'RaFileField';

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})({
  display: 'inline-block',
});

const StyledList = styled('ul')({
  display: 'inline-block',
});
