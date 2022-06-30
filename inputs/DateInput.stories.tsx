import React from 'react';
import useTranslator from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/general';
import { BaseRootContext } from '@specfocus/view-focus/layouts/BaseRootContext';
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

const translator = useTranslator('en', () => englishMessages);

const Wrapper = ({ children }) => (
  <BaseRootContext translator={translator}>
    <Create resource="posts">
      <SimpleForm>{children}</SimpleForm>
    </Create>
  </BaseRootContext>
);
