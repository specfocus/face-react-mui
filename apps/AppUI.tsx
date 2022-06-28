import React from 'react';
import { createElement, ComponentType } from 'react';
import { BaseRootLayout, type BaseRootLayoutProps } from '@specfocus/view-focus/layouts/BaseRootLayout';
import {
  Layout as DefaultLayout,
  LoadingPage,
  NotFound,
  Notification,
} from '../layouts';
import { Login } from '../auth';

export const AppUI = ({ notification, ...props }: AppUIProps) => (
  <>
    <BaseRootLayout {...props} />
    {createElement(notification)}
  </>
);

export interface AppUIProps extends BaseRootLayoutProps {
  notification?: ComponentType;
}

AppUI.defaultProps = {
  layout: DefaultLayout,
  catchAll: NotFound,
  loading: LoadingPage,
  loginPage: Login,
  notification: Notification,
};
