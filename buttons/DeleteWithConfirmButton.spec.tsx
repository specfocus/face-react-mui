import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import expect from 'expect';
import { CoreAdminContext } from '@specfocus/view-focus/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DeleteWithConfirmButton } from './DeleteWithConfirmButton';
import { Toolbar, SimpleForm } from '../forms';
import { Edit } from '../details';
import { TextInput } from '../inputs';
import { Notification } from '../layouts';
import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import type { MutationMode } from '@specfocus/view-focus.data/operations/MutationMode';

const theme = createTheme();

const invalidButtonDomProps = {
  record: { id: 123, foo: 'bar' },
  redirect: 'list',
  resource: 'posts',
  mutationMode: 'pessimistic' as MutationMode,
};

describe('<DeleteWithConfirmButton />', () => {
  it('should render a button with no DOM errors', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(
      <CoreAdminContext dataProvider={testDataProvider()}>
        <ThemeProvider theme={theme}>
          <DeleteWithConfirmButton {...invalidButtonDomProps} />
        </ThemeProvider>
      </CoreAdminContext>
    );

    expect(spy).not.toHaveBeenCalled();
    expect(
      screen.getByLabelText('action.delete').getAttribute('type')
    ).toEqual('button');

    spy.mockRestore();
  });

  const defaultEditProps = {
    id: '123',
    resource: 'posts',
    location: {},
    match: {},
    mutationMode: 'pessimistic' as MutationMode,
  };

  it('should allow to override the resource', async () => {
    const dataProvider = testDataProvider({
      getOne: () =>
        // @ts-ignore
        Promise.resolve({
          data: { id: 123, title: 'lorem' },
        }),
      delete: jest.fn().mockResolvedValueOnce({ data: { id: 123 } }),
    });
    const EditToolbar = props => (
      <Toolbar {...props}>
        <DeleteWithConfirmButton resource="comments" />
      </Toolbar>
    );
    render(
      <ThemeProvider theme={theme}>
        <CoreAdminContext dataProvider={dataProvider}>
          <Edit {...defaultEditProps}>
            <SimpleForm toolbar={<EditToolbar />}>
              <TextInput source="title" />
            </SimpleForm>
          </Edit>
        </CoreAdminContext>
      </ThemeProvider>
    );
    // waitFor for the dataProvider.getOne() return
    await waitFor(() => {
      expect(screen.queryByDisplayValue('lorem')).not.toBeNull();
    });
    fireEvent.click(screen.getByLabelText('action.delete'));
    fireEvent.click(screen.getByText('action.confirm'));
    await waitFor(() => {
      expect(dataProvider.delete).toHaveBeenCalledWith('comments', {
        id: 123,
        previousData: { id: 123, title: 'lorem' },
      });
    });
  });

  it('should allows to undo the deletion after confirmation if mutationMode is undoable', async () => {
    const dataProvider = testDataProvider({
      getOne: () =>
        // @ts-ignore
        Promise.resolve({
          data: { id: 123, title: 'lorem' },
        }),
      delete: jest.fn().mockResolvedValueOnce({ data: { id: 123 } }),
    });
    const EditToolbar = props => (
      <Toolbar {...props}>
        <DeleteWithConfirmButton mutationMode="undoable" />
      </Toolbar>
    );
    render(
      <ThemeProvider theme={theme}>
        <CoreAdminContext dataProvider={dataProvider}>
          <>
            <Edit {...defaultEditProps}>
              <SimpleForm toolbar={<EditToolbar />}>
                <TextInput source="title" />
              </SimpleForm>
            </Edit>
            <Notification />
          </>
        </CoreAdminContext>
      </ThemeProvider>
    );
    // waitFor for the dataProvider.getOne() return
    await waitFor(() => {
      expect(screen.queryByDisplayValue('lorem')).not.toBeNull();
    });
    fireEvent.click(screen.getByLabelText('action.delete'));
    fireEvent.click(screen.getByText('action.confirm'));

    await waitFor(() => {
      expect(
        screen.queryByText('notification.deleted')
      ).not.toBeNull();
    });
    expect(screen.queryByText('action.undo')).not.toBeNull();
  });

  it('should allow to override the success side effects', async () => {
    const dataProvider = testDataProvider({
      getOne: () =>
        // @ts-ignore
        Promise.resolve({
          data: { id: 123, title: 'lorem' },
        }),
      delete: jest.fn().mockResolvedValueOnce({ data: { id: 123 } }),
    });
    const onSuccess = jest.fn();
    const EditToolbar = props => (
      <Toolbar {...props}>
        <DeleteWithConfirmButton mutationOptions={{ onSuccess }} />
      </Toolbar>
    );
    render(
      <ThemeProvider theme={theme}>
        <CoreAdminContext dataProvider={dataProvider}>
          <Edit {...defaultEditProps}>
            <SimpleForm toolbar={<EditToolbar />}>
              <TextInput source="title" />
            </SimpleForm>
          </Edit>
        </CoreAdminContext>
      </ThemeProvider>
    );
    // waitFor for the dataProvider.getOne() return
    await waitFor(() => {
      expect(screen.queryByDisplayValue('lorem')).not.toBeNull();
    });
    fireEvent.click(screen.getByLabelText('action.delete'));
    fireEvent.click(screen.getByText('action.confirm'));
    await waitFor(() => {
      expect(dataProvider.delete).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalledWith(
        { id: 123 },
        {
          id: 123,
          previousData: { id: 123, title: 'lorem' },
          resource: 'posts',
        },
        { snapshot: [] }
      );
    });
  });

  it('should allow to override the error side effects', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    const dataProvider = testDataProvider({
      getOne: () =>
        // @ts-ignore
        Promise.resolve({
          data: { id: 123, title: 'lorem' },
        }),
      delete: jest.fn().mockRejectedValueOnce(new Error('not good')),
    });
    const onError = jest.fn();
    const EditToolbar = props => (
      <Toolbar {...props}>
        <DeleteWithConfirmButton mutationOptions={{ onError }} />
      </Toolbar>
    );
    render(
      <ThemeProvider theme={theme}>
        <CoreAdminContext dataProvider={dataProvider}>
          <Edit {...defaultEditProps}>
            <SimpleForm toolbar={<EditToolbar />}>
              <TextInput source="title" />
            </SimpleForm>
          </Edit>
        </CoreAdminContext>
      </ThemeProvider>
    );
    // waitFor for the dataProvider.getOne() return
    await waitFor(() => {
      expect(screen.queryByDisplayValue('lorem')).toBeDefined();
    });
    fireEvent.click(screen.getByLabelText('action.delete'));
    fireEvent.click(screen.getByText('action.confirm'));
    await waitFor(() => {
      expect(dataProvider.delete).toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(
        new Error('not good'),
        {
          id: 123,
          previousData: { id: 123, title: 'lorem' },
          resource: 'posts',
        },
        { snapshot: [] }
      );
    });
  });

  it('should allow to override the translateOptions props', async () => {
    const dataProvider = testDataProvider({
      getOne: () =>
        // @ts-ignore
        Promise.resolve({
          data: { id: 123, title: 'lorem' },
        }),
      // @ts-ignore
      delete: () => Promise.resolve({ data: { id: 123 } }),
    });

    const translateOptions = {
      id: '#20061703',
    };
    const EditToolbar = props => (
      <Toolbar {...props}>
        <DeleteWithConfirmButton translateOptions={translateOptions} />
      </Toolbar>
    );
    render(
      <ThemeProvider theme={theme}>
        <CoreAdminContext dataProvider={dataProvider}>
          <Edit {...defaultEditProps}>
            <SimpleForm toolbar={<EditToolbar />}>
              <TextInput source="title" />
            </SimpleForm>
          </Edit>
        </CoreAdminContext>
      </ThemeProvider>
    );

    // waitFor for the dataProvider.getOne() return
    await waitFor(() => {
      expect(screen.queryByDisplayValue('lorem')).toBeDefined();
    });

    fireEvent.click(screen.getByLabelText('action.delete'));
    expect(screen.queryByDisplayValue('#20061703')).toBeDefined();
  });
});
