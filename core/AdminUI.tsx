import React from 'react';
import { createElement, ComponentType } from 'react';
import { CoreAdminUI, CoreAdminUIProps } from '@specfocus/view-focus/core';
import {
  Layout as DefaultLayout,
  LoadingPage,
  NotFound,
  Notification,
} from '../layouts';
import { Login } from '../auth';

export const AdminUI = ({ notification, ...props }: AdminUIProps) => (
  <>
    <CoreAdminUI {...props} />
    {createElement(notification)}
  </>
);

export interface AdminUIProps extends CoreAdminUIProps {
  notification?: ComponentType;
}

AdminUI.defaultProps = {
  layout: DefaultLayout,
  catchAll: NotFound,
  loading: LoadingPage,
  loginPage: Login,
  notification: Notification,
};
