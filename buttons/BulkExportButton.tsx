import DownloadIcon from '@mui/icons-material/GetApp';
import { fetchRelatedRecords } from '@specfocus/view-focus/core';
import { useDataProvider } from '@specfocus/view-focus.data/providers/useDataProvider';
import { useListContext } from '@specfocus/view-focus/lists';
import { useNotify } from '@specfocus/view-focus.notification/providers/useNotify';
import { Exporter } from '@specfocus/view-focus/types';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Button, ButtonProps } from './Button';
import { Identifier } from '@specfocus/spec-focus/entities/Entity';

/**
 * Export the selected rows
 *
 * To be used inside the <List bulkActionButtons> prop.
 *
 * @example // basic usage
 * import React from 'react';
 * import { Fragment } from 'react';
 * import { BulkDeleteButton, BulkExportButton } from '@specfocus/view-focus.mui-demo';
 *
 * const PostBulkActionButtons = () => (
 *     <Fragment>
 *         <BulkExportButton />
 *         <BulkDeleteButton />
 *     </Fragment>
 * );
 *
 * export const PostList = (props) => (
 *     <List {...props} bulkActionButtons={<PostBulkActionButtons />}>
 *         ...
 *     </List>
 * );
 */
export const BulkExportButton = (props: BulkExportButtonProps) => {
  const {
    onClick,
    label = 'action.export',
    icon = defaultIcon,
    exporter: customExporter,
    ...rest
  } = props;
  const {
    exporter: exporterFromContext,
    resource,
    selectedIds,
  } = useListContext(props);
  const exporter = customExporter || exporterFromContext;
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const handleClick = useCallback(
    event => {
      exporter &&
        dataProvider
          .getMany(resource, { ids: selectedIds })
          .then(({ data }) =>
            exporter(
              data,
              fetchRelatedRecords(dataProvider),
              dataProvider,
              resource
            )
          )
          .catch(error => {
            console.error(error);
            notify('notification.http_error', {
              type: 'warning',
            });
          });
      if (typeof onClick === 'function') {
        onClick(event);
      }
    },
    [dataProvider, exporter, notify, onClick, resource, selectedIds]
  );

  return (
    <Button
      onClick={handleClick}
      label={label}
      {...sanitizeRestProps(rest)}
    >
      {icon}
    </Button>
  );
};

const defaultIcon = <DownloadIcon />;

const sanitizeRestProps = ({
  filterValues,
  selectedIds,
  resource,
  ...rest
}: Omit<BulkExportButtonProps, 'exporter' | 'label'>) => rest;

interface Props {
  exporter?: Exporter;
  filterValues?: any;
  icon?: JSX.Element;
  label?: string;
  onClick?: (e: Event) => void;
  selectedIds?: Identifier[];
  resource?: string;
}

export type BulkExportButtonProps = Props & ButtonProps;

BulkExportButton.propTypes = {
  exporter: PropTypes.func,
  label: PropTypes.string,
  resource: PropTypes.string,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
  icon: PropTypes.element,
};
