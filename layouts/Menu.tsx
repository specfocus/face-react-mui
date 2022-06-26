import DefaultIcon from '@mui/icons-material/ViewList';
import { styled } from '@mui/material/styles';
import { useGetResourceLabel, useResourceDefinitions } from '@specfocus/view-focus/core';
import { useCreatePath } from '@specfocus/view-focus.navigation/routes/useCreatePath';
import clsx from 'clsx';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import { createElement, ReactNode } from 'react';
import { DashboardMenuItem } from './DashboardMenuItem';
import { MenuItemLink } from './MenuItemLink';
import { CLOSED_DRAWER_WIDTH, DRAWER_WIDTH } from './Sidebar';
import { useSidebarState } from './useSidebarState';

export const Menu = (props: MenuProps) => {
  const resources = useResourceDefinitions();
  const getResourceLabel = useGetResourceLabel();
  const createPath = useCreatePath();
  const {
    hasDashboard,
    dense,
    children = (
      <>
        {hasDashboard && <DashboardMenuItem dense={dense} />}
        {Object.keys(resources)
          .filter(name => resources[name].hasList)
          .map(name => (
            <MenuItemLink
              key={name}
              to={createPath({
                resource: name,
                type: 'list',
              })}
              state={{ _scrollToTop: true }}
              primaryText={getResourceLabel(name, 2)}
              leftIcon={
                resources[name].icon ? (
                  createElement(resources[name].icon)
                ) : (
                  <DefaultIcon />
                )
              }
              dense={dense}
            />
          ))}
      </>
    ),
    className,
    ...rest
  } = props;

  const [open] = useSidebarState();

  return (
    <Root
      className={clsx(
        {
          [MenuClasses.open]: open,
          [MenuClasses.closed]: !open,
        },
        className
      )}
      {...rest}
    >
      {children}
    </Root>
  );
};

export interface MenuProps {
  children?: ReactNode;
  className?: string;
  dense?: boolean;
  hasDashboard?: boolean;
}

Menu.propTypes = {
  className: PropTypes.string,
  dense: PropTypes.bool,
  hasDashboard: PropTypes.bool,
};

const PREFIX = 'Menu';

export const MenuClasses = {
  open: `${PREFIX}-open`,
  closed: `${PREFIX}-closed`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginTop: '0.5em',
  marginBottom: '1em',
  [theme.breakpoints.only('xs')]: {
    marginTop: 0,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [`&.${MenuClasses.open}`]: {
    width: lodashGet(theme, 'sidebar.width', DRAWER_WIDTH),
  },

  [`&.${MenuClasses.closed}`]: {
    width: lodashGet(theme, 'sidebar.closedWidth', CLOSED_DRAWER_WIDTH),
  },
}));
