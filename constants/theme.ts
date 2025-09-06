import {
  DarkTheme as RN_DarkTheme,
  DefaultTheme as RN_LightTheme,
} from '@react-navigation/native';
import { Colors } from './Colors';

export const LightTheme = {
  ...RN_LightTheme,
  colors: {
    ...RN_LightTheme.colors,
    background: Colors.light.background,
    card: '#F3F4F6',
    text: Colors.light.text,
    primary: Colors.light.tint,
    border: '#E5E7EB',
    notification: '#EF4444',
  },
};

export const DarkTheme = {
  ...RN_DarkTheme,
  colors: {
    ...RN_DarkTheme.colors,
    background: Colors.dark.background,
    card: '#1F1F1F',
    text: Colors.dark.text,
    primary: Colors.dark.primary,
    border: Colors.dark.border,
    notification: '#FF6B6B',
  },
};
