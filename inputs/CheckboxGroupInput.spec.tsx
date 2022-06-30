import React from 'react';
import expect from 'expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  testDataProvider,
  TestTranslationProvider,
  useRecordContext,
  Form,
} from '@specfocus/view-focus/resources';

import { BaseRootContext } from '@specfocus/view-focus/layouts/BaseRootContext';
import { SimpleForm } from '../forms';
import { CheckboxGroupInput } from './CheckboxGroupInput';

describe('<CheckboxGroupInput />', () => {
  const defaultProps = {
    source: 'tags',
    resource: 'posts',
    choices: [
      { id: 'ang', name: 'Angular' },
      { id: 'rct', name: 'React' },
    ],
  };

  it('should render choices as checkbox components', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput {...defaultProps} />
        </SimpleForm>
      </BaseRootContext>
    );
    const input1 = screen.getByLabelText('Angular') as HTMLInputElement;
    expect(input1.type).toBe('checkbox');
    expect(input1.value).toBe('ang');
    expect(input1.checked).toBe(false);
    const input2 = screen.getByLabelText('React') as HTMLInputElement;
    expect(input2.type).toBe('checkbox');
    expect(input2.value).toBe('rct');
    expect(input2.checked).toBe(false);
  });

  it('should use the input parameter value as the initial input value', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm
          onSubmit={jest.fn}
          defaultValues={{
            tags: ['ang'],
          }}
        >
          <CheckboxGroupInput
            {...defaultProps}
            choices={[
              { id: 'ang', name: 'Angular' },
              { id: 'rct', name: 'React' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input1 = screen.getByLabelText('Angular') as HTMLInputElement;
    expect(input1.checked).toEqual(true);
    const input2 = screen.getByLabelText('React') as HTMLInputElement;
    expect(input2.checked).toEqual(false);
  });

  it('should use optionValue as value identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput
            {...defaultProps}
            optionValue="foobar"
            choices={[{ foobar: 'foo', name: 'Bar' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('Bar') as HTMLInputElement;
    expect(input.value).toBe('foo');
  });

  it('should use optionValue including "." as value identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput
            {...defaultProps}
            optionValue="foobar.id"
            choices={[{ foobar: { id: 'foo' }, name: 'Bar' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('Bar') as HTMLInputElement;
    expect(input.value).toBe('foo');
  });

  it('should use optionText with a string value as text identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput
            {...defaultProps}
            optionText="foobar"
            choices={[{ id: 'foo', foobar: 'Bar' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    expect(screen.queryByLabelText('Bar')).not.toBeNull();
  });

  it('should use optionText with a string value including "." as text identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput
            {...defaultProps}
            optionText="foobar.name"
            choices={[{ id: 'foo', foobar: { name: 'Bar' } }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    expect(screen.queryByLabelText('Bar')).not.toBeNull();
  });

  it('should use optionText with a function value as text identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput
            {...defaultProps}
            optionText={choice => choice.foobar}
            choices={[{ id: 'foo', foobar: 'Bar' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    expect(screen.queryByLabelText('Bar')).not.toBeNull();
  });

  it('should use optionText with an element value as text identifier', () => {
    const Foobar = () => {
      const record = useRecordContext();
      return <span data-testid="label">{record.foobar}</span>;
    };
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput
            {...defaultProps}
            optionText={<Foobar />}
            choices={[{ id: 'foo', foobar: 'Bar' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    expect(screen.queryByLabelText('Bar')).not.toBeNull();
    expect(screen.queryByTestId('label')).not.toBeNull();
  });

  it('should translate the choices by default', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <TestTranslationProvider
          messages={{
            Angular: 'Angular **',
            React: 'React **',
          }}
        >
          <SimpleForm onSubmit={jest.fn}>
            <CheckboxGroupInput {...defaultProps} />
          </SimpleForm>
        </TestTranslationProvider>
      </BaseRootContext>
    );
    expect(screen.queryByLabelText('Angular **')).not.toBeNull();
    expect(screen.queryByLabelText('React **')).not.toBeNull();
  });

  it('should not translate the choices if translateChoice is false', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <TestTranslationProvider
          messages={{
            Angular: 'Angular **',
            React: 'React **',
          }}
        >
          <SimpleForm onSubmit={jest.fn}>
            <CheckboxGroupInput
              {...defaultProps}
              translateChoice={false}
            />
          </SimpleForm>
        </TestTranslationProvider>
      </BaseRootContext>
    );
    expect(screen.queryByLabelText('Angular **')).toBeNull();
    expect(screen.queryByLabelText('React **')).toBeNull();
    expect(screen.queryByLabelText('Angular')).not.toBeNull();
    expect(screen.queryByLabelText('React')).not.toBeNull();
  });

  it('should display helperText', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn}>
          <CheckboxGroupInput
            {...defaultProps}
            helperText="Can I help you?"
          />
        </SimpleForm>
      </BaseRootContext>
    );
    expect(screen.queryByText('Can I help you?')).not.toBeNull();
  });

  it('should not parse selected values types to numbers if all choices types are non numbers', async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <Form
          onSubmit={handleSubmit}
          defaultValues={{ notifications: ['31', '42'] }}
        >
          <CheckboxGroupInput
            source="notifications"
            choices={[
              { id: '12', name: 'Ray Hakt' },
              { id: '31', name: 'Ann Gullar' },
              { id: '42', name: 'Sean Phonee' },
            ]}
          />
          <button type="submit" aria-label="Save" />
        </Form>
      </BaseRootContext>
    );
    const input = getByLabelText('Ray Hakt') as HTMLInputElement;
    fireEvent.click(input);
    fireEvent.click(getByLabelText('Save'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        notifications: ['31', '42', '12'],
      });
    });
  });

  it('should parse selected values types to numbers if some choices are numbers', async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <Form
          onSubmit={handleSubmit}
          defaultValues={{ notifications: [31, 42] }}
        >
          <CheckboxGroupInput
            source="notifications"
            choices={[
              { id: 12, name: 'Ray Hakt' },
              { id: 31, name: 'Ann Gullar' },
              { id: 42, name: 'Sean Phonee' },
            ]}
          />
          <button type="submit" aria-label="Save" />
        </Form>
      </BaseRootContext>
    );
    const input = getByLabelText('Ray Hakt') as HTMLInputElement;
    fireEvent.click(input);
    fireEvent.click(getByLabelText('Save'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        notifications: [31, 42, 12],
      });
    });
  });

  describe('error message', () => {
    it('should not be displayed if field is pristine', () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm onSubmit={jest.fn}>
            <CheckboxGroupInput
              {...defaultProps}
              validate={() => 'error'}
            />
          </SimpleForm>
        </BaseRootContext>
      );
      expect(screen.queryByText('error')).toBeNull();
    });

    it('should be empty if field has been touched but is valid', () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm onSubmit={jest.fn}>
            <CheckboxGroupInput
              {...defaultProps}
              validate={() => 'error'}
            />
          </SimpleForm>
        </BaseRootContext>
      );
      expect(screen.queryByText('error')).toBeNull();
    });

    it('should be displayed if field has been touched and is invalid', async () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm onSubmit={jest.fn} mode="onBlur">
            <CheckboxGroupInput
              {...defaultProps}
              validate={() => 'error'}
            />
          </SimpleForm>
        </BaseRootContext>
      );
      const input = screen.queryByLabelText(
        'Angular'
      ) as HTMLInputElement;

      fireEvent.click(input);
      await waitFor(() => {
        expect(screen.queryByText('error')).not.toBeNull();
      });
    });
  });

  it('should not render a LinearProgress if loading is true and a second has not passed yet', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <CheckboxGroupInput
            {...defaultProps}
            isFetching
            isLoading
          />
        </SimpleForm>
      </BaseRootContext>
    );

    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('should render a LinearProgress if loading is true, choices are empty and a second has passed', async () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm mode="onBlur" onSubmit={jest.fn()}>
          <CheckboxGroupInput
            {...defaultProps}
            choices={[]}
            isFetching
            isLoading
          />
        </SimpleForm>
      </BaseRootContext>
    );

    await new Promise(resolve => setTimeout(resolve, 1001));

    expect(screen.queryByRole('progressbar')).not.toBeNull();
  });

  it('should not render a LinearProgress if loading is false', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <CheckboxGroupInput {...defaultProps} />
        </SimpleForm>
      </BaseRootContext>
    );

    expect(screen.queryByRole('progressbar')).toBeNull();
  });
});
