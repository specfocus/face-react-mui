import BookmarkIcon from '@mui/icons-material/BookmarkBorder';
import HelpIcon from '@mui/icons-material/HelpOutline';
import { styled, Tooltip } from '@mui/material';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import isEqual from 'lodash/isEqual';
import { ReactNode } from 'react';
import { AddSavedQueryIconButton } from './AddSavedQueryIconButton';
import { FilterList } from './FilterList';
import { RemoveSavedQueryIconButton } from './RemoveSavedQueryIconButton';
import { SavedQueryFilterListItem } from './SavedQueryFilterListItem';
import { extractValidSavedQueries, useSavedQueries } from './useSavedQueries';

/**
 * FilterList-like component allowing to save and restore a query (filters, sort, perPage).
 *
 * Use this component in a Filter sidebar to let users store custom queries
 * that they can reuse later. The saved queries will appear as FilterListItems,
 * and can be removed.
 *
 * This component uses useStore under the hood to store saved queries in
 * localStorage, one set of saved queries per resource.
 *
 * @example
 *
 * import { FilterList, FilterListItem, List, Datagrid, SavedQueriesList } from '@specfocus/view-focus.mui-demo';
 * import { Card, CardContent } from '@mui/material';
 *
 * const PostFilterSidebar = () => (
 *     <Card>
 *         <CardContent>
 *             <SavedQueriesList />
 *             <FilterList label="Category" icon={<CategoryIcon />}>
 *                 ...
 *             </FilterList>
 *             <FilterList label="Published" icon={<DateRangeIcon />}>
 *                ...
 *             </FilterList>
 *             <FilterList label="Popularity" icon={<DateRangeIcon />}>
 *                ...
 *             </FilterList>
 *         </CardContent>
 *     </Card>
 * );
 *
 * const PostList = () => (
 *     <List aside={<PostFilterSidebar />}>
 *         <Datagrid>
 *             ...
 *         </Datagrid>
 *     </List>
 * );
 *
 */
export const SavedQueriesList = ({
  icon = defaultIcon,
}: SavedQueriesListProps) => {
  const translate = useTranslate();
  const {
    resource,
    filterValues,
    displayedFilters,
    sort,
    perPage,
  } = useListContext();

  const [savedQueries] = useSavedQueries(resource);
  const validSavedQueries = extractValidSavedQueries(savedQueries);
  const hasSavedCurrentFilterValue = validSavedQueries.some(savedQuery =>
    isEqual(savedQuery.value, {
      filter: filterValues,
      sort,
      perPage,
      displayedFilters,
    })
  );
  const hasFilterValues = !isEqual(filterValues, {});

  return (
    <Root label="ra.saved_queries.label" icon={icon}>
      {hasSavedCurrentFilterValue ? (
        <RemoveSavedQueryIconButton
          className={SavedQueriesListClasses.floatingIcon}
        />
      ) : hasFilterValues ? (
        <AddSavedQueryIconButton
          className={SavedQueriesListClasses.floatingIcon}
        />
      ) : (
        <Tooltip
          title={translate('saved_queries.help')}
          className={SavedQueriesListClasses.floatingTooltip}
        >
          <HelpIcon />
        </Tooltip>
      )}
      {validSavedQueries.map((savedQuery, index) => (
        <SavedQueryFilterListItem
          label={savedQuery.label}
          value={savedQuery.value}
          key={index}
        />
      ))}
    </Root>
  );
};

const PREFIX = 'SavedQueriesList';

export const SavedQueriesListClasses = {
  floatingIcon: `${PREFIX}-floatingIcon`,
  floatingTooltip: `${PREFIX}-floatingTooltip`,
  titleContainer: `${PREFIX}-titleContainer`,
  titleIcon: `${PREFIX}-titleIcon`,
};

const Root = styled(FilterList, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${SavedQueriesListClasses.floatingIcon}`]: {
    position: 'absolute',
    top: '-1.8em',
    right: 0,
  },
  [`& .${SavedQueriesListClasses.floatingTooltip}`]: {
    position: 'absolute',
    top: '-1.2em',
    right: 3,
    color: theme.palette.action.disabled,
  },
}));

const defaultIcon = <BookmarkIcon />;

export interface SavedQueriesListProps {
  icon?: ReactNode;
}
