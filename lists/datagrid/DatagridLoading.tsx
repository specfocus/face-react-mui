import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Identifier, Entity } from '@specfocus/spec-focus/entities/Entity';
import { useTimeout } from '@specfocus/view-focus.states/states/useTimeout';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { FunctionComponent, memo, ReactElement } from 'react';
import { Placeholder } from '../Placeholder';
import { DatagridClasses } from './useDatagridStyles';

const times = (nbChildren, fn) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const DatagridLoading = ({
  className,
  expand,
  hasBulkActions,
  nbChildren,
  nbFakeLines = 5,
  size,
}: DatagridLoadingProps): JSX.Element => {
  const oneSecondHasPassed = useTimeout(1000);

  return oneSecondHasPassed ? (
    <Table className={clsx(DatagridClasses.table, className)} size={size}>
      <TableHead>
        <TableRow className={DatagridClasses.row}>
          {expand && (
            <TableCell
              padding="none"
              className={DatagridClasses.expandHeader}
            />
          )}
          {hasBulkActions && (
            <TableCell
              padding="checkbox"
              className={DatagridClasses.expandIconCell}
            >
              <Checkbox
                className="select-all"
                color="primary"
                checked={false}
              />
            </TableCell>
          )}
          {times(nbChildren, key => (
            <TableCell
              variant="head"
              className={DatagridClasses.headerCell}
              key={key}
            >
              <Placeholder />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {times(nbFakeLines, key1 => (
          <TableRow key={key1} style={{ opacity: 1 / (key1 + 1) }}>
            {expand && (
              <TableCell
                padding="none"
                className={DatagridClasses.expandIconCell}
              >
                <IconButton
                  className={DatagridClasses.expandIcon}
                  component="div"
                  aria-hidden="true"
                  size="large"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </TableCell>
            )}
            {hasBulkActions && (
              <TableCell
                padding="checkbox"
                className={DatagridClasses.expandIconCell}
              >
                <Checkbox
                  className="select-all"
                  color="primary"
                  checked={false}
                />
              </TableCell>
            )}
            {times(nbChildren, key2 => (
              <TableCell
                className={DatagridClasses.rowCell}
                key={key2}
              >
                <Placeholder />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : null;
};

DatagridLoading.propTypes = {
  className: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  hasBulkActions: PropTypes.bool,
  nbChildren: PropTypes.number,
  nbFakeLines: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium']),
};

export interface DatagridLoadingProps {
  className?: string;
  expand?:
  | ReactElement
  | FunctionComponent<{
    id: Identifier;
    record: Entity;
    resource: string;
  }>;
  hasBulkActions?: boolean;
  nbChildren: number;
  nbFakeLines?: number;
  size?: 'small' | 'medium';
}

export default memo(DatagridLoading);
