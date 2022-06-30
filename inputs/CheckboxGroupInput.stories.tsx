import { Typography } from '@mui/material';
import i18nProviderFactory from '@specfocus/view-focus.i18next/providers';
import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import englishMessages from '@specfocus/locales/en/general';
import { BaseRootContext } from '@specfocus/view-focus/layouts/BaseRootContext';
import { Create } from '../details';
import { SimpleForm } from '../forms';
import { CheckboxGroupInput } from './CheckboxGroupInput';
import { ReferenceArrayInput } from './ReferenceArrayInput';

export default { title: 'view-focus.mui/inputs/CheckboxGroupInput' };

const choices = [
  { id: 1, name: 'Option 1', details: 'This is option 1' },
  { id: 2, name: 'Option 2', details: 'This is option 2' },
  { id: 3, name: 'Option 3', details: 'This is option 3' },
  { id: 4, name: 'Option 4', details: 'This is option 4' },
  { id: 5, name: 'Option 5', details: 'This is option 5' },
  { id: 6, name: 'Option 6', details: 'This is option 6' },
];

export const Basic = () => (
  <BaseRootContext translator={i18nProviderFactory(() => englishMessages)}>
    <Create
      resource="posts"
      record={{ options: [1, 2] }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <CheckboxGroupInput source="options" choices={choices} />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

const dataProvider = testDataProvider({
  getList: () => Promise.resolve({ data: choices, total: choices.length } as any),
  getMany: (resource, params) =>
    Promise.resolve({
      data: choices.filter(choice => params.ids.includes(choice.id)),
      total: choices.length,
    } as any),
});

export const InsideReferenceArrayInput = () => (
  <BaseRootContext dataProvider={dataProvider} translator={i18nProviderFactory(() => englishMessages)}>
    <Create
      resource="posts"
      record={{ options: [1, 2] }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <ReferenceArrayInput reference="options" source="options">
          <CheckboxGroupInput />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Disabled = () => (
  <BaseRootContext translator={i18nProviderFactory(() => englishMessages)}>
    <Create
      resource="posts"
      record={{ options: [1, 2] }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <CheckboxGroupInput
          source="options"
          disabled
          choices={choices}
        />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Column = () => (
  <BaseRootContext translator={i18nProviderFactory(() => englishMessages)}>
    <Create
      resource="posts"
      record={{ options: [1, 2] }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <CheckboxGroupInput
          source="options"
          choices={choices}
          row={false}
        />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const CustomOptionText = () => (
  <BaseRootContext translator={i18nProviderFactory(() => englishMessages)}>
    <Create
      resource="posts"
      record={{ options: [1, 2] }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <CheckboxGroupInput
          source="options"
          optionText={<OptionText />}
          choices={choices}
          row={false}
          sx={{
            '& .MuiFormControlLabel-root': {
              alignItems: 'start',
            },
          }}
        />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

const OptionText = () => {
  const record = useRecordContext();
  return (
    <>
      <Typography sx={{ marginTop: 0.5 }}>{record.name}</Typography>
      <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
        {record.details}
      </Typography>
    </>
  );
};
