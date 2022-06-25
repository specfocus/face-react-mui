import { useCheckMinimumRequiredProps } from '@specfocus/view-focus/controllers/checkMinimumRequiredProps';
import { CreateBase } from '@specfocus/view-focus/mutations/CreateBase';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import PropTypes from 'prop-types';
import { ReactElement } from 'react';
import { CreateProps } from '../types';
import { CreateView } from './CreateView';

/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes the `record` as prop.
 *
 * The <Create> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - mutationOptions
 * - title
 *
 * @example
 *
 * // in src/posts.js
 * import React from "react";
 * import { Create, SimpleForm, TextInput } from '@specfocus/view-focus.mui-demo';
 *
 * export const PostCreate = (props) => (
 *     <Create {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *         </SimpleForm>
 *     </Create>
 * );
 *
 * // in src/App.js
 * import React from "react";
 * import { Admin, Resource } from '@specfocus/view-focus.mui-demo';
 *
 * import { PostCreate } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" create={PostCreate} />
 *     </Admin>
 * );
 * export default App;
 */
export const Create = <RecordType extends Entity = any>(
  props: CreateProps<RecordType> & { children: ReactElement; }
): ReactElement => {
  useCheckMinimumRequiredProps('Create', ['children'], props);
  const {
    resource,
    record,
    redirect,
    transform,
    mutationOptions,
    disableAuthentication,
    hasEdit,
    hasShow,
    ...rest
  } = props;
  return (
    <CreateBase
      resource={resource}
      record={record}
      redirect={redirect}
      transform={transform}
      mutationOptions={mutationOptions}
      disableAuthentication={disableAuthentication}
      hasEdit={hasEdit}
      hasShow={hasShow}
    >
      <CreateView {...rest} />
    </CreateBase>
  );
};

Create.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  aside: PropTypes.element,
  children: PropTypes.element,
  className: PropTypes.string,
  disableAuthentication: PropTypes.bool,
  hasEdit: PropTypes.bool,
  hasShow: PropTypes.bool,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  resource: PropTypes.string,
  title: PropTypes.node,
  record: PropTypes.object,
  mutationOptions: PropTypes.object,
  transform: PropTypes.func,
  sx: PropTypes.any,
};
