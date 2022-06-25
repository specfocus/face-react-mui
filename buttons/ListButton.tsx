import React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import ActionList from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
import { useResourceContext } from '@specfocus/view-focus/core';

import { Button, ButtonProps } from './Button';
import { useCreatePath } from '@specfocus/view-focus.navigation/routes/useCreatePath';

/**
 * Opens the List view of a given resource
 *
 * @example // basic usage
 * import { ListButton } from '@specfocus/view-focus.mui-demo';
 *
 * const CommentListButton = () => (
 *     <ListButton label="Comments" />
 * );
 *
 * @example // linking back to the list from the Edit view
 * import { TopToolbar, ListButton, ShowButton, Edit } from '@specfocus/view-focus.mui-demo';
 *
 * const PostEditActions = () => (
 *     <TopToolbar>
 *         <ListButton />
 *         <ShowButton />
 *     </TopToolbar>
 * );
 *
 * export const PostEdit = (props) => (
 *     <Edit actions={<PostEditActions />} {...props}>
 *         ...
 *     </Edit>
 * );
 */
export const ListButton = (props: ListButtonProps) => {
  const {
    icon = defaultIcon,
    label = 'action.list',
    resource: resourceProp,
    scrollToTop = true,
    ...rest
  } = props;
  const resource = useResourceContext(props);
  const createPath = useCreatePath();
  return (
    <Button
      component={Link}
      to={createPath({ type: 'list', resource })}
      state={scrollStates[String(scrollToTop)]}
      label={label}
      {...(rest as any)}
    >
      {icon}
    </Button>
  );
};

// avoids using useMemo to get a constant value for the link state
const scrollStates = {
  true: { _scrollToTop: true },
  false: {},
};

const defaultIcon = <ActionList />;

interface Props {
  icon?: ReactElement;
  label?: string;
  resource?: string;
  scrollToTop?: boolean;
}

export type ListButtonProps = Props & ButtonProps;

ListButton.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
};
