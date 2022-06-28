import React from 'react';
import createTranslationProvider from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/general';

import { AdminContext } from '../core/AdminContext';
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

const i18nProvider = createTranslationProvider(() => englishMessages);

const Wrapper = ({ children }) => (
  <AdminContext i18nProvider={i18nProvider}>
    <Create resource="posts">
      <SimpleForm>{children}</SimpleForm>
    </Create>
  </AdminContext>
);
