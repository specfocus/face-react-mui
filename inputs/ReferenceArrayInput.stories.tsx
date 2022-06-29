import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { Form } from '@specfocus/view-focus/forms/Form';
import provideTranslationContextValue from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/general';
import { DatagridInput } from '.';
import { BaseRootContext } from '../core/BaseRootContext';
import { TextField } from '../fields';
import { ReferenceArrayInput } from './ReferenceArrayInput';

export default { title: 'view-focus.mui/inputs/ReferenceArrayInput' };

const dataProvider = testDataProvider({
  getList: () =>
    // @ts-ignore
    Promise.resolve({
      data: [
        { id: 5, name: 'test1' },
        { id: 6, name: 'test2' },
      ],
      total: 2,
    }),
  // @ts-ignore
  getMany: (resource, params) => {
    console.log('getMany', resource, params);
    return Promise.resolve({ data: [{ id: 5, name: 'test1' }] });
  },
});

const i18nProvider = provideTranslationContextValue(() => englishMessages);

export const WithDatagridChild = () => (
  <BaseRootContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
    <Form
      onSubmit={() => { }}
      defaultValues={{ tag_ids: [5] }}
    >
      <ReferenceArrayInput
        reference="tags"
        resource="posts"
        source="tag_ids"
      >
        <DatagridInput rowClick="toggleSelection" sx={{ mt: 6 }}>
          <TextField source="name" />
        </DatagridInput>
      </ReferenceArrayInput>
    </Form>
  </BaseRootContext>
);
