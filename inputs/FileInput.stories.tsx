import createI18nProvider from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/core';
import { AdminContext } from '../core/AdminContext';
import { Create } from '../details';
import { FileField } from '../fields';
import { SimpleForm } from '../forms';
import { FileInput } from './FileInput';

export default { title: 'view-focus.mui/inputs/FileInput' };

export const Basic = () => (
  <Wrapper>
    <FileInput source="attachment">
      <FileField source="src" title="title" />
    </FileInput>
  </Wrapper>
);

export const LimitByFileType = () => (
  <Wrapper>
    <FileInput source="attachment" accept="application/pdf">
      <FileField source="src" title="title" />
    </FileInput>
  </Wrapper>
);

export const CustomPreview = () => (
  <Wrapper>
    <FileInput source="attachment" accept="image/*">
      <FileField
        sx={{
          borderWidth: 4,
          borderColor: 'blue',
          borderStyle: 'solid',
        }}
        source="src"
        title="title"
      />
    </FileInput>
  </Wrapper>
);

export const Multiple = () => (
  <Wrapper>
    <FileInput source="attachments" multiple>
      <FileField source="src" title="title" />
    </FileInput>
  </Wrapper>
);

export const FullWidth = () => (
  <Wrapper>
    <FileInput source="attachment" fullWidth>
      <FileField source="src" title="title" />
    </FileInput>
  </Wrapper>
);

export const Disabled = () => (
  <Wrapper>
    <FileInput source="attachment" disabled>
      <FileField source="src" title="title" />
    </FileInput>
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
