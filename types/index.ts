import { SxProps } from '@mui/system';
import { Entity, Identifier } from '@specfocus/spec-focus/entities/Entity';
import { UseCreateMutateParams } from '@specfocus/view-focus.data/operations/create/useCreate';
import { MutationMode } from '@specfocus/view-focus.data/operations/MutationMode';
import { UseUpdateMutateParams } from '@specfocus/view-focus.data/operations/update/useUpdate';
import { TransformData } from '@specfocus/view-focus.data/providers/DataProvider';
import { RedirectionSideEffect } from '@specfocus/view-focus.navigation/routes/useRedirect';
import { ElementType, ReactElement, ReactNode } from 'react';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

export interface EditProps<
  RecordType extends Entity = any,
  MutationOptionsError = unknown
> {
  actions?: ReactElement | false;
  aside?: ReactElement;
  className?: string;
  component?: ElementType;
  disableAuthentication?: boolean;
  id?: Identifier;
  mutationMode?: MutationMode;
  queryOptions?: UseQueryOptions<RecordType>;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    UseUpdateMutateParams<RecordType>
  >;
  redirect?: RedirectionSideEffect;
  resource?: string;
  transform?: TransformData;
  title?: string | ReactElement;
  sx?: SxProps;
}

export interface CreateProps<
  RecordType extends Entity = any,
  MutationOptionsError = unknown
> {
  actions?: ReactElement | false;
  aside?: ReactElement;
  className?: string;
  component?: ElementType;
  disableAuthentication?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  record?: Partial<RecordType>;
  redirect?: RedirectionSideEffect;
  resource?: string;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    UseCreateMutateParams<RecordType>
  >;
  transform?: TransformData;
  title?: string | ReactElement;
  sx?: SxProps;
}

export interface ShowProps<RecordType extends Entity = any> {
  actions?: ReactElement | false;
  aside?: ReactElement;
  children: ReactNode;
  className?: string;
  component?: ElementType;
  disableAuthentication?: boolean;
  emptyWhileLoading?: boolean;
  id?: Identifier;
  queryOptions?: UseQueryOptions<RecordType>;
  resource?: string;
  title?: string | ReactElement;
  sx?: SxProps;
}

export interface BulkActionProps {
  filterValues?: any;
  resource?: string;
  selectedIds?: Identifier[];
}
