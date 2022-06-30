import React from 'react';
import useTranslator from '@specfocus/view-focus.i18next/providers';
import englishMessages from '@specfocus/locales/en/general';

import { BaseRootContext } from '@specfocus/view-focus/layouts/BaseRootContext';
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

const translator = useTranslator('en', () => englishMessages);

const Wrapper = ({ children }) => (
  <BaseRootContext translator={translator}>
    <Create resource="posts">
      <SimpleForm>{children}</SimpleForm>
    </Create>
  </BaseRootContext>
);
