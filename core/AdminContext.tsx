import { CoreAdminContext, CoreAdminContextProps } from '@specfocus/view-focus/core';
import { ThemeProvider } from '../themes';
import { defaultTheme } from './defaultTheme';

export const AdminContext = (props: CoreAdminContextProps) => {
  const { theme = defaultTheme, children, ...rest } = props;
  return (
    <CoreAdminContext {...rest}>
      <ThemeProvider theme={theme}>{children as any}</ThemeProvider>
    </CoreAdminContext>
  );
};

AdminContext.displayName = 'AdminContext';
