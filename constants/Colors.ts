/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0474ED';
const tintColorDark = '#FFFFFF';

export const Colors = {
  primary: '#0474ED',
  secondary: '#5B62FF',
  red: '#ED4C4C',
  success: '#30BE82',
  alert: '#fff3cd',
  tertiary: '#EAB632',
  black: '#13171B',
  gray500: '#A1A4A7',
  light500: '#D9E1E1',
  white: '#FFFFFF',
  darkVariant: {
    dark20: '#00000033',
  },
  gray: {
    gray05: '#A1A4A70D',
    gray10: '#A1A4A71A',
    gray80: '#A1A4A7CC',
    gray20: '#A1A4A733',
  },
  light: {
    text: '#13171B',
    background: '#fff',
    tint: tintColorLight,
    icon: '#13171B',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#0474ED',
    text: '#FFFFFF',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    border: '#A1A4A71A',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
