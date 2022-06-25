import { useChoicesContext } from '@specfocus/view-focus/choices/useChoicesContext';
import { ChoicesProps } from '@specfocus/view-focus/forms/useChoices';
import { useInput } from '@specfocus/view-focus/forms/useInput';
import { ListContextProvider } from '@specfocus/view-focus/lists/ListContextProvider';
import { Identifier } from '@specfocus/spec-focus/entities/Entity';
import clsx from 'clsx';
import React, { cloneElement, ReactElement, ReactNode, useCallback } from 'react';
import {
  CommonInputProps,
  InputHelperText,
  SupportCreateSuggestionOptions
} from '.';
import { Datagrid, DatagridProps } from '../lists/datagrid';
import { FilterButton, FilterForm } from '../lists/filter';
import { FilterContext } from '../lists/FilterContext';
import { Pagination as DefaultPagination } from '../lists/pagination';

const defaultPagination = <DefaultPagination />;

/**
 * WIP: This component is not yet ready to be used.
 *
 * An input for selecting items displayed in a datagrid
 *
 * @example
 * const membersFilters = [
 *     <TextInput label="Search" source="q" alwaysOn />,
 * ];
 * const TeamEdit = () => (
 *    <Edit>
 *        <SimpleForm>
 *            <TextInput source="name" />
 *            <ReferenceArrayInput
 *                source="members"
 *                reference="users"
 *                filter={{ is_retired: false }}
 *                perPage={50}
 *                sort={{ field: 'lastName', order: 'ASC' }}
 *            >
 *                <DatagridInput
 *                    filters={membersFilters}
 *                >
 *                    <TextField source="firstName" />
 *                    <TextField source="lastName" />
 *                </DatagridInput>
 *            </ReferenceArrayInput>
 *        </SimpleForm>
 *    </Edit>
 * );
 */
export const DatagridInput = (props: DatagridInputProps) => {
  const {
    choices,
    className,
    pagination = defaultPagination,
    filters,
    source: sourceProp,
    resource: resourceProp,
    ...rest
  } = props;

  const {
    allChoices,
    availableChoices,
    selectedChoices,
    source,
    ...choicesContext
  } = useChoicesContext({
    choices,
    resource: resourceProp,
    source: sourceProp,
  });
  const { field, fieldState, formState } = useInput({
    ...props,
    ...choicesContext,
    source,
  });

  const onSelect = useCallback(
    (idsToAdd: Identifier[]) => {
      field.onChange(idsToAdd);
    },
    [field]
  );

  const onToggleItem = useCallback(
    (id: Identifier) => {
      if (field.value.includes(id)) {
        field.onChange(field.value.filter(item => item !== id));
      } else {
        field.onChange([...field.value, id]);
      }
    },
    [field]
  );

  const onUnselectItems = useCallback(() => {
    field.onChange([]);
  }, [field]);

  const listContext = React.useMemo(
    () => ({
      ...choicesContext,
      data: availableChoices,
      onSelect,
      onToggleItem,
      onUnselectItems,
      selectedIds: field.value,
    }),
    [
      availableChoices,
      choicesContext,
      field,
      onSelect,
      onToggleItem,
      onUnselectItems,
    ]
  );
  return (
    <div className={clsx('input', `ra-input-${source}`, className)}>
      <ListContextProvider value={listContext}>
        {filters ? (
          Array.isArray(filters) ? (
            <FilterContext.Provider value={filters}>
              <>
                <FilterForm />
                <FilterButton />
              </>
            </FilterContext.Provider>
          ) : (
            <>
              {cloneElement(filters, {
                context: 'form',
              })}
              {cloneElement(filters, {
                context: 'button',
              })}
            </>
          )
        ) : null}
        <Datagrid {...rest} />
        {pagination !== false && pagination}
        <InputHelperText
          touched={fieldState.isTouched || formState.isSubmitted}
          error={fieldState.error?.message}
        />
      </ListContextProvider>
    </div>
  );
};

export type DatagridInputProps = Omit<CommonInputProps, 'source'> &
  ChoicesProps &
  Omit<SupportCreateSuggestionOptions, 'handleChange'> &
  DatagridProps & {
    children?: ReactNode;
    source?: string;
    filters?: ReactElement | ReactElement[];
    pagination?: ReactElement | false;
  };
