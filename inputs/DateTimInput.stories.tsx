import React from 'react';
import createI18nProvider from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/core';
import { AdminContext } from '../core/AdminContext';
import { Create } from '../details';
import { SimpleForm } from '../forms';
import { DateTimeInput } from './DateTimeInput';

export default { title: 'view-focus.mui/inputs/DateTimeInput' };

export const Basic = () => (
  <Wrapper>
    <DateTimeInput source="published" />
  </Wrapper>
);

export const FullWidth = () => (
  <Wrapper>
    <DateTimeInput source="published" fullWidth />
  </Wrapper>
);

export const Disabled = () => (
  <Wrapper>
    <DateTimeInput source="published" disabled />
  </Wrapper>
);

const i18nProvider = createI18nProvider(() => englishMessages);

const Wrapper = ({ children }) => (
  <AdminContext i18nProvider={i18nProvider}>
    <Create resource="posts">
      <SimpleForm>{children}</SimpleForm>
    </Create>
  </AdminContext>
);
