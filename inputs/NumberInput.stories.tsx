import { useWatch } from '@specfocus/view-focus.forms/forms/useWatch';
import { required } from '@specfocus/view-focus.forms/forms/validate';
import { BaseRootContext } from '../core/BaseRootContext';
import { Create } from '../details';
import { SimpleForm } from '../forms';
import { NumberInput } from './NumberInput';

export default { title: 'view-focus.mui/inputs/NumberInput' };

const FormInspector = ({ name = 'views' }) => {
  const value = useWatch({ name });
  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      {name} value in form:&nbsp;
      <code>
        {JSON.stringify(value)} ({typeof value})
      </code>
    </div>
  );
};

export const Basic = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" />
        <FormInspector />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Float = () => (
  <BaseRootContext>
    <Create
      resource="poi"
      record={{ id: 123, lat: 48.692054, long: 6.184417 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="lat" />
        <NumberInput source="long" />
        <FormInspector name="lat" />
        <FormInspector name="long" />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const DefaultValue = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" defaultValue={26} />
        <NumberInput
          source="views1"
          label="Default 6"
          defaultValue={6}
        />
        <NumberInput
          source="views2"
          label="Default 0"
          defaultValue={0}
        />
        <NumberInput source="views3" label="Default undefined" />
        <FormInspector name="views" />
        <FormInspector name="views1" />
        <FormInspector name="views2" />
        <FormInspector name="views3" />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const HelperText = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" />
        <NumberInput source="views" helperText={false} />
        <NumberInput
          source="views"
          helperText="Number of times the post was read"
        />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Label = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" />
        <NumberInput source="views" label={false} />
        <NumberInput source="views" label="Number of views" />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const FullWidth = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" label="default" />
        <NumberInput source="views" label="Full Width" fullWidth />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Margin = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" label="default (dense)" />
        <NumberInput source="views" label="none" margin="none" />
        <NumberInput source="views" label="normal" margin="normal" />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Variant = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" label="default (filled)" />
        <NumberInput
          source="views"
          label="outlined"
          variant="outlined"
        />
        <NumberInput
          source="views"
          label="standard"
          variant="standard"
        />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Step = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" label="No step" />
        <NumberInput source="views" label="Step 0.1" step={0.1} />
        <NumberInput source="views" label="Step 10" step={10} />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const MinMax = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" label="No min or max" />
        <NumberInput
          source="views"
          label="Min 20, max 30"
          min={20}
          max={30}
        />
        <NumberInput source="views" label="Min 50" min={50} />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Required = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput source="views" />
        <NumberInput source="views" required />
        <NumberInput source="views" validate={required()} />
        <NumberInput source="views" validate={[required()]} />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Error = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm
        resolver={() => ({
          values: {},
          errors: {
            views: {
              type: 'custom',
              message: 'Special error message',
            },
          },
        } as any)}
      >
        <NumberInput source="views" />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);

export const Sx = () => (
  <BaseRootContext>
    <Create
      resource="posts"
      record={{ id: 123, views: 23 }}
      sx={{ width: 600 }}
    >
      <SimpleForm>
        <NumberInput
          source="views"
          sx={{
            border: 'solid 1px red',
            borderRadius: '5px',
            '& .MuiInputLabel-root': { fontWeight: 'bold' },
          }}
        />
      </SimpleForm>
    </Create>
  </BaseRootContext>
);
