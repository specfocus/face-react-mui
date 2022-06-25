import { TableBody, TableBodyProps } from '@mui/material';
import { Identifier, Entity } from '@specfocus/spec-focus/entities/Entity';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { cloneElement, FunctionComponent, memo, ReactElement } from 'react';
import DatagridRow, { PureDatagridRow, RowClickFunction } from './DatagridRow';
import { DatagridClasses } from './useDatagridStyles';

const DatagridBody: FunctionComponent<DatagridBodyProps> = React.forwardRef(
  (
    {
      children,
      className,
      data,
      expand,
      hasBulkActions,
      hover,
      onToggleItem,
      resource,
      row,
      rowClick,
      rowStyle,
      selectedIds,
      isRowSelectable,
      ...rest
    },
    ref
  ) => (
    <TableBody
      ref={ref}
      className={clsx('datagrid-body', className, DatagridClasses.tbody)}
      {...rest}
    >
      {data.map((record, rowIndex) =>
        cloneElement(
          row,
          {
            className: clsx(DatagridClasses.row, {
              [DatagridClasses.rowEven]: rowIndex % 2 === 0,
              [DatagridClasses.rowOdd]: rowIndex % 2 !== 0,
            }),
            expand,
            hasBulkActions: hasBulkActions && !!selectedIds,
            hover,
            id: record.id ?? `row${rowIndex}`,
            key: record.id ?? `row${rowIndex}`,
            onToggleItem,
            record,
            resource,
            rowClick,
            selectable: !isRowSelectable || isRowSelectable(record),
            selected: selectedIds?.includes(record.id),
            style: rowStyle ? rowStyle(record, rowIndex) : null,
          },
          children
        )
      )}
    </TableBody>
  )
);

DatagridBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  // @ts-ignore
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // @ts-ignore
  expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  hasBulkActions: PropTypes.bool.isRequired,
  hover: PropTypes.bool,
  onToggleItem: PropTypes.func,
  resource: PropTypes.string,
  row: PropTypes.element,
  rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowStyle: PropTypes.func,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
  styles: PropTypes.object,
  isRowSelectable: PropTypes.func,
};

DatagridBody.defaultProps = {
  data: [],
  hasBulkActions: false,
  row: <DatagridRow />,
};

export interface DatagridBodyProps extends Omit<TableBodyProps, 'classes'> {
  className?: string;
  data?: any[];
  expand?:
  | ReactElement
  | FunctionComponent<{
    id: Identifier;
    record: Entity;
    resource: string;
  }>;
  hasBulkActions?: boolean;
  hover?: boolean;
  onToggleItem?: (
    id: Identifier,
    event: React.TouchEvent | React.MouseEvent
  ) => void;
  record?: Entity;
  resource?: string;
  row?: ReactElement;
  rowClick?: string | RowClickFunction;
  rowStyle?: (record: Entity, index: number) => any;
  selectedIds?: Identifier[];
  isRowSelectable?: (record: Entity) => boolean;
}

// trick MUI Table into thinking this is one of the child type it supports
// @ts-ignore
DatagridBody.muiName = 'TableBody';

export const PureDatagridBody = memo(DatagridBody);

// trick MUI Table into thinking this is one of the child type it supports
// @ts-ignore
PureDatagridBody.muiName = 'TableBody';
// @ts-ignore
PureDatagridBody.defaultProps = {
  row: <PureDatagridRow />,
};

export default DatagridBody;
