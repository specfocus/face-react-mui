import {
  getElementsFromRecords,
  InferredElement,
  useResourceContext
} from '@specfocus/view-focus/core';
import { ListBase } from '@specfocus/view-focus/lists/ListBase';
import { useListContext } from '@specfocus/view-focus/lists/useListContext';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import inflection from 'inflection';
import { useEffect, useState } from 'react';
import { ListProps } from './List';
import { listFieldTypes } from './listFieldTypes';
import { ListView, ListViewProps } from './ListView';

/**
 * List component rendering a <Datagrid> based on the result of the
 * dataProvider.getList() call.
 *
 * The result (choice and type of columns) isn't configurable, but the
 * <ListGuesser> outputs the <Datagrid> it has guessed to the console so that
 * developers can start from there.
 *
 * To be used as the list prop of a <Resource>.
 *
 * @example
 *
 * import { Admin, Resource, ListGuesser } from '@specfocus/view-focus.mui-demo';
 *
 * const App = () => (
 *     <Admin dataProvider={myDataProvider}>
 *         <Resource name="posts" list={ListGuesser} />
 *     </Admin>
 * );
 */
export const ListGuesser = <RecordType extends Entity = any>(
  props: Omit<ListProps, 'children'>
) => {
  const {
    debounce,
    disableAuthentication,
    disableSyncWithLocation,
    exporter,
    filter,
    filterDefaultValues,
    perPage,
    queryOptions,
    resource,
    sort,
    ...rest
  } = props;
  return (
    <ListBase<RecordType>
      debounce={debounce}
      disableAuthentication={disableAuthentication}
      disableSyncWithLocation={disableSyncWithLocation}
      exporter={exporter}
      filter={filter}
      filterDefaultValues={filterDefaultValues}
      perPage={perPage}
      queryOptions={{ keepPreviousData: false }}
      resource={resource}
      sort={sort}
    >
      <ListViewGuesser {...rest} />
    </ListBase>
  );
};

const ListViewGuesser = (props: Omit<ListViewProps, 'children'>) => {
  const { data } = useListContext(props);
  const resource = useResourceContext();
  const [child, setChild] = useState(null);

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (data && data.length > 0 && !child) {
      const inferredElements = getElementsFromRecords(
        data,
        listFieldTypes
      );
      const inferredChild = new InferredElement(
        listFieldTypes.table,
        null,
        inferredElements
      );
      setChild(inferredChild.getElement());

      if (process.env.NODE_ENV === 'production') return;

      const representation = inferredChild.getRepresentation();
      const components = ['List']
        .concat(
          Array.from(
            new Set(
              Array.from(representation.matchAll(/<([^/\s>]+)/g))
                .map(match => match[1])
                .filter(component => component !== 'span')
            )
          )
        )
        .sort();

      // eslint-disable-next-line no-console
      console.log(
        `Guessed List:

import { ${components.join(', ')} } from '@specfocus/view-focus.mui-demo';

export const ${inflection.capitalize(
          inflection.singularize(resource)
        )}List = () => (
    <List>
${inferredChild.getRepresentation()}
    </List>
);`
      );
    }
  }, [data, child, resource]);

  return <ListView {...props}>{child}</ListView>;
};

ListViewGuesser.propTypes = ListView.propTypes;
