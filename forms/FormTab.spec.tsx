import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { render, screen, waitFor } from '@testing-library/react';
import expect from 'expect';
import { BaseRootContext } from '../core/BaseRootContext';
import { TextInput } from '../inputs';
import { FormTab } from './FormTab';
import { TabbedForm } from './TabbedForm';

describe('<FormTab label="foo" />', () => {
  it('should display <Toolbar />', async () => {
    render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <TabbedForm>
          <FormTab label="foo">
            <TextInput source="name" />
            <TextInput source="city" />
          </FormTab>
        </TabbedForm>
      </BaseRootContext>
    );
    await waitFor(() => {
      expect(screen.queryByLabelText('action.save')).not.toBeNull();
    });
  });

  it('should render a TabbedForm with FormTabs having custom props without warnings', async () => {
    let countWarnings = 0;
    const spy = jest
      .spyOn(console, 'error')
      .mockImplementation((message: string) => {
        if (!message.includes('a test was not wrapped in act')) {
          countWarnings++;
        }
      });

    const record = { id: 'gazebo', name: 'foo' };

    const { container } = render(
      <BaseRootContext dataProvider={testDataProvider()}>
        <TabbedForm>
          <FormTab
            label="First"
            resource="posts"
            record={record}
            margin="none"
            variant="standard"
          >
            <TextInput source="name" />
          </FormTab>
          <FormTab
            label="Second"
            resource="posts"
            record={record}
            margin="dense"
            variant="filled"
          >
            <TextInput source="name" />
          </FormTab>
          <FormTab
            label="Third"
            resource="posts"
            record={record}
            margin="normal"
            variant="outlined"
          >
            <TextInput source="name" />
          </FormTab>
        </TabbedForm>
      </BaseRootContext>
    );
    await waitFor(() => {
      expect(countWarnings).toEqual(0);
    });
    expect(container).not.toBeNull();

    spy.mockRestore();
  });
});
