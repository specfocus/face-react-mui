import { ThemeOptions } from '@mui/material';
import { CoreAdminProps } from '@specfocus/view-focus/resources';
import { localStorageStore } from '@specfocus/view-focus.states/states/localStorageStore';
import { ComponentType } from 'react';
import { defaultI18nProvider } from './defaultI18nProvider';
import { AppContext } from './AppContext';
import { AppUI } from './AppUI';

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
 *     Admin,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'view-focus';
 *
 * const App = () => (
 *     <Admin dataProvider={myDataProvider}>
 *         <Resource name="posts" list={ListGuesser} />
 *     </Admin>
 * );
 *
 * // dynamic list of resources based on permissions
 *
 * import {
 *     Admin,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'view-focus';
 *
 * const App = () => (
 *     <Admin dataProvider={myDataProvider}>
 *         {permissions => [
 *             <Resource name="posts" key="posts" list={ListGuesser} />,
 *         ]}
 *     </Admin>
 * );
 *
 * // If you have to build a dynamic list of resources using a side effect,
 * // you can't use <Admin>. But as it delegates to sub components,
 * // it's relatively straightforward to replace it:
 *
 * import * as React from 'react';
import { useEffect, useState } from 'react';
 * import {
 *     AdminContext,
 *     AdminUI,
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
 *     <AdminContext dataProvider={myDataProvider} i18nProvider={defaultI18nProvider} store={store}>
 *         <Resources />
 *     </AdminContext>
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
 *         <AdminUI>
 *             {resources.map(resource => (
 *                 <Resource name={resource.name} key={resource.key} list={ListGuesser} />
 *             ))}
 *         </AdminUI>
 *     );
 * };
 */
export const App = (props: AppProps) => {
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
    title = 'React Admin',
  } = props;

  if (loginPage === true && process.env.NODE_ENV !== 'production') {
    console.warn(
      'You passed true to the loginPage prop. You must either pass false to disable it or a component class to customize it'
    );
  }

  return (
    <AppContext
      authProvider={authProvider}
      basename={basename}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      store={store}
      history={history}
      queryClient={queryClient}
      theme={theme}
    >
      <AppUI
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
      </AppUI>
    </AppContext>
  );
};

App.defaultProps = {
  i18nProvider: defaultI18nProvider,
  store: localStorageStore(),
};

export default App;

export interface AppProps extends CoreAdminProps {
  theme?: ThemeOptions;
  notification?: ComponentType;
}
