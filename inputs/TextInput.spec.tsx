import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { required, testDataProvider } from '@specfocus/view-focus/resources';
import { BaseRootContext } from '../core/BaseRootContext';
import { SimpleForm } from '../forms';
import { TextInput } from './TextInput';

describe('<TextInput />', () => {
  const defaultProps = {
    source: 'title',
    resource: 'posts',
  };

  it('should render the input correctly', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm
          defaultValues={{ title: 'hello' }}
          onSubmit={jest.fn}
        >
          <TextInput {...defaultProps} />
        </SimpleForm>
      </BaseRootContext>
    );
    const TextFieldElement = screen.getByLabelText(
      'resources.posts.fields.title'
    ) as HTMLInputElement;
    expect(TextFieldElement.value).toEqual('hello');
    expect(TextFieldElement.getAttribute('type')).toEqual('text');
  });

  it('should use a ResettableTextField when type is password', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm
          defaultValues={{ title: 'hello' }}
          onSubmit={jest.fn}
        >
          <TextInput {...defaultProps} type="password" />
        </SimpleForm>
      </BaseRootContext>
    );
    const TextFieldElement = screen.getByLabelText(
      'resources.posts.fields.title'
    );
    expect(TextFieldElement.getAttribute('type')).toEqual('password');
  });

  describe('error message', () => {
    it('should not be displayed if field is pristine', () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm onSubmit={jest.fn}>
            <TextInput
              {...defaultProps}
              defaultValue=""
              validate={required()}
            />
          </SimpleForm>
        </BaseRootContext>
      );
      fireEvent.click(screen.getByText('action.save'));
      const error = screen.queryByText('validation.required');
      expect(error).toBeNull();
    });

    it('should not be displayed if field has been touched but is valid', () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm onSubmit={jest.fn}>
            <TextInput
              {...defaultProps}
              defaultValue=""
              validate={required()}
            />
          </SimpleForm>
        </BaseRootContext>
      );

      const input = screen.getByLabelText(
        'resources.posts.fields.title *'
      );
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.click(screen.getByText('action.save'));
      const error = screen.queryByText('validation.required');
      expect(error).toBeNull();
    });

    it('should be displayed if field has been touched and is invalid', async () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm mode="onBlur" onSubmit={jest.fn}>
            <TextInput
              {...defaultProps}
              defaultValue="foo"
              validate={required()}
            />
          </SimpleForm>
        </BaseRootContext>
      );

      const input = screen.getByLabelText(
        'resources.posts.fields.title *'
      );
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.blur(input);
      await waitFor(() => {
        expect(
          screen.queryByText('validation.required')
        ).not.toBeNull();
      });
    });
  });
});
