import { UseFieldArrayReturn } from '@specfocus/view-focus.forms/fields/arrays';
import { createContext } from 'react';

/**
 * A React context that provides access to an ArrayInput methods as provided by react-hook-form
 * Useful to create custom array input iterators.
 * @see {ArrayInput}
 * @see {@link https://react-hook-form.com/api/usefieldarray}
 */
export const ArrayInputContext = createContext<ArrayInputContextValue>(
  undefined
);

export type ArrayInputContextValue = UseFieldArrayReturn;
