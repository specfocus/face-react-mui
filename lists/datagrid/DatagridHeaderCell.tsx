import { TableCell, TableSortLabel, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TableCellProps } from '@mui/material/TableCell';
import { useResourceContext } from '@specfocus/view-focus/resources';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { SortPayload } from '@specfocus/view-focus.data/operations/SortPayload';
import FieldTitle from '@specfocus/view-focus/utils/FieldTitle';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo } from 'react';

export const DatagridHeaderCell = (
  props: DatagridHeaderCellProps
): JSX.Element => {
  const { className, field, sort, updateSort, isSorting, ...rest } = props;
  const resource = useResourceContext(props);

  const translate = useTranslate();

  return (
    <StyledTableCell
      className={clsx(className, field.props.headerClassName)}
      align={field.props.textAlign}
      variant="head"
      {...rest}
    >
      {updateSort &&
        field.props.sortable !== false &&
        (field.props.sortBy || field.props.source) ? (
        <Tooltip
          title={translate('action.sort')}
          placement={
            field.props.textAlign === 'right'
              ? 'bottom-end'
              : 'bottom-start'
          }
          enterDelay={300}
        >
          <TableSortLabel
            active={
              sort.field ===
              (field.props.sortBy || field.props.source)
            }
            direction={sort.order === 'ASC' ? 'asc' : 'desc'}
            data-field={field.props.sortBy || field.props.source}
            data-order={field.props.sortByOrder || 'ASC'}
            onClick={updateSort}
            classes={DatagridHeaderCellClasses}
          >
            <FieldTitle
              label={field.props.label}
              source={field.props.source}
              resource={resource}
            />
          </TableSortLabel>
        </Tooltip>
      ) : (
        <FieldTitle
          label={field.props.label}
          source={field.props.source}
          resource={resource}
        />
      )}
    </StyledTableCell>
  );
};

DatagridHeaderCell.propTypes = {
  className: PropTypes.string,
  field: PropTypes.element,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  isSorting: PropTypes.bool,
  resource: PropTypes.string,
  updateSort: PropTypes.func,
};

export interface DatagridHeaderCellProps
  extends Omit<TableCellProps, 'classes'> {
  className?: string;
  field?: JSX.Element;
  isSorting?: boolean;
  resource: string;
  sort: SortPayload;
  updateSort?: (event: any) => void;
}

export default memo(
  DatagridHeaderCell,
  (props, nextProps) =>
    props.updateSort === nextProps.updateSort &&
    props.sort.field === nextProps.sort.field &&
    props.sort.order === nextProps.sort.order &&
    props.isSorting === nextProps.isSorting &&
    props.resource === nextProps.resource
);

const PREFIX = 'DatagridHeaderCell';

export const DatagridHeaderCellClasses = {
  icon: `${PREFIX}-icon`,
};

// Remove the sort icons when not active
const StyledTableCell = styled(TableCell, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .MuiTableSortLabel-icon`]: {
    display: 'none',
  },
  [`& .Mui-active .MuiTableSortLabel-icon`]: {
    display: 'inline',
  },
}));
