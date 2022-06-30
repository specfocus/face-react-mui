import React from 'react';
import { render } from '@testing-library/react';
import expect from 'expect';

import { BaseRootContext } from '@specfocus/view-focus/layouts/BaseRootContext';
import CreateButton from './CreateButton';

const invalidButtonDomProps = {
  redirect: 'list',
  resource: 'posts',
};

describe('<CreateButton />', () => {
  it('should render a button with no DOM errors', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

    const { getByLabelText } = render(
      <BaseRootContext>
        <CreateButton {...invalidButtonDomProps} />
      </BaseRootContext>
    );

    expect(spy).not.toHaveBeenCalled();
    expect(getByLabelText('action.create').tagName).toEqual('A');

    spy.mockRestore();
  });
});
