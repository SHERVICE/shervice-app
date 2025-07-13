import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

enum SizeRadius {
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

const SizeRadiusValues = {
  [SizeRadius.LARGE]: 24,
  [SizeRadius.MEDIUM]: 20,
  [SizeRadius.SMALL]: 16,
};

interface RadiusCheckProps {
  checked: boolean;
  onPress?: () => void;
  size?: keyof typeof SizeRadius;
  disabled?: boolean;
}

function RadiusCheck({
  checked,
  onPress,
  disabled = false,
  size = SizeRadius.LARGE,
}: RadiusCheckProps) {
  const scale = useSharedValue(checked ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const styles = getStyles(size);

  useEffect(() => {
    scale.value = withSpring(checked ? 1 : 0, {
      damping: 10,
      stiffness: 150,
      mass: 0.3,
    });
  }, [checked]);

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled]}
    >
      <Animated.View style={[styles.checkedView, animatedStyle]} />
    </TouchableHighlight>
  );
}

const getStyles = (size: keyof typeof SizeRadius) =>
  StyleSheet.create({
    container: {
      width: SizeRadiusValues[size],
      height: SizeRadiusValues[size],
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkedView: {
      width: SizeRadiusValues[size] - 8,
      height: SizeRadiusValues[size] - 8,
      backgroundColor: Colors.primary,
      borderRadius: 8,
    },
    unchecked: {
      backgroundColor: 'transparent',
    },
    disabled: {
      borderColor: Colors.light500,
    },
  });

export default RadiusCheck;
