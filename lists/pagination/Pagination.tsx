import {
  TablePagination,
  TablePaginationBaseProps,
  Theme,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import { sanitizeListRestProps } from '@specfocus/view-focus/lists/useListController';
import useListPaginationContext from '@specfocus/view-focus/lists/useListPaginationContext';
import ComponentPropType from '@specfocus/view-focus/utils/ComponentPropType';
import PropTypes from 'prop-types';
import { FunctionComponent, memo, ReactElement, useCallback, useMemo } from 'react';
import { PaginationActions } from './PaginationActions';
import { PaginationLimit } from './PaginationLimit';

export const Pagination: FunctionComponent<PaginationProps> = memo(props => {
  const {
    rowsPerPageOptions = DefaultRowsPerPageOptions,
    actions,
    limit = DefaultLimit,
    ...rest
  } = props;
  const {
    isLoading,
    hasNextPage,
    page,
    perPage,
    total,
    setPage,
    setPerPage,
  } = useListPaginationContext(props);
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const totalPages = useMemo(() => {
    return total != null ? Math.ceil(total / perPage) : undefined;
  }, [perPage, total]);

  /**
   * Warning: MUI's page is 0-based
   */
  const handlePageChange = useCallback(
    (event, page) => {
      event && event.stopPropagation();
      if (page < 0 || page > totalPages - 1) {
        throw new Error(
          translate('navigation.page_out_of_boundaries', {
            page: page + 1,
          })
        );
      }
      setPage(page + 1);
    },
    [totalPages, setPage, translate]
  );

  const handlePerPageChange = useCallback(
    event => {
      setPerPage(event.target.value);
    },
    [setPerPage]
  );

  const labelDisplayedRows = useCallback(
    ({ from, to, count }) =>
      count === -1 && hasNextPage
        ? translate('navigation.partial_page_range_info', {
          offsetBegin: from,
          offsetEnd: to,
          _: `%{from}-%{to} of more than %{to}`,
        })
        : translate('navigation.page_range_info', {
          offsetBegin: from,
          offsetEnd: to,
          total: count === -1 ? to : count,
          _: `%{from}-%{to} of %{count === -1 ? to : count}`,
        }),
    [translate, hasNextPage]
  );

  const labelItem = useCallback(
    type => translate(`ra.navigation.${type}`, { _: `Go to ${type} page` }),
    [translate]
  );

  if (isLoading) {
    return <Toolbar variant="dense" />;
  }

  // Avoid rendering TablePagination if "page" value is invalid
  if (total === 0 || page < 1 || (total != null && page > totalPages)) {
    return limit;
  }

  if (isSmall) {
    return (
      <TablePagination
        count={total == null ? -1 : total}
        rowsPerPage={perPage}
        page={page - 1}
        onPageChange={handlePageChange}
        rowsPerPageOptions={emptyArray}
        component="span"
        labelDisplayedRows={labelDisplayedRows}
        {...sanitizeListRestProps(rest)}
      />
    );
  }

  const ActionsComponent = actions
    ? actions // overridden by caller
    : !isLoading && total != null
      ? PaginationActions // regular navigation
      : undefined; // partial navigation (uses default TablePaginationActions)

  return (
    <TablePagination
      count={total == null ? -1 : total}
      rowsPerPage={perPage}
      page={page - 1}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handlePerPageChange}
      // @ts-ignore
      ActionsComponent={ActionsComponent}
      nextIconButtonProps={{
        disabled: !hasNextPage,
      }}
      component="span"
      labelRowsPerPage={translate('navigation.page_rows_per_page')}
      labelDisplayedRows={labelDisplayedRows}
      getItemAriaLabel={labelItem}
      rowsPerPageOptions={rowsPerPageOptions}
      {...sanitizeListRestProps(rest)}
    />
  );
});

Pagination.propTypes = {
  actions: ComponentPropType,
  limit: PropTypes.element,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};

const DefaultLimit = <PaginationLimit />;
const DefaultRowsPerPageOptions = [5, 10, 25];
const emptyArray = [];

export interface PaginationProps extends TablePaginationBaseProps {
  rowsPerPageOptions?: number[];
  actions?: FunctionComponent;
  limit?: ReactElement;
}
