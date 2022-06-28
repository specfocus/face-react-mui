import { BaseRootContext, BaseRootContextProps } from '@specfocus/view-focus/resources';
import { ThemeProvider } from '../themes';
import { defaultTheme } from './defaultTheme';

export const AppContext = (props: BaseRootContextProps) => {
  const { theme = defaultTheme, children, ...rest } = props;
  return (
    <BaseRootContext {...rest}>
      <ThemeProvider theme={theme}>{children as any}</ThemeProvider>
    </BaseRootContext>
  );
};

AppContext.displayName = 'AppContext';
