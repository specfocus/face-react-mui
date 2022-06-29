import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  testDataProvider,
  TestTranslationProvider,
  useRecordContext,
} from '@specfocus/view-focus/resources';

import { BaseRootContext } from '../core/BaseRootContext';
import { SimpleForm } from '../forms';
import { AutocompleteArrayInput } from './AutocompleteArrayInput';
import { useCreateSuggestionContext } from './useSupportCreateSuggestion';

describe('<AutocompleteArrayInput />', () => {
  const defaultProps = {
    source: 'tags',
    resource: 'posts',
  };

  it('should extract suggestions from choices', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    userEvent.type(
      screen.getByLabelText('resources.posts.fields.tags'),
      'a'
    );
    expect(screen.queryAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('Technical')).not.toBeNull();
    expect(screen.getByText('Programming')).not.toBeNull();
  });

  it('should use optionText with a string value as text identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            optionText="foobar"
            choices={[
              { id: 't', foobar: 'Technical' },
              { id: 'p', foobar: 'Programming' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    userEvent.type(
      screen.getByLabelText('resources.posts.fields.tags'),
      'a'
    );

    expect(screen.queryAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('Technical')).not.toBeNull();
    expect(screen.getByText('Programming')).not.toBeNull();
  });

  it('should use optionText with a string value including "." as text identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            optionText="foobar.name"
            choices={[
              { id: 't', foobar: { name: 'Technical' } },
              { id: 'p', foobar: { name: 'Programming' } },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    userEvent.type(
      screen.getByLabelText('resources.posts.fields.tags'),
      'a'
    );

    expect(screen.queryAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('Technical')).not.toBeNull();
    expect(screen.getByText('Programming')).not.toBeNull();
  });

  it('should use optionText with a function value as text identifier', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            optionText={choice => choice.foobar}
            choices={[
              { id: 't', foobar: 'Technical' },
              { id: 'p', foobar: 'Programming' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    userEvent.type(
      screen.getByLabelText('resources.posts.fields.tags'),
      'a'
    );

    expect(screen.queryAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('Technical')).not.toBeNull();
    expect(screen.getByText('Programming')).not.toBeNull();
  });

  it('should translate the choices by default', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <TestTranslationProvider translate={x => `**${x}**`}>
          <SimpleForm onSubmit={jest.fn()}>
            <AutocompleteArrayInput
              {...defaultProps}
              choices={[
                { id: 't', name: 'Technical' },
                { id: 'p', name: 'Programming' },
              ]}
            />
          </SimpleForm>
        </TestTranslationProvider>
      </BaseRootContext>
    );

    userEvent.type(
      screen.getByLabelText('**resources.posts.fields.tags**'),
      'a'
    );

    expect(screen.queryAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('**Technical**')).not.toBeNull();
    expect(screen.getByText('**Programming**')).not.toBeNull();
  });

  it('should not translate the choices if translateChoice is false', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <TestTranslationProvider translate={x => `**${x}**`}>
          <SimpleForm onSubmit={jest.fn()}>
            <AutocompleteArrayInput
              {...defaultProps}
              choices={[
                { id: 't', name: 'Technical' },
                { id: 'p', name: 'Programming' },
              ]}
              translateChoice={false}
            />
          </SimpleForm>
        </TestTranslationProvider>
      </BaseRootContext>
    );

    userEvent.type(
      screen.getByLabelText('**resources.posts.fields.tags**'),
      'a'
    );

    expect(screen.queryAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('Technical')).not.toBeNull();
    expect(screen.getByText('Programming')).not.toBeNull();
  });

  it('should make debounced calls to setFilter', async () => {
    const setFilter = jest.fn();
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[{ id: 't', name: 'Technical' }]}
            setFilter={setFilter}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText(
      'resources.posts.fields.tags'
    ) as HTMLInputElement;

    userEvent.type(input, 'foo');
    userEvent.type(input, 'fooo');
    userEvent.type(input, 'foooo');
    await new Promise(resolve => setTimeout(resolve, 300));
    expect(setFilter).toHaveBeenCalledTimes(1);
  });

  it('should respect shouldRenderSuggestions over default if passed in', async () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[{ id: 't', name: 'Technical' }]}
            shouldRenderSuggestions={v => v.length > 2}
            noOptionsText="No choices"
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('resources.posts.fields.tags');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Te' } });
    expect(screen.queryAllByRole('option')).toHaveLength(0);

    fireEvent.change(input, { target: { value: 'Tec' } });
    await waitFor(() => {
      expect(screen.queryAllByRole('option')).toHaveLength(1);
    });
  });

  it('should not fail when value is empty and new choices are applied', () => {
    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[{ id: 't', name: 'Technical' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[{ id: 't', name: 'Technical' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText(
      'resources.posts.fields.tags'
    ) as HTMLInputElement;
    expect(input.value).toEqual('');
  });

  it('should repopulate the suggestions after the suggestions are dismissed', async () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[{ id: 't', name: 'Technical' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText('resources.posts.fields.tags');
    userEvent.type(input, 'foo');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    fireEvent.blur(input);
    userEvent.type(input, 'a');
    expect(screen.queryAllByRole('option')).toHaveLength(1);
  });

  it('should not rerender searchText while having focus and new choices arrive', () => {
    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[{ id: 't', name: 'Technical' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText(
      'resources.posts.fields.tags'
    ) as HTMLInputElement;

    fireEvent.focus(input);
    userEvent.type(input, 'foo');
    expect(input.value).toEqual('foo');
    expect(screen.queryAllByRole('option')).toHaveLength(0);

    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    expect(input.value).toEqual('foo');
  });

  it('should revert the searchText on blur', async () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[{ id: 't', name: 'Technical' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText(
      'resources.posts.fields.tags'
    ) as HTMLInputElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'foo' } });
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    fireEvent.blur(input);
    await waitFor(() => {
      expect(input.value).toEqual('');
    });
  });

  it('should resolve value from input value', () => {
    const onChange = jest.fn();
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            onChange={onChange}
            choices={[{ id: 't', name: 'Technical' }]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText('resources.posts.fields.tags');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Technical' } });
    fireEvent.click(screen.getByRole('option'));
    fireEvent.blur(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['t']);
  });

  it('should reset filter when input value changed', async () => {
    const setFilter = jest.fn();
    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()} record={{ tags: ['t'] }}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
            setFilter={setFilter}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('resources.posts.fields.tags');
    userEvent.type(input, 'p');
    await new Promise(resolve => setTimeout(resolve, 300));
    expect(setFilter).toHaveBeenCalledTimes(1);
    expect(setFilter).toHaveBeenCalledWith('p');
    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()} record={{ tags: ['p'] }}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
            setFilter={setFilter}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    await waitFor(() => {
      expect(setFilter).toHaveBeenCalledTimes(2);
      expect(setFilter).toHaveBeenCalledWith('');
    });
  });

  it('should reset filter only when needed, even if the value is an array of objects (fixes #4454)', async () => {
    const setFilter = jest.fn();
    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm
          onSubmit={jest.fn()}
          record={{ tags: [{ id: 't' }] }}
        >
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
            parse={value => value && value.map(v => ({ id: v }))}
            format={value => value && value.map(v => v.id)}
            setFilter={setFilter}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('resources.posts.fields.tags');
    userEvent.type(input, 'p');
    await waitFor(() => {
      expect(setFilter).toHaveBeenCalledTimes(1);
    });
    expect(setFilter).toHaveBeenCalledWith('p');
    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm
          onSubmit={jest.fn()}
          record={{ tags: [{ id: 'p' }] }}
        >
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
            parse={value => value && value.map(v => ({ id: v }))}
            format={value => value && value.map(v => v.id)}
            setFilter={setFilter}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    await waitFor(() => {
      expect(setFilter).toHaveBeenCalledTimes(2);
    });
    expect(setFilter).toHaveBeenCalledWith('');
  });

  it('should allow customized rendering of suggesting item', () => {
    const SuggestionItem = props => {
      const record = useRecordContext();
      return <div {...props} aria-label={record && record.name} />;
    };

    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
            optionText={<SuggestionItem />}
            inputText={choice => choice?.name}
            matchSuggestion={(filter, choice) => true}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    userEvent.type(
      screen.getByLabelText('resources.posts.fields.tags'),
      'a'
    );
    expect(screen.getByLabelText('Technical')).not.toBeNull();
    expect(screen.getByLabelText('Programming')).not.toBeNull();
  });

  it('should display helperText', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            helperText="Can I help you?"
          />
        </SimpleForm>
      </BaseRootContext>
    );
    expect(screen.getByText('Can I help you?')).not.toBeNull();
  });

  describe('error message', () => {
    const failingValidator = () => 'validation.error';

    it('should not be displayed if field is pristine', () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm onSubmit={jest.fn()}>
            <AutocompleteArrayInput
              {...defaultProps}
              choices={[{ id: 1, name: 'hello' }]}
              validate={failingValidator}
            />
          </SimpleForm>
        </BaseRootContext>
      );
      expect(screen.queryByText('validation.error')).toBeNull();
    });

    it('should be displayed if field has been touched and is invalid', async () => {
      render(
        <BaseRootContext dataProvider={testDataProvider()}>
          <SimpleForm mode="onBlur" onSubmit={jest.fn()}>
            <AutocompleteArrayInput
              {...defaultProps}
              choices={[{ id: 1, name: 'hello' }]}
              validate={failingValidator}
            />
          </SimpleForm>
        </BaseRootContext>
      );
      const input = screen.getByLabelText('resources.posts.fields.tags');
      fireEvent.focus(input);
      fireEvent.blur(input);

      await waitFor(() => {
        expect(
          screen.queryByText('validation.error')
        ).not.toBeNull();
      });
    });
  });

  it('updates suggestions when input is blurred and refocused', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 1, name: 'ab' },
              { id: 2, name: 'abc' },
              { id: 3, name: '123' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('resources.posts.fields.tags');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(screen.queryAllByRole('option')).toHaveLength(2);
    fireEvent.blur(input);

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(screen.queryAllByRole('option')).toHaveLength(2);
  });

  it('does not automatically select a matched choice if there is only one', async () => {
    const onChange = jest.fn();

    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 1, name: 'ab' },
              { id: 2, name: 'abc' },
              { id: 3, name: '123' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('resources.posts.fields.tags');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.queryAllByRole('option')).toHaveLength(1);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should limit suggestions when suggestionLimit is passed', () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
            suggestionLimit={1}
          />
        </SimpleForm>
      </BaseRootContext>
    );
    const input = screen.getByLabelText('resources.posts.fields.tags');
    userEvent.type(input, 'a');
    expect(screen.queryAllByRole('option')).toHaveLength(1);
  });

  it('should support creation of a new choice through the onCreate event', async () => {
    const choices = [
      { id: 'ang', name: 'Angular' },
      { id: 'rea', name: 'React' },
    ];
    const handleCreate = filter => {
      const newChoice = {
        id: 'js_fatigue',
        name: filter,
      };
      choices.push(newChoice);
      return newChoice;
    };

    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            onCreate={handleCreate}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText(
      'resources.posts.fields.language'
    ) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: 'New Kid On The Block' } });
    fireEvent.click(screen.getByText('action.create_item'));
    await new Promise(resolve => setTimeout(resolve));
    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            onCreate={handleCreate}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    expect(screen.queryByText('New Kid On The Block')).not.toBeNull();
  });

  it('should support creation of a new choice through the onCreate event with a promise', async () => {
    const choices = [
      { id: 'ang', name: 'Angular' },
      { id: 'rea', name: 'React' },
    ];
    const handleCreate = filter => {
      return new Promise(resolve => {
        const newChoice = {
          id: 'js_fatigue',
          name: filter,
        };
        choices.push(newChoice);
        setTimeout(() => resolve(newChoice));
      });
    };

    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            onCreate={handleCreate}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText(
      'resources.posts.fields.language'
    ) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: 'New Kid On The Block' } });
    fireEvent.click(screen.getByText('action.create_item'));
    await new Promise(resolve => setTimeout(resolve));
    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            onCreate={handleCreate}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    expect(screen.queryByText('New Kid On The Block')).not.toBeNull();
  });

  it('should support creation of a new choice through the create element', async () => {
    const choices = [
      { id: 'ang', name: 'Angular' },
      { id: 'rea', name: 'React' },
    ];
    const newChoice = { id: 'js_fatigue', name: 'New Kid On The Block' };

    const Create = () => {
      const context = useCreateSuggestionContext();
      const handleClick = () => {
        choices.push(newChoice);
        context.onCreate(newChoice);
      };

      return <button onClick={handleClick}>Get the kid</button>;
    };

    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            create={<Create />}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText(
      'resources.posts.fields.language'
    ) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: 'New Kid On The Block' } });
    fireEvent.click(screen.getByText('action.create_item'));
    fireEvent.click(screen.getByText('Get the kid'));
    await new Promise(resolve => setTimeout(resolve));
    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            create={<Create />}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    expect(screen.queryByText('New Kid On The Block')).not.toBeNull();
  });

  it('should use optionText with a function value as text identifier when a create element is passed', () => {
    const choices = [
      { id: 't', foobar: 'Technical' },
      { id: 'p', foobar: 'Programming' },
    ];
    const newChoice = { id: 'js_fatigue', foobar: 'New Kid On The Block' };

    const Create = () => {
      const context = useCreateSuggestionContext();
      const handleClick = () => {
        choices.push(newChoice);
        context.onCreate(newChoice);
      };

      return <button onClick={handleClick}>Get the kid</button>;
    };

    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            create={<Create />}
            optionText={choice => choice.foobar}
            choices={choices}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    fireEvent.focus(
      screen.getByLabelText('resources.posts.fields.tags', {
        selector: 'input',
      })
    );
    expect(screen.queryAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('Technical')).not.toBeNull();
    expect(screen.getByText('Programming')).not.toBeNull();
  });

  it('should support creation of a new choice through the onCreate event when optionText is a function', async () => {
    const choices = [
      { id: 'ang', name: 'Angular' },
      { id: 'rea', name: 'React' },
    ];
    const handleCreate = filter => {
      const newChoice = {
        id: 'js_fatigue',
        name: filter,
      };
      choices.push(newChoice);
      return newChoice;
    };

    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            onCreate={handleCreate}
            optionText={choice => `Choice is ${choice.name}`}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    const input = screen.getByLabelText('resources.posts.fields.language', {
      selector: 'input',
    }) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: 'New Kid On The Block' } });
    fireEvent.click(screen.getByText('Choice is action.create_item'));
    await new Promise(resolve => setTimeout(resolve));
    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            source="language"
            resource="posts"
            choices={choices}
            onCreate={handleCreate}
            optionText={choice => `Choice is ${choice.name}`}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    expect(
      screen.queryByText('Choice is New Kid On The Block')
    ).not.toBeNull();
  });

  it('should show the suggestions when the input value is empty and the input is focused and choices arrived late', () => {
    const { rerender } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput {...defaultProps} />
        </SimpleForm>
      </BaseRootContext>
    );
    rerender(
      <BaseRootContext dataProvider={testDataProvider()}>
        <SimpleForm onSubmit={jest.fn()}>
          <AutocompleteArrayInput
            {...defaultProps}
            choices={[
              { id: 't', name: 'Technical' },
              { id: 'p', name: 'Programming' },
            ]}
          />
        </SimpleForm>
      </BaseRootContext>
    );

    userEvent.type(
      screen.getByLabelText('resources.posts.fields.tags'),
      'a'
    );
    expect(screen.queryAllByRole('option')).toHaveLength(2);
  });
});
