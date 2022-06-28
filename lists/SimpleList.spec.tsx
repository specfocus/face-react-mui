import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { ListContext, ResourceContextProvider } from '@specfocus/view-focus/resources';

import { BaseRootContext } from '../core/BaseRootContext';
import { SimpleList } from './SimpleList';
import { TextField } from '../fields';

const Wrapper = ({ children }: any) => (
  <BaseRootContext>
    <ResourceContextProvider value="posts">
      {children}
    </ResourceContextProvider>
  </BaseRootContext>
);

describe('<SimpleList />', () => {
  it('should render a list of items which provide a record context', async () => {
    render(
      <ListContext.Provider
        value={{
          isLoading: false,
          data: [
            { id: 1, title: 'foo' },
            { id: 2, title: 'bar' },
          ],
          total: 2,
          resource: 'posts',
        }}
      >
        <SimpleList
          primaryText={record => record.id.toString()}
          secondaryText={<TextField source="title" />}
        />
      </ListContext.Provider>,
      { wrapper: Wrapper }
    );

    await waitFor(() => {
      expect(
        within(screen.getByText('1').closest('li')).queryByText('foo')
      ).not.toBeNull();
      expect(
        within(screen.getByText('2').closest('li')).queryByText('bar')
      ).not.toBeNull();
    });
  });

  it.each([
    [
      'edit',
      'edit',
      ['http://localhost/#/posts/1', 'http://localhost/#/posts/2'],
    ],
    [
      'show',
      'show',
      [
        'http://localhost/#/posts/1/show',
        'http://localhost/#/posts/2/show',
      ],
    ],
    [
      'custom',
      (record, id) => `/posts/${id}/custom`,
      [
        'http://localhost/#/posts/1/custom',
        'http://localhost/#/posts/2/custom',
      ],
    ],
  ])(
    'should render %s links for each item',
    async (_, link, expectedUrls) => {
      render(
        <ListContext.Provider
          value={{
            isLoading: false,
            data: [
              { id: 1, title: 'foo' },
              { id: 2, title: 'bar' },
            ],
            total: 2,
            resource: 'posts',
          }}
        >
          <SimpleList
            linkType={link}
            primaryText={record => record.id.toString()}
            secondaryText={<TextField source="title" />}
          />
        </ListContext.Provider>,
        { wrapper: Wrapper }
      );

      await waitFor(() => {
        expect(screen.getByText('1').closest('a').href).toEqual(
          expectedUrls[0]
        );
        expect(screen.getByText('2').closest('a').href).toEqual(
          expectedUrls[1]
        );
      });
    }
  );

  it('should not render links if linkType is false', async () => {
    render(
      <ListContext.Provider
        value={{
          isLoading: false,
          data: [
            { id: 1, title: 'foo' },
            { id: 2, title: 'bar' },
          ],
          total: 2,
          resource: 'posts',
        }}
      >
        <SimpleList
          linkType={false}
          primaryText={record => record.id.toString()}
          secondaryText={<TextField source="title" />}
        />
      </ListContext.Provider>,
      { wrapper: Wrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('1').closest('a')).toBeNull();
      expect(screen.getByText('2').closest('a')).toBeNull();
    });
  });
});
