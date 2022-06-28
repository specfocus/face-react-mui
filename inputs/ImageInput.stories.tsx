import createTranslationProvider from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/general';
import { BaseRootContext } from '../core/BaseRootContext';
import { Create } from '../details';
import { ImageField } from '../fields';
import { SimpleForm } from '../forms';
import { ImageInput } from './ImageInput';

export default { title: 'view-focus.mui/inputs/ImageInput' };

export const Basic = () => (
  <Wrapper>
    <ImageInput source="image">
      <ImageField source="attachment" title="title" />
    </ImageInput>
  </Wrapper>
);

export const LimitByFileType = () => (
  <Wrapper>
    <ImageInput source="image" accept="image/png">
      <ImageField source="attachment" title="title" />
    </ImageInput>
  </Wrapper>
);

export const CustomPreview = () => (
  <Wrapper>
    <ImageInput source="image" accept="image/*">
      <ImageField
        sx={{
          borderWidth: 4,
          borderColor: 'blue',
          borderStyle: 'solid',
        }}
        source="attachment"
        title="title"
      />
    </ImageInput>
  </Wrapper>
);

export const Multiple = () => (
  <Wrapper>
    <ImageInput source="attachments" multiple>
      <ImageField source="src" title="title" />
    </ImageInput>
  </Wrapper>
);

export const FullWidth = () => (
  <Wrapper>
    <ImageInput source="attachment" fullWidth>
      <ImageField source="src" title="title" />
    </ImageInput>
  </Wrapper>
);

export const Disabled = () => (
  <Wrapper>
    <ImageInput source="attachment" disabled>
      <ImageField source="src" title="title" />
    </ImageInput>
  </Wrapper>
);

const i18nProvider = createTranslationProvider(() => englishMessages);

const Wrapper = ({ children }) => (
  <BaseRootContext i18nProvider={i18nProvider}>
    <Create resource="posts">
      <SimpleForm>{children}</SimpleForm>
    </Create>
  </BaseRootContext>
);
