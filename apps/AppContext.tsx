import { CoreAdminContext, CoreAdminContextProps } from '@specfocus/view-focus/resources';
import { ThemeProvider } from '../themes';
import { defaultTheme } from './defaultTheme';

export const AppContext = (props: CoreAdminContextProps) => {
  const { theme = defaultTheme, children, ...rest } = props;
  return (
    <CoreAdminContext {...rest}>
      <ThemeProvider theme={theme}>{children as any}</ThemeProvider>
    </CoreAdminContext>
  );
};

AppContext.displayName = 'AppContext';
