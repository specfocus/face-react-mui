import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Box, Card, CardContent, styled, Typography } from '@mui/material';
import englishMessages from '@specfocus/locales/en/general';
import frenchMessages from '@specfocus/locales/fr/general';
import fakeRestProvider from '@specfocus/sham-focus.rest';
import useTranslator from '@specfocus/view-focus.i18next/providers';
import { Resource } from '@specfocus/view-focus/resources/Resource';
import { createMemoryHistory } from 'history';
import merge from 'lodash/merge';
import { LocalesMenuButton, ToggleThemeButton } from '../../buttons';
import { defaultTheme, ThemeOptions } from '../../core';
import BaseRoot from '../../core/BaseRoot';
import { DateField } from '../../fields/DateField';
import { NumberField } from '../../fields/NumberField';
import { TextField } from '../../fields/TextField';
import { AppBar, AppBarProps } from '../../layouts/AppBar';
import { Layout, LayoutProps } from '../../layouts/Layout';
import { Datagrid } from '../../lists/datagrid/Datagrid';
import { List } from '../../lists/List';
import { FilterList } from './FilterList';
import { FilterListItem } from './FilterListItem';
import { SavedQueriesList } from './SavedQueriesList';

export default { title: 'view-focus.mui/list/filter/SavedQueriesList' };

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(8),
    order: -1, // display on the left rather than on the right of the list
    minWidth: '15em',
    marginRight: '1em',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Aside = () => (
  <Root>
    <Card>
      <CardContent>
        <SavedQueriesList />
        <FilterList label="Record Company" icon={<BusinessIcon />}>
          <FilterListItem
            label="Apple"
            value={{
              recordCompany: 'Apple',
            }}
          />
          <FilterListItem
            label="Atlantic"
            value={{
              recordCompany: 'Atlantic',
            }}
          />
          <FilterListItem
            label="Capitol"
            value={{
              recordCompany: 'Capitol',
            }}
          />
          <FilterListItem
            label="Chess"
            value={{
              recordCompany: 'Chess',
            }}
          />
          <FilterListItem
            label="Columbia"
            value={{
              recordCompany: 'Columbia',
            }}
          />
          <FilterListItem
            label="DGC"
            value={{
              recordCompany: 'DGC',
            }}
          />
          <FilterListItem
            label="London"
            value={{
              recordCompany: 'London',
            }}
          />
          <FilterListItem
            label="Tamla"
            value={{
              recordCompany: 'Tamla',
            }}
          />
        </FilterList>
        <FilterList label="Released" icon={<DateRangeIcon />}>
          <FilterListItem
            label="50s"
            value={{
              released_gte: '1950-01-01',
              released_lte: '1959-12-31',
            }}
          />
          <FilterListItem
            label="60s"
            value={{
              released_gte: '1960-01-01',
              released_lte: '1969-12-31',
            }}
          />
          <FilterListItem
            label="70s"
            value={{
              released_gte: '1970-01-01',
              released_lte: '1979-12-31',
            }}
          />
          <FilterListItem
            label="80s"
            value={{
              released_gte: '1980-01-01',
              released_lte: '1989-12-31',
            }}
          />
          <FilterListItem
            label="90s"
            value={{
              released_gte: '1990-01-01',
              released_lte: '1999-12-31',
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  </Root>
);

const SongList = () => (
  <List aside={<Aside />}>
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="artist" />
      <TextField source="writer" />
      <TextField source="producer" />
      <TextField source="recordCompany" />
      <NumberField source="rank" />
      <DateField source="released" />
    </Datagrid>
  </List>
);

export const Basic = () => (
  <BaseRoot history={createMemoryHistory()} dataProvider={dataProvider}>
    <Resource name="songs" list={SongList} />
  </BaseRoot>
);

/****************** With Theme and Locale Switcher ********************/

const frenchAppMessages = {
  resources: {
    songs: {
      name: 'Morceau |||| Morceaux',
      fields: {
        title: 'Titre',
        artist: 'Artiste',
        writer: 'Auteur',
        producer: 'Producteur',
        recordCompany: 'Label',
        rank: 'Classement',
        released: 'Publication',
      },
    },
  },
};

const translator = useTranslator(
  'en', // Default locale
  locale =>
    locale === 'fr'
      ? merge(frenchMessages, frenchAppMessages)
      : englishMessages
);
const darkTheme: ThemeOptions = {
  ...defaultTheme,
  palette: {
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff',
    },
    mode: 'dark',
  },
};

const MyAppBar = (props: AppBarProps) => (
  <AppBar {...props}>
    <Box flex="1">
      <Typography variant="h6" id="@specfocus/view-focus.mui-demo-title"></Typography>
    </Box>
    <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
    <LocalesMenuButton
      languages={[
        { locale: 'en', name: 'English' },
        { locale: 'fr', name: 'Français' },
      ]}
    />
  </AppBar>
);

const MyLayout = (props: LayoutProps) => (
  <Layout {...props} appBar={MyAppBar} />
);

export const WithThemeAndLocale = () => (
  <BaseRoot
    history={createMemoryHistory()}
    translator={translator}
    dataProvider={dataProvider}
    layout={MyLayout}
  >
    <Resource name="songs" list={SongList} />
  </BaseRoot>
);

const dataProvider = fakeRestProvider(
  {
    songs: [
      {
        id: 1,
        rank: 1,
        artist: 'Bob Dylan',
        title: 'Like a Rolling Stone',
        writer: 'Bob Dylan',
        producer: 'Tom Wilson',
        released: '1965-07-01',
        recordCompany: 'Columbia',
      },
      {
        id: 2,
        rank: 2,
        artist: 'The Rolling Stones',
        title: '(I Can’t Get No) Satisfaction',
        writer: 'Mick Jagger, Keith Richards',
        producer: 'Andrew Loog Oldham',
        released: '1965-05-01',
        recordCompany: 'London',
      },
      {
        id: 3,
        rank: 3,
        artist: 'John Lennon',
        title: 'Imagine',
        writer: 'John Lennon',
        producer: 'Lennon, Phil Spector, Yoko Ono',
        released: '1971-10-01',
        recordCompany: 'Apple',
      },
      {
        id: 4,
        rank: 4,
        artist: 'Marvin Gaye',
        title: 'What’s Going On',
        writer: 'Gaye, Renaldo Benson, Al Cleveland',
        producer: 'Gaye',
        released: '1971-02-01',
        recordCompany: 'Tamla',
      },
      {
        id: 5,
        rank: 5,
        artist: 'Aretha Franklin',
        title: 'Respect',
        writer: 'Otis Redding',
        producer: 'Jerry Wexler',
        released: '1967-04-01',
        recordCompany: 'Atlantic',
      },
      {
        id: 6,
        rank: 6,
        artist: 'The Beach Boys',
        title: 'Good Vibrations',
        writer: 'Brian Wilson, Mike Love',
        producer: 'Brian Wilson',
        released: '1966-10-01',
        recordCompany: 'Capitol',
      },
      {
        id: 7,
        rank: 7,
        artist: 'Chuck Berry',
        title: 'Johnny B. Goode',
        writer: 'Chuck Berry',
        producer: 'Leonard and Phil Chess',
        released: '1958-04-01',
        recordCompany: 'Chess',
      },
      {
        id: 8,
        rank: 8,
        artist: 'The Beatles',
        title: 'Hey Jude',
        writer: 'John Lennon, Paul McCartney',
        producer: 'George Martin',
        released: '1968-08-01',
        recordCompany: 'Apple',
      },
      {
        id: 9,
        rank: 9,
        artist: 'Nirvana',
        title: 'Smells Like Teen Spirit',
        writer: 'Kurt Cobain',
        producer: 'Butch Vig',
        released: '1991-09-01',
        recordCompany: 'DGC',
      },
      {
        id: 10,
        rank: 10,
        artist: 'Ray Charles',
        title: 'What’d I Say',
        writer: 'Ray Charles',
        producer: 'Ahmet Ertegun, Jerry Wexler',
        released: '1959-06-01',
        recordCompany: 'Atlantic',
      },
    ],
  },
  true
);
