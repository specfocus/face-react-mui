import React from 'react';
import createI18nProvider from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/core';
import { AdminContext } from '../core/AdminContext';
import { Create } from '../details';
import { SimpleForm } from '../forms';
import { DateInput } from './DateInput';

export default { title: 'view-focus.mui/inputs/DateInput' };

export const Basic = () => (
  <Wrapper>
    <DateInput source="published" />
  </Wrapper>
);

export const FullWidth = () => (
  <Wrapper>
    <DateInput source="published" fullWidth />
  </Wrapper>
);

export const Disabled = () => (
  <Wrapper>
    <DateInput source="published" disabled />
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
