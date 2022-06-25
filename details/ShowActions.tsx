import React from 'react';
import PropTypes from 'prop-types';
import { useResourceDefinition } from '@specfocus/view-focus/core';
import { EditButton } from '../buttons';
import TopToolbar from '../layouts/TopToolbar';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';

/**
 * Action Toolbar for the Show view
 *
 * Internal component. If you want to add or remove actions for a Show view,
 * write your own ShowActions Component. Then, in the <Show> component,
 * use it in the `actions` prop to pass a custom component.
 *
 * @example
 *     import Button from '@mui/material/Button';
 *     import { TopToolbar, EditButton, Show } from '@specfocus/view-focus.mui-demo';
 *
 *     const PostShowActions = ({ record, resource }) => (
 *         <TopToolbar>
 *             <EditButton record={record} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </TopToolbar>
 *     );
 *
 *     export const PostShow = (props) => (
 *         <Show actions={<PostShowActions />} {...props}>
 *             ...
 *         </Show>
 *     );
 */
export const ShowActions = (props: ShowActionsProps) => {
  const record = useRecordContext(props);
  const { hasEdit } = useResourceDefinition();
  if (!hasEdit) {
    return null;
  }
  return (
    <TopToolbar className={props.className}>
      <EditButton record={record} />
    </TopToolbar>
  );
};

export interface ShowActionsProps {
  className?: string;
  record?: Entity;
}

ShowActions.propTypes = {
  className: PropTypes.string,
  record: PropTypes.any,
};
