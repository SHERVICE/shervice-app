import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface SlidingBackgroundProps {
  index: number;
  count: number;
}

const PADDING_HORIZONTAL = 40;

export default function SlidingBackground({
  index,
  count,
}: SlidingBackgroundProps) {
  const translateX = useSharedValue(0);

  const ITEM_WIDTH = (width - PADDING_HORIZONTAL) / count;

  const styles = getStyles(ITEM_WIDTH);

  useEffect(() => {
    translateX.value = withTiming(index * ITEM_WIDTH, { duration: 300 });
  }, [ITEM_WIDTH, index, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View
        style={[
          styles.highlight,
          animatedStyle,
          { width: ITEM_WIDTH, backgroundColor: Colors.primary },
        ]}
      />
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.item]}>
          <View style={styles.inner} />
        </View>
      ))}
    </View>
  );
}

const getStyles = (width: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'relative',
      height: 9,
    },
    highlight: {
      position: 'absolute',
      height: 9,
      borderRadius: 20,
      top: 0,
      left: 0,
      zIndex: 0,
    },
    item: {
      width: width,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    inner: {
      width: width * 0.7,
      height: 9,
      backgroundColor: Colors.gray.gray20,
      borderRadius: 20,
    },
  });
