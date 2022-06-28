import DownloadIcon from '@mui/icons-material/GetApp';
import { fetchRelatedRecords, useResourceContext } from '@specfocus/view-focus/resources';
import { useDataProvider } from '@specfocus/view-focus.data/providers/useDataProvider';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import { useNotify } from '@specfocus/view-focus.notification/providers/useNotify';
import { Exporter } from '@specfocus/view-focus/types';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Button, ButtonProps } from './Button';
import { FilterPayload } from '@specfocus/view-focus.data/operations/FilterPayload';
import { SortPayload } from '@specfocus/view-focus.data/operations/SortPayload';

export const ExportButton = (props: ExportButtonProps) => {
  const {
    maxResults = 1000,
    onClick,
    label = 'action.export',
    icon = defaultIcon,
    exporter: customExporter,
    ...rest
  } = props;
  const {
    filter,
    filterValues,
    sort,
    exporter: exporterFromContext,
    total,
  } = useListContext(props);
  const resource = useResourceContext(props);
  const exporter = customExporter || exporterFromContext;
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const handleClick = useCallback(
    event => {
      dataProvider
        .getList(resource, {
          sort,
          filter: filter
            ? { ...filterValues, ...filter }
            : filterValues,
          pagination: { page: 1, perPage: maxResults },
        })
        .then(
          ({ data }) =>
            exporter &&
            exporter(
              data,
              fetchRelatedRecords(dataProvider),
              dataProvider,
              resource
            )
        )
        .catch(error => {
          console.error(error);
          notify('notification.http_error', { type: 'warning' });
        });
      if (typeof onClick === 'function') {
        onClick(event);
      }
    },
    [
      dataProvider,
      exporter,
      filter,
      filterValues,
      maxResults,
      notify,
      onClick,
      resource,
      sort,
    ]
  );

  return (
    <Button
      onClick={handleClick}
      label={label}
      disabled={total === 0}
      {...sanitizeRestProps(rest)}
    >
      {icon}
    </Button>
  );
};

const defaultIcon = <DownloadIcon />;

const sanitizeRestProps = ({
  filterValues,
  resource,
  ...rest
}: Omit<ExportButtonProps, 'sort' | 'maxResults' | 'label' | 'exporter'>) =>
  rest;

interface Props {
  exporter?: Exporter;
  filterValues?: FilterPayload;
  icon?: JSX.Element;
  label?: string;
  maxResults?: number;
  onClick?: (e: Event) => void;
  resource?: string;
  sort?: SortPayload;
}

export type ExportButtonProps = Props & ButtonProps;

ExportButton.propTypes = {
  exporter: PropTypes.func,
  filterValues: PropTypes.object,
  label: PropTypes.string,
  maxResults: PropTypes.number,
  resource: PropTypes.string,
  sort: PropTypes.exact({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  icon: PropTypes.element,
};
