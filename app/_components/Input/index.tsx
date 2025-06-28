/* eslint-disable prettier/prettier */
import { Colors } from '@/constants/Colors';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

/** Icons */
import SearchIcon from '@/assets/icons/input/search';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {}

function Input(props: InputProps) {
  const isFocused = useSharedValue(0);

  const handleFocus = () => {
    isFocused.value = withTiming(1, { duration: 300 });
  };

  const handleBlur = () => {
    isFocused.value = withTiming(0, { duration: 300 });
  };

  const animatedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      isFocused.value,
      [0, 1],
      [Colors.gray.gray10, Colors.primary], 
    );
    return {
      borderColor,
    };
  });

  return (
    <Animated.View style={[styles.input, animatedBorderStyle]}>
      <View style={styles.iconLeftArea}>
        <SearchIcon />
      </View>
      <TextInput
        style={[styles.field]}
        placeholder="Buscar"
        placeholderTextColor={Colors.gray.gray80}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
        {...props}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray.gray10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  field: {
    flex: 1,
    width: '100%',
    height: 50,
    color: Colors.gray.gray80,
    fontSize: 16,
    fontFamily: 'PoppinsLight',
  },
  iconLeftArea: {
    width: 55,
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});


export default Input