/* eslint-disable prettier/prettier */
import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';

interface CategoryItemProps extends TouchableHighlightProps {
  title: string;
  figure: string;
  index: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

function CategoryItem({ title, figure, index, ...rest }: CategoryItemProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 400 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <AnimatedTouchable style={[animatedStyle]} {...rest} underlayColor="transparent">
      <View style={styles.categoryCard}>
        <View style={styles.categoryFigure}>
        <SvgUri uri={figure} width={50} height={50} />
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
      </View>
    </AnimatedTouchable>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  categoryCard: {
    width: 76,
    gap: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryFigure: {
    width: '100%',
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray.gray05,
    borderRadius: 5,
  },
  categoryTitle: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'PoppinsLight',
  },
});
