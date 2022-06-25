import { Divider as MuiDivider } from '@mui/material';
import { ResourceContext } from '@specfocus/view-focus/core';
import { RecordContextProvider } from '@specfocus/view-focus/records/RecordContext';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import { WithRecord } from '@specfocus/view-focus/records/WithRecord';
import { MemoryRouter } from 'react-router-dom';
import { Labeled } from '../core/Labeled';
import { NumberField, TextField } from '../fields';
import { Tab } from './Tab';
import { TabbedShowLayout } from './TabbedShowLayout';

export default { title: 'view-focus.mui/details/TabbedShowLayout' };

const record = {
  id: 1,
  title: 'War and Peace',
  author: 'Leo Tolstoy',
  summary:
    "War and Peace broadly focuses on Napoleon's invasion of Russia, and the impact it had on Tsarist society. The book explores themes such as revolution, revolution and empire, the growth and decline of various states and the impact it had on their economies, culture, and society.",
  year: 1869,
};

export const Basic = () => (
  <MemoryRouter>
    <ResourceContext.Provider value="books">
      <RecordContextProvider value={record}>
        <TabbedShowLayout>
          <Tab label="First">
            <TextField source="id" />
            <TextField source="title" />
          </Tab>
          <Tab label="Second">
            <TextField source="author" />
            <TextField source="summary" />
            <NumberField source="year" />
          </Tab>
        </TabbedShowLayout>
      </RecordContextProvider>
    </ResourceContext.Provider>
  </MemoryRouter>
);

const BookTitle = () => {
  const record = useRecordContext();
  return record ? <span>{record.title}</span> : null;
};

export const CustomChild = () => (
  <MemoryRouter>
    <ResourceContext.Provider value="books">
      <RecordContextProvider value={record}>
        <TabbedShowLayout>
          <Tab label="First">
            <BookTitle />
            <WithRecord
              render={record => <span>{record.author}</span>}
            />
          </Tab>
        </TabbedShowLayout>
      </RecordContextProvider>
    </ResourceContext.Provider>
  </MemoryRouter>
);

export const CustomLabel = () => (
  <MemoryRouter>
    <ResourceContext.Provider value="books">
      <RecordContextProvider value={record}>
        <TabbedShowLayout>
          <Tab label="First">
            <TextField label="Identifier" source="id" />
            <TextField source="title" />
            <Labeled label="Author name">
              <TextField source="author" />
            </Labeled>
            <TextField label={false} source="summary" />
            <NumberField source="year" />
          </Tab>
        </TabbedShowLayout>
      </RecordContextProvider>
    </ResourceContext.Provider>
  </MemoryRouter>
);

export const Spacing = () => (
  <MemoryRouter>
    <ResourceContext.Provider value="books">
      <RecordContextProvider value={record}>
        <TabbedShowLayout spacing={3}>
          <Tab label="First">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="author" />
            <TextField source="summary" />
            <NumberField source="year" />
          </Tab>
        </TabbedShowLayout>
      </RecordContextProvider>
    </ResourceContext.Provider>
  </MemoryRouter>
);

export const Divider = () => (
  <MemoryRouter>
    <ResourceContext.Provider value="books">
      <RecordContextProvider value={record}>
        <TabbedShowLayout divider={<MuiDivider />}>
          <Tab label="First">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="author" />
            <TextField source="summary" />
            <NumberField source="year" />
          </Tab>
        </TabbedShowLayout>
      </RecordContextProvider>
    </ResourceContext.Provider>
  </MemoryRouter>
);

export const SX = () => (
  <MemoryRouter>
    <ResourceContext.Provider value="books">
      <RecordContextProvider value={record}>
        <TabbedShowLayout
          sx={{
            margin: 2,
            padding: 2,
            bgcolor: 'text.disabled',
          }}
        >
          <Tab label="First">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="author" />
            <TextField source="summary" />
            <NumberField source="year" />
          </Tab>
        </TabbedShowLayout>
      </RecordContextProvider>
    </ResourceContext.Provider>
  </MemoryRouter>
);
