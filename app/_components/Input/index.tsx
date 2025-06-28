/* eslint-disable prettier/prettier */
import { Colors } from '@/constants/Colors';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

/** Icons */
import SearchIcon from '@/assets/icons/input/search';
import { Dimensions } from '@/constants/Dimensions';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

enum InputVariant {
    search = 'search'
}
interface InputProps extends TextInputProps {
    size?: keyof typeof Dimensions,
    variant?: keyof typeof InputVariant
}

function Input({ size = "medium", variant = InputVariant.search, ...rest }: InputProps) {
  const isFocused = useSharedValue(0);

  const style = styles(size)

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
    <Animated.View style={[style.input, animatedBorderStyle]}>
      {variant === InputVariant.search && (
        <View style={style.iconLeftArea}>
        <SearchIcon height={Dimensions[size] * 0.42} />
      </View>
      )}
      <TextInput
        style={[style.field]}
        placeholder="Buscar"
        placeholderTextColor={Colors.gray.gray80}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
        {...rest}
      />
    </Animated.View>
  );
}

const styles = (size: keyof typeof Dimensions) => StyleSheet.create({
  input: {
    width: '100%',
    height: Dimensions[size],
    borderWidth: 1,
    borderColor: Colors.gray.gray10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  field: {
    flex: 1,
    width: '100%',
    height: Dimensions[size],
    color: Colors.gray.gray80,
    fontSize: 16,
    fontFamily: 'PoppinsLight',
    paddingLeft: 10,
  },
  iconLeftArea: {
    width: "auto",
    height: Dimensions[size],
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
  },
});


export default Input