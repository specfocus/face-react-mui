import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { render, screen } from '@testing-library/react';
import expect from 'expect';
import { AdminContext } from '../core/AdminContext';
import { TextInput } from '../inputs';
import { SimpleForm } from './SimpleForm';

describe('<SimpleForm />', () => {
  it('should embed a form with given component children', () => {
    render(
      <AdminContext dataProvider={testDataProvider()}>
        <SimpleForm>
          <TextInput source="name" />
          <TextInput source="city" />
        </SimpleForm>
      </AdminContext>
    );
    expect(
      screen.queryByLabelText('resources.undefined.fields.name')
    ).not.toBeNull();
    expect(
      screen.queryByLabelText('resources.undefined.fields.city')
    ).not.toBeNull();
  });

  it('should display <Toolbar />', () => {
    render(
      <AdminContext dataProvider={testDataProvider()}>
        <SimpleForm>
          <TextInput source="name" />
          <TextInput source="city" />
        </SimpleForm>
      </AdminContext>
    );
    expect(screen.queryByLabelText('action.save')).not.toBeNull();
  });
});
