import { createContext } from 'react';
import { Entity } from '@specfocus/spec-focus/entities/Entity';

const DatagridContext = createContext<DatagridContextValue>({});

DatagridContext.displayName = 'DatagridContext';

export type DatagridContextValue = {
  isRowExpandable?: (record: Entity) => boolean;
  expandSingle?: boolean;
};

export default DatagridContext;
