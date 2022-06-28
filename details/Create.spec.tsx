import React from 'react';
import expect from 'expect';
import { BaseRootContext } from '@specfocus/view-focus/resources';
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
      <BaseRootContext dataProvider={testDataProvider()}>
        <Create {...defaultCreateProps} aside={<Aside />}>
          <Dummy />
        </Create>
      </BaseRootContext>
    );
    expect(screen.queryAllByText('Hello')).toHaveLength(1);
  });
});
