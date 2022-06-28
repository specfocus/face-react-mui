import { InferredElement, InferredTypeMap } from '@specfocus/view-focus/resources';
import { InputProps } from '@specfocus/view-focus/forms/useInput';
import { ReactNode } from 'react';
import {
  ArrayField,
  BooleanField,
  DateField,
  EmailField,
  NumberField, ReferenceArrayField,
  ReferenceArrayFieldProps, ReferenceField,
  ReferenceFieldProps, RichTextField,
  TextField,
  UrlField
} from '../fields';
import { Datagrid } from '../lists/datagrid/Datagrid';
import { SimpleShowLayout, SimpleShowLayoutProps } from './SimpleShowLayout';

export const showFieldTypes: InferredTypeMap = {
  show: {
    component: (props: SimpleShowLayoutProps) => (
      <SimpleShowLayout {...props} />
    ), // eslint-disable-line react/display-name
    representation: (_, children) => `        <SimpleShowLayout>
${children.map(child => `            ${child.getRepresentation()}`).join('\n')}
        </SimpleShowLayout>`,
  },
  array: {
    // eslint-disable-next-line react/display-name
    component: ({
      children,
      ...props
    }: { children: ReactNode; } & InputProps) => (
      <ArrayField {...props}>
        <Datagrid>{children}</Datagrid>
      </ArrayField>
    ),
    representation: (props: InputProps, children: InferredElement[]) =>
      `<ArrayField source="${props.source
      }"><Datagrid>${children
        .map(child => child.getRepresentation())
        .join('\n')}</Datagrid></ArrayField>`,
  },
  boolean: {
    component: BooleanField,
    representation: (props: InputProps) =>
      `<BooleanField source="${props.source}" />`,
  },
  date: {
    component: DateField,
    representation: (props: InputProps) =>
      `<DateField source="${props.source}" />`,
  },
  email: {
    component: EmailField,
    representation: (props: InputProps) =>
      `<EmailField source="${props.source}" />`,
  },
  id: {
    component: TextField,
    representation: (props: InputProps) =>
      `<TextField source="${props.source}" />`,
  },
  number: {
    component: NumberField,
    representation: (props: InputProps) =>
      `<NumberField source="${props.source}" />`,
  },
  reference: {
    component: ReferenceField,
    representation: (props: ReferenceFieldProps) =>
      `<ReferenceField source="${props.source}" reference="${props.reference}"><TextField source="id" /></ReferenceField>`,
  },
  referenceChild: {
    component: (props: { children: ReactNode; } & InputProps) => (
      <TextField source="id" {...props} />
    ), // eslint-disable-line react/display-name
    representation: () => `<TextField source="id" />`,
  },
  referenceArray: {
    component: ReferenceArrayField,
    representation: (props: ReferenceArrayFieldProps) =>
      `<ReferenceArrayField source="${props.source}" reference="${props.reference}"><TextField source="id" /></ReferenceArrayField>`,
  },
  referenceArrayChild: {
    component: (props: { children: ReactNode; } & InputProps) => (
      <TextField source="id" {...props} />
    ), // eslint-disable-line react/display-name
    representation: () => `<TextField source="id" />`,
  },
  richText: {
    component: RichTextField,
    representation: (props: InputProps) =>
      `<RichTextField source="${props.source}" />`,
  },
  string: {
    component: TextField,
    representation: (props: InputProps) =>
      `<TextField source="${props.source}" />`,
  },
  url: {
    component: UrlField,
    representation: (props: InputProps) =>
      `<UrlField source="${props.source}" />`,
  },
};
