import { Colors } from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';
import Heading from '../Heading';

interface CategoryItemProps extends TouchableHighlightProps {
  title: string;
  figure: string;
  index: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

function CategoryItem({ title, figure, index, ...rest }: CategoryItemProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(1);

  const { colors } = useTheme();

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 400 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.93, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 8 });
  };

  return (
    <AnimatedTouchable
      style={[animatedStyle]}
      {...rest}
      underlayColor="transparent"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.categoryCard}>
        <View style={styles.categoryFigure}>
          <SvgUri uri={figure} width={50} height={50} />
        </View>
        <Heading color={colors.text} size={12} fontFamily="PoppinsLight">
          {title}
        </Heading>
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
});
