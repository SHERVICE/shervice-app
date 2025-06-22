/* eslint-disable prettier/prettier */
import { Colors } from '@/constants/Colors';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

type IconWithAnimatedTopBarProps = {
  children: React.ReactNode;
  active: boolean;
};

function IconWithAnimatedTopBar({
  children,
  active,
}: IconWithAnimatedTopBarProps) {

  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(active ? 1 : 0, { duration: 250 });
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value * 24,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topBar, animatedStyle]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    position: 'absolute',
    top: -15,
    height: 2,
    width: 24,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
});

export default IconWithAnimatedTopBar;
