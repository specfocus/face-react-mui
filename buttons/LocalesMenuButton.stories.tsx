import { Typography } from '@mui/material';
import englishMessages from '@specfocus/locales/en/core';
import frenchMessages from '@specfocus/locales/fr/core';
import fakeRestDataProvider from '@specfocus/sham-focus.rest';
import createI18nProvider from '@specfocus/view-focus.i18next/providers';
import { Resource } from '@specfocus/view-focus/core';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import { createMemoryHistory } from 'history';
import { AdminContext } from '../core/AdminContext';
import { AdminUI } from '../core/AdminUI';
import { TextField } from '../fields';
import { AppBar, Layout } from '../layouts';
import { Datagrid, List } from '../lists';
import { LocalesMenuButton } from './LocalesMenuButton';

export default { title: 'view-focus.mui/buttons/LocalesMenuButton' };

const i18nProvider = createI18nProvider(
  locale =>
    locale === 'fr'
      ? {
        ...frenchMessages,
        resources: {
          books: {
            name: 'Livre |||| Livres',
            fields: {
              id: 'Id',
              title: 'Titre',
              author: 'Auteur',
              year: 'Année',
            },
          },
        },
      }
      : englishMessages,
  'en' // Default locale
);

const Component = () => {
  const translate = useTranslate();

  return <Typography>{translate('page.dashboard')}</Typography>;
};

export const Basic = () => (
  <AdminContext i18nProvider={i18nProvider}>
    <LocalesMenuButton
      languages={[
        { locale: 'en', name: 'English' },
        { locale: 'fr', name: 'Français' },
      ]}
    />
    <Component />
  </AdminContext>
);

const dataProvider = fakeRestDataProvider({
  books: [
    {
      id: 1,
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      year: 1869,
    },
    {
      id: 2,
      title: 'Pride and Predjudice',
      author: 'Jane Austen',
      year: 1813,
    },
    {
      id: 3,
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      year: 1890,
    },
    {
      id: 4,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      year: 1943,
    },
    {
      id: 5,
      title: "Alice's Adventures in Wonderland",
      author: 'Lewis Carroll',
      year: 1865,
    },
    {
      id: 6,
      title: 'Madame Bovary',
      author: 'Gustave Flaubert',
      year: 1856,
    },
    {
      id: 7,
      title: 'The Lord of the Rings',
      author: 'J. R. R. Tolkien',
      year: 1954,
    },
    {
      id: 8,
      title: "Harry Potter and the Philosopher's Stone",
      author: 'J. K. Rowling',
      year: 1997,
    },
    {
      id: 9,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      year: 1988,
    },
    {
      id: 10,
      title: 'A Catcher in the Rye',
      author: 'J. D. Salinger',
      year: 1951,
    },
    {
      id: 11,
      title: 'Ulysses',
      author: 'James Joyce',
      year: 1922,
    },
  ],
  authors: [],
});

const history = createMemoryHistory({ initialEntries: ['/books'] });

const BookList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="author" />
        <TextField source="year" />
      </Datagrid>
    </List>
  );
};

const MyAppBar = props => (
  <AppBar {...props}>
    <Typography flex="1" variant="h6" id="@specfocus/view-focus.mui-demo-title"></Typography>
    <LocalesMenuButton
      languages={[
        { locale: 'en', name: 'English' },
        { locale: 'fr', name: 'Français' },
      ]}
    />
  </AppBar>
);
const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

export const FullApp = () => (
  <AdminContext
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    history={history}
  >
    <AdminUI layout={MyLayout}>
      <Resource name="books" list={BookList} />
    </AdminUI>
  </AdminContext>
);
