import React from 'react';
import provideTranslationContextValue from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/general';

import { BaseRootContext } from '../core/BaseRootContext';
import { Create } from '../details';
import { SimpleForm } from '../forms';
import { BooleanInput } from './BooleanInput';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default { title: 'view-focus.mui/inputs/BooleanInput' };

export const Basic = () => (
  <Wrapper>
    <BooleanInput source="published" />
  </Wrapper>
);

export const Disabled = () => (
  <Wrapper>
    <BooleanInput source="published" disabled />
  </Wrapper>
);

export const CustomIcon = () => (
  <Wrapper>
    <BooleanInput source="published" checkedIcon={<FavoriteIcon />} />
  </Wrapper>
);

const i18nProvider = provideTranslationContextValue(() => englishMessages);

const Wrapper = ({ children }) => (
  <BaseRootContext i18nProvider={i18nProvider}>
    <Create resource="posts">
      <SimpleForm>{children}</SimpleForm>
    </Create>
  </BaseRootContext>
);
