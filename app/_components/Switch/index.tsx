import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  trackColor?: { false?: string; true?: string };
  thumbColor?: string;
  width?: number;
  height?: number;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  trackColor = { false: '#E5E5EA', true: '#34C759' },
  thumbColor = '#fff',
  width = 40,
  height = 24,
}) => {
  const thumbSize = height - 4;
  const margin = 2;
  const maxTranslate = width - thumbSize - 2 * margin;

  const translateX = useSharedValue(value ? maxTranslate : 0);

  useEffect(() => {
    translateX.value = withSpring(value ? maxTranslate : 0, { damping: 15 });
  }, [value]);

  const animatedThumb = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
      <Animated.View
        style={[
          styles.track,
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: value ? trackColor.true : trackColor.false,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            animatedThumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Switch;

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    top: 2,
    left: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1.5,
    elevation: 2,
  },
});
