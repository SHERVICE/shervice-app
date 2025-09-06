import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/theme-provider';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SafeAreaContainerProps = {
  children: ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: object;
};

export default function SafeAreaContainer({
  children,
  edges = ['top', 'left', 'right'],
  style = {},
}: SafeAreaContainerProps) {
  const {
    theme: { colors },
    isDark,
  } = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        style,
        colors,
        { backgroundColor: colors.background },
      ]}
      edges={edges}
    >
      <StatusBar backgroundColor="white" style={isDark ? 'light' : 'dark'} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
