import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ResponsiveStyleValue, SxProps } from '@mui/system';
import { OptionalRecordContextProvider } from '@specfocus/view-focus/records/OptionalRecordContextProvider';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Children, isValidElement, ReactNode } from 'react';
import { Labeled } from '../apps/Labeled';

/**
 * Layout for a Show view showing fields in one column.
 *
 * It pulls the record from the RecordContext. It renders the record fields in
 * a single-column layout (via MUI's `<Stack>` component).
 * `<SimpleShowLayout>` delegates the actual rendering of fields to its children.
 * It wraps each field inside a `<Labeled>` component to add a label.
 *
 * @example
 * // in src/posts.js
 * import React from "react";
 * import { Show, SimpleShowLayout, TextField } from '@specfocus/view-focus.mui-demo';
 *
 * export const PostShow = () => (
 *     <Show>
 *         <SimpleShowLayout>
 *             <TextField source="title" />
 *         </SimpleShowLayout>
 *     </Show>
 * );
 *
 * // in src/App.js
 * import React from "react";
 * import { BaseRoot, Resource } from '@specfocus/view-focus.mui-demo';
 *
 * import { PostShow } from './posts';
 *
 * const App = () => (
 *     <BaseRoot dataProvider={...}>
 *         <Resource name="posts" show={PostShow} />
 *     </BaseRoot>
 * );
 *
 * @param {SimpleShowLayoutProps} props
 * @param {string} props.className A className to apply to the page content.
 * @param {ElementType} props.component The component to use as root component (div by default).
 * @param {ReactNode} props.divider An optional divider between each field, passed to `<Stack>`.
 * @param {number} props.spacing The spacing to use between each field, passed to `<Stack>`. Defaults to 1.
 * @param {Object} props.sx Custom style object.
 */
export const SimpleShowLayout = (props: SimpleShowLayoutProps) => {
  const { className, children, divider, spacing = 1, ...rest } = props;
  const record = useRecordContext(props);
  if (!record) {
    return null;
  }
  return (
    <OptionalRecordContextProvider value={props.record}>
      <Root className={className} {...sanitizeRestProps(rest)}>
        <Stack
          spacing={spacing}
          divider={divider}
          className={SimpleShowLayoutClasses.stack}
        >
          {Children.map(children, field =>
            field && isValidElement<any>(field) ? (
              <Labeled
                key={field.props.source}
                className={clsx(
                  'ra-field',
                  field.props.source &&
                  `ra-field-${field.props.source}`,
                  SimpleShowLayoutClasses.row,
                  field.props.className
                )}
              >
                {field}
              </Labeled>
            ) : null
          )}
        </Stack>
      </Root>
    </OptionalRecordContextProvider>
  );
};

export interface SimpleShowLayoutProps {
  children: ReactNode;
  className?: string;
  divider?: ReactNode;
  record?: Entity;
  spacing?: ResponsiveStyleValue<number | string>;
  sx?: SxProps;
}

SimpleShowLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  record: PropTypes.object,
  spacing: PropTypes.any,
  sx: PropTypes.any,
};

const PREFIX = 'SimpleShowLayout';

export const SimpleShowLayoutClasses = {
  stack: `${PREFIX}-stack`,
  row: `${PREFIX}-row`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  flex: 1,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  [`& .${SimpleShowLayoutClasses.stack}`]: {},
  [`& .${SimpleShowLayoutClasses.row}`]: {
    display: 'inline',
  },
}));

const sanitizeRestProps = ({
  record,
  resource,
  initialValues,
  translate,
  ...rest
}: any) => rest;
