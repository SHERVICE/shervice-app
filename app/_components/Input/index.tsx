import { Colors } from '@/constants/Colors';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  View,
} from 'react-native';

/** Icons */
import NotEye from '@/assets/icons/input/not-view.svg';
import SearchIcon from '@/assets/icons/input/search';
import Eye from '@/assets/icons/input/view.svg';

import { Dimensions } from '@/constants/Dimensions';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useState } from 'react';
import MaskInput, { Mask } from 'react-native-mask-input';

enum InputVariant {
  search = 'search',
  default = 'default',
  password = 'password',
}
interface InputProps extends TextInputProps {
  size?: keyof typeof Dimensions;
  variant?: keyof typeof InputVariant;
  mask?: Mask;
}

function Input({
  size = 'medium',
  variant = InputVariant.search,
  mask,
  ...rest
}: InputProps) {
  const [value, setValue] = useState<string>();
  const [securityText, setSecurityText] = useState(
    rest.secureTextEntry ?? false,
  );

  const isFocused = useSharedValue(0);

  const style = styles({ size, variant });

  const handleFocus = () => {
    isFocused.value = withTiming(1, { duration: 300 });
  };

  const handleBlur = () => {
    isFocused.value = withTiming(0, { duration: 300 });
  };

  const onChangeText = (text: string) => {
    setValue(text);
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
      {mask && (
        <MaskInput
          style={[style.field]}
          mask={mask}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(masked) => onChangeText(masked)}
          {...rest}
          secureTextEntry={securityText}
        />
      )}
      {!mask && (
        <TextInput
          style={[style.field]}
          placeholder="Buscar"
          value={value}
          placeholderTextColor={Colors.gray.gray80}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          onChangeText={onChangeText}
          {...rest}
          secureTextEntry={securityText}
        />
      )}
      {variant === InputVariant.password && (
        <TouchableHighlight
          style={style.iconPassword}
          onPress={() => setSecurityText(!securityText)}
          underlayColor="transparent"
        >
          <View>
            {securityText && <NotEye height={Dimensions[size] * 0.42} />}
            {!securityText && <Eye height={Dimensions[size] * 0.42} />}
          </View>
        </TouchableHighlight>
      )}
    </Animated.View>
  );
}

const styles = ({ size = 'large', variant }: InputProps) =>
  StyleSheet.create({
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
      paddingLeft: variant === InputVariant.search ? 10 : 20,
    },
    iconLeftArea: {
      width: 'auto',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 16,
    },
    iconPassword: {
      width: 'auto',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
  });

export default Input;
