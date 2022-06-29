import ContentFilter from '@mui/icons-material/FilterList';
import { Menu, MenuItem, styled } from '@mui/material';
import { useResourceContext } from '@specfocus/view-focus/resources';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import lodashGet from 'lodash/get';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import {
  HtmlHTMLAttributes, ReactNode, useCallback, useContext, useRef, useState
} from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../buttons';
import { FilterContext } from '../FilterContext';
import { AddSavedQueryDialog } from './AddSavedQueryDialog';
import { FilterButtonMenuItem } from './FilterButtonMenuItem';
import { RemoveSavedQueryDialog } from './RemoveSavedQueryDialog';
import { extractValidSavedQueries, useSavedQueries } from './useSavedQueries';

export const FilterButton = (props: FilterButtonProps): JSX.Element => {
  const { filters: filtersProp, className, ...rest } = props;
  const filters = useContext(FilterContext) || filtersProp;
  const resource = useResourceContext(props);
  const translate = useTranslate();
  const [savedQueries] = useSavedQueries(resource);
  const navigate = useNavigate();
  const {
    displayedFilters = {},
    filterValues,
    perPage,
    showFilter,
    sort,
  } = useListContext(props);
  const hasFilterValues = !isEqual(filterValues, {});
  const validSavedQueries = extractValidSavedQueries(savedQueries);
  const hasSavedCurrentQuery = validSavedQueries.some(savedQuery =>
    isEqual(savedQuery.value, {
      filter: filterValues,
      sort,
      perPage,
      displayedFilters,
    })
  );
  const [open, setOpen] = useState(false);
  const anchorEl = useRef();

  if (filters === undefined) {
    throw new Error('FilterButton requires filters prop to be set');
  }

  const hiddenFilters = filters.filter(
    (filterElement: JSX.Element) =>
      !filterElement.props.alwaysOn &&
      !displayedFilters[filterElement.props.source] &&
      typeof lodashGet(filterValues, filterElement.props.source) ===
      'undefined'
  );

  const handleClickButton = useCallback(
    event => {
      // This prevents ghost click.
      event.preventDefault();
      setOpen(true);
      anchorEl.current = event.currentTarget;
    },
    [anchorEl, setOpen]
  );

  const handleRequestClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleShow = useCallback(
    ({ source, defaultValue }) => {
      showFilter(source, defaultValue === '' ? undefined : defaultValue);
      setOpen(false);
    },
    [showFilter, setOpen]
  );

  // add query dialog state
  const [addSavedQueryDialogOpen, setAddSavedQueryDialogOpen] = useState(
    false
  );
  const hideAddSavedQueryDialog = (): void => {
    setAddSavedQueryDialogOpen(false);
  };
  const showAddSavedQueryDialog = (): void => {
    setOpen(false);
    setAddSavedQueryDialogOpen(true);
  };

  // remove query dialog state
  const [
    removeSavedQueryDialogOpen,
    setRemoveSavedQueryDialogOpen,
  ] = useState(false);
  const hideRemoveSavedQueryDialog = (): void => {
    setRemoveSavedQueryDialogOpen(false);
  };
  const showRemoveSavedQueryDialog = (): void => {
    setOpen(false);
    setRemoveSavedQueryDialogOpen(true);
  };

  if (
    hiddenFilters.length === 0 &&
    validSavedQueries.length === 0 &&
    !hasFilterValues
  ) {
    return null;
  }
  return (
    <Root className={className} {...sanitizeRestProps(rest)}>
      <Button
        className="add-filter"
        label="action.add_filter"
        aria-haspopup="true"
        onClick={handleClickButton}
      >
        <ContentFilter />
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl.current}
        onClose={handleRequestClose}
      >
        {hiddenFilters.map((filterElement: JSX.Element, index) => (
          <FilterButtonMenuItem
            key={filterElement.props.source}
            filter={filterElement}
            resource={resource}
            onShow={handleShow}
            autoFocus={index === 0}
          />
        ))}
        {validSavedQueries.map((savedQuery, index) =>
          isEqual(savedQuery.value, {
            filter: filterValues,
            sort,
            perPage,
            displayedFilters,
          }) ? (
            <MenuItem
              onClick={showRemoveSavedQueryDialog}
              key={index}
            >
              {translate(
                'saved_queries.remove_label_with_name',
                {
                  _: 'Remove query "%{name}"',
                  name: savedQuery.label,
                }
              )}
            </MenuItem>
          ) : (
            <MenuItem
              onClick={(): void => {
                navigate({
                  search: stringify({
                    filter: JSON.stringify(
                      savedQuery.value.filter
                    ),
                    sort: savedQuery.value.sort.field,
                    order: savedQuery.value.sort.order,
                    page: 1,
                    perPage: savedQuery.value.perPage,
                    displayedFilters: JSON.stringify(
                      savedQuery.value.displayedFilters
                    ),
                  }),
                });
                setOpen(false);
              }}
              key={index}
            >
              {savedQuery.label}
            </MenuItem>
          )
        )}
        {hasFilterValues && !hasSavedCurrentQuery ? (
          <MenuItem onClick={showAddSavedQueryDialog}>
            {translate('saved_queries.new_label', {
              _: 'Save current query...',
            })}
          </MenuItem>
        ) : null}
      </Menu>
      <AddSavedQueryDialog
        open={addSavedQueryDialogOpen}
        onClose={hideAddSavedQueryDialog}
      />
      <RemoveSavedQueryDialog
        open={removeSavedQueryDialogOpen}
        onClose={hideRemoveSavedQueryDialog}
      />
    </Root>
  );
};

const sanitizeRestProps = ({
  displayedFilters = null,
  filterValues = null,
  showFilter = null,
  ...rest
}) => rest;

FilterButton.propTypes = {
  resource: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.node),
  displayedFilters: PropTypes.object,
  filterValues: PropTypes.object,
  showFilter: PropTypes.func,
  className: PropTypes.string,
};

export interface FilterButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  resource?: string;
  filterValues?: any;
  showFilter?: (filterName: string, defaultValue: any) => void;
  displayedFilters?: any;
  filters?: ReactNode[];
}

const PREFIX = 'FilterButton';

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'inline-block',
}));
