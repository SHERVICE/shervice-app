/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0474ED';
const tintColorDark = '#FFFFFF';

export const Colors = {
  primary: '#0474ED',
  secondary: '#5B62FF',
  tertiary: '#EAB632',
  black: '#13171B',
  gray500: '#A1A4A7',
  light500: '#D9E1E1',
  white: '#FFFFFF',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#13171B',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
