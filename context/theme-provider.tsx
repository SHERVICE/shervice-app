import { DarkTheme, LightTheme } from '@/constants/theme';
import { storage } from '@/utils/storage';
import {
  DefaultTheme as RN_LightTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  theme: typeof RN_LightTheme;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  const [isDark, setIsDark] = useState(colorScheme === 'dark' ? true : false);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      storage.set('themePreference', next ? 'dark' : 'light');
      return next;
    });
  };

  const theme = useMemo(
    () =>
      isDark
        ? (DarkTheme as typeof RN_LightTheme)
        : (LightTheme as typeof RN_LightTheme),
    [isDark],
  );

  const contextValue = useMemo(
    () => ({ toggleTheme, isDark, theme }),
    [isDark],
  );

  useEffect(() => {
    const saved = storage.getString('themePreference');

    if (saved === 'dark') setIsDark(true);
    else if (saved === 'light') setIsDark(false);
    else setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <RNThemeProvider value={theme}>{children}</RNThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
};
