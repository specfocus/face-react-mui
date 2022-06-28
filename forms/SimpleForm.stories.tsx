import { Stack } from '@mui/material';
import { ResourceContextProvider } from '@specfocus/view-focus/resources';
import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { BaseRootContext } from '../core/BaseRootContext';
import { Edit } from '../details';
import { NumberInput, TextInput } from '../inputs';
import { SimpleForm } from './SimpleForm';

export default { title: 'view-focus.mui/forms/SimpleForm' };

const data = {
  id: 1,
  title: 'War and Peace',
  author: 'Leo Tolstoy',
  year: 1869,
};

const Wrapper = ({ children }) => (
  <BaseRootContext
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
  </BaseRootContext>
);

export const Basic = () => (
  <Wrapper>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="author" />
      <NumberInput source="year" />
    </SimpleForm>
  </Wrapper>
);

export const CustomLayout = () => (
  <Wrapper>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <Stack direction="row" gap={1} width="100%">
        <TextInput source="author" sx={{ width: '50%' }} />
        <NumberInput source="year" sx={{ width: '50%' }} />
      </Stack>
    </SimpleForm>
  </Wrapper>
);

export const StackProps = () => (
  <Wrapper>
    <SimpleForm spacing={3} alignItems="center">
      <TextInput source="title" fullWidth />
      <TextInput source="author" />
      <NumberInput source="year" />
    </SimpleForm>
  </Wrapper>
);

export const NoToolbar = () => (
  <Wrapper>
    <SimpleForm toolbar={false}>
      <TextInput source="title" fullWidth />
      <TextInput source="author" />
      <NumberInput source="year" />
    </SimpleForm>
  </Wrapper>
);
