import { Stack } from '@mui/material';
import { ResourceContextProvider } from '@specfocus/view-focus/core';
import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { AdminContext } from '../core/AdminContext';
import { Edit } from '../details';
import { NumberInput, TextInput } from '../inputs';
import { FormTab } from './FormTab';
import { TabbedForm } from './TabbedForm';

export default { title: 'view-focus.mui/forms/TabbedForm' };

const data = {
  id: 1,
  title: 'War and Peace',
  author: 'Leo Tolstoy',
  bio:
    'Leo Tolstoy (1828-1910) was a Russian writer who is regarded as one of the greatest authors of all time. He received nominations for the Nobel Prize in Literature every year from 1902 to 1906 and for the Nobel Peace Prize in 1901, 1902, and 1909.',
  year: 1869,
};

const Wrapper = ({ children }) => (
  <AdminContext
    i18nProvider={{
      translate: (x, options) => options?._ ?? x,
      changeLocale: () => Promise.resolve(),
      getLocale: () => 'en',
    }}
    dataProvider={testDataProvider({
      getOne: () => Promise.resolve({ data } as any),
    })}
  >
    <ResourceContextProvider value="books">
      <Edit id={1} sx={{ width: 600 }}>
        {children}
      </Edit>
    </ResourceContextProvider>
  </AdminContext>
);

export const Basic = () => (
  <Wrapper>
    <TabbedForm>
      <FormTab label="main">
        <TextInput source="title" fullWidth />
        <TextInput source="author" />
        <NumberInput source="year" />
      </FormTab>
    </TabbedForm>
  </Wrapper>
);

export const MultipleTabs = () => (
  <Wrapper>
    <TabbedForm>
      <FormTab label="main">
        <TextInput source="title" fullWidth />
        <TextInput source="author" />
        <NumberInput source="year" />
      </FormTab>
      <FormTab label="details">
        <TextInput multiline source="bio" fullWidth />
      </FormTab>
    </TabbedForm>
  </Wrapper>
);

export const CustomLayout = () => (
  <Wrapper>
    <TabbedForm>
      <FormTab label="main">
        <TextInput source="title" fullWidth />
        <Stack direction="row" gap={1} width="100%">
          <TextInput source="author" sx={{ width: '50%' }} />
          <NumberInput source="year" sx={{ width: '50%' }} />
        </Stack>
      </FormTab>
    </TabbedForm>
  </Wrapper>
);

export const NoToolbar = () => (
  <Wrapper>
    <TabbedForm toolbar={false}>
      <FormTab label="main">
        <TextInput source="title" fullWidth />
        <TextInput source="author" sx={{ width: '50%' }} />
        <NumberInput source="year" sx={{ width: '50%' }} />
      </FormTab>
    </TabbedForm>
  </Wrapper>
);
