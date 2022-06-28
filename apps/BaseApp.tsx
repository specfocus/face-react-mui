import { ThemeOptions } from '@mui/material';
import { BaseRootProps } from '@specfocus/view-focus/resources';
import { localStorageStore } from '@specfocus/view-focus.states/states/localStorageStore';
import { ComponentType } from 'react';
import { defaultTranslationProvider } from './defaultTranslationProvider';
import { BaseAppContext } from './BaseAppContext';
import { BaseAppLayout } from './BaseAppLayout';

/**
 * Main admin component, entry point to the application.
 *
 * Initializes the various contexts (auth, data, i18n, router)
 * and defines the main routes.
 *
 * Expects a list of resources as children, or a function returning a list of
 * resources based on the permissions.
 *
 * @example
 *
 * // static list of resources
 *
 * import {
 *     BaseRoot,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'view-focus';
 *
 * const App = () => (
 *     <BaseRoot dataProvider={myDataProvider}>
 *         <Resource name="posts" list={ListGuesser} />
 *     </BaseRoot>
 * );
 *
 * // dynamic list of resources based on permissions
 *
 * import {
 *     BaseRoot,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'view-focus';
 *
 * const App = () => (
 *     <BaseRoot dataProvider={myDataProvider}>
 *         {permissions => [
 *             <Resource name="posts" key="posts" list={ListGuesser} />,
 *         ]}
 *     </BaseRoot>
 * );
 *
 * // If you have to build a dynamic list of resources using a side effect,
 * // you can't use <BaseRoot>. But as it delegates to sub components,
 * // it's relatively straightforward to replace it:
 *
 * import * as React from 'react';
import { useEffect, useState } from 'react';
 * import {
 *     BaseRootContext,
 *     BaseRootLayout,
 *     defaultI18nProvider,
 *     localStorageStore,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'view-focus';
 *
 * const store = localStorageStore();
 *
 * const App = () => (
 *     <BaseRootContext dataProvider={myDataProvider} i18nProvider={defaultI18nProvider} store={store}>
 *         <Resources />
 *     </BaseRootContext>
 * );
 *
 * const Resources = () => {
 *     const [resources, setResources] = useState([]);
 *     const dataProvider = useDataProvider();
 *     useEffect(() => {
 *         dataProvider.introspect().then(r => setResources(r));
 *     }, []);
 *
 *     return (
 *         <BaseRootLayout>
 *             {resources.map(resource => (
 *                 <Resource name={resource.name} key={resource.key} list={ListGuesser} />
 *             ))}
 *         </BaseRootLayout>
 *     );
 * };
 */
export const BaseApp = (props: BaseAppProps) => {
  const {
    authProvider,
    basename,
    catchAll,
    children,
    dashboard,
    dataProvider,
    disableTelemetry,
    history,
    i18nProvider,
    layout,
    loading,
    loginPage,
    menu, // deprecated, use a custom layout instead
    notification,
    queryClient,
    requireAuth,
    store,
    ready,
    theme,
    title = 'React BaseRoot',
  } = props;

  if (loginPage === true && process.env.NODE_ENV !== 'production') {
    console.warn(
      'You passed true to the loginPage prop. You must either pass false to disable it or a component class to customize it'
    );
  }

  return (
    <BaseAppContext
      authProvider={authProvider}
      basename={basename}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      store={store}
      history={history}
      queryClient={queryClient}
      theme={theme}
    >
      <BaseAppLayout
        layout={layout}
        dashboard={dashboard}
        disableTelemetry={disableTelemetry}
        menu={menu}
        catchAll={catchAll}
        title={title}
        loading={loading}
        loginPage={loginPage}
        notification={notification}
        requireAuth={requireAuth}
        ready={ready}
      >
        {children}
      </BaseAppLayout>
    </BaseAppContext>
  );
};

BaseApp.defaultProps = {
  i18nProvider: defaultTranslationProvider,
  store: localStorageStore(),
};

export default BaseApp;

export interface BaseAppProps extends BaseRootProps {
  theme?: ThemeOptions;
  notification?: ComponentType;
}
