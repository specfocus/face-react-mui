import React from 'react';
import { ChangeEvent, memo, useMemo } from 'react';
import { InputAdornment } from '@mui/material';
import { SxProps } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';

import { TextInput } from '../../inputs';
import { Form } from '@specfocus/view-focus/forms/Form';
import { useListFilterContext } from '@specfocus/view-focus/lists/useListFilterContext';

/**
 * Form and search input for doing a full-text search filter.
 *
 * Triggers a search on change (with debounce).
 *
 * @example
 *
 * const FilterPanel = () => (
 *     <Card>
 *         <CardContent>
 *             <FilterLiveSearch source="title" />
 *         </CardContent>
 *     </Card>
 * );
 */
export const FilterLiveSearch = memo((props: FilterLiveSearchProps) => {
  const { source = 'q', variant, ...rest } = props;
  const { filterValues, setFilters } = useListFilterContext();
  const translate = useTranslate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setFilters({ ...filterValues, [source]: event.target.value }, null);
    } else {
      const { [source]: _, ...filters } = filterValues;
      setFilters(filters, null);
    }
  };

  const initialValues = useMemo(
    () => ({
      [source]: filterValues[source],
    }),
    [filterValues, source]
  );

  const onSubmit = () => undefined;
  let label = translate('action.search');

  return (
    <Form defaultValues={initialValues} onSubmit={onSubmit}>
      <TextInput
        resettable
        helperText={false}
        source={source}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        size="small"
        {...(variant === 'outlined'
          ? { variant: 'outlined', label }
          : {
            placeholder: label,
            label: false,
            hiddenLabel: true,
          })}
        {...rest}
      />
    </Form>
  );
});

export interface FilterLiveSearchProps {
  source?: string;
  sx?: SxProps;
  fullWidth?: boolean;
  variant?: 'filled' | 'outlined';
}
