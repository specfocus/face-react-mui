import { ThemeOptions } from '@mui/material';
import { useStore } from '@specfocus/view-focus.states/states/useStore';

export type ThemeSetter = (theme: ThemeOptions) => void;

export const useTheme = (
  themeOverride?: ThemeOptions
): [ThemeOptions, ThemeSetter] => useStore('theme', themeOverride);
