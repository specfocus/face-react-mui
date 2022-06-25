import React from 'react';
import expect from 'expect';
import { CoreAdminContext } from '@specfocus/view-focus/core';
import { screen, render } from '@testing-library/react';
import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';

import { Create } from './Create';

describe('<Create />', () => {
  const defaultCreateProps = {
    id: '123',
    resource: 'foo',
    location: {},
    match: {},
  };

  it('should display aside component', () => {
    const Dummy = () => <div />;
    const Aside = () => <div id="aside">Hello</div>;
    render(
      <CoreAdminContext dataProvider={testDataProvider()}>
        <Create {...defaultCreateProps} aside={<Aside />}>
          <Dummy />
        </Create>
      </CoreAdminContext>
    );
    expect(screen.queryAllByText('Hello')).toHaveLength(1);
  });
});
