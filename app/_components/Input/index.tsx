import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
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
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/context/theme-provider';
import { forwardRef, useEffect, useState } from 'react';
import MaskInput, { Mask } from 'react-native-mask-input';
import Heading from '../Heading';

enum InputVariant {
  search = 'search',
  default = 'default',
  password = 'password',
  otp = 'otp',
}

enum InputPadding {
  default = 20,
  otp = 15,
  search = 10,
  password = 10,
}

interface InputProps extends TextInputProps {
  size?: keyof typeof Dimensions;
  variant?: keyof typeof InputVariant;
  error?: string;
  mask?: Mask;
}

function Input(
  {
    size = 'medium',
    variant = InputVariant.search,
    error,
    onBlur,
    mask,
    ...rest
  }: InputProps,
  ref: React.Ref<TextInput>,
) {
  const [value, setValue] = useState<string>();
  const [securityText, setSecurityText] = useState(
    rest.secureTextEntry ?? false,
  );

  const {
    isDark,
    theme: { colors },
  } = useTheme();

  const isFocused = useSharedValue(0);

  const style = styles({ size, variant });

  const handleFocus = () => {
    isFocused.value = withTiming(1, { duration: 300 });
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    isFocused.value = withTiming(0, { duration: 300 });
    onBlur && onBlur(e);
  };

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onChangeTextMask = (masked: string, unmasked: string) => {
    setValue(masked);
  };

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    rest.onChange?.(e);
  };

  const animatedBorderStyle = useAnimatedStyle(() => {
    const borderColor = error
      ? '#EF4444'
      : interpolateColor(
          isFocused.value,
          [0, 1],
          [Colors.gray.gray10, Colors.primary],
        );
    return {
      borderColor,
    };
  });

  useEffect(() => {
    if (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [error]);

  return (
    <Animated.View style={[style.input, animatedBorderStyle]}>
      {error && (
        <Animated.View
          style={[style.errorArea, { backgroundColor: colors.background }]}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
        >
          <Heading size={12} color={Colors.red} style={{ color: Colors.red }}>
            {error}
          </Heading>
        </Animated.View>
      )}
      {variant === InputVariant.search && (
        <View style={style.iconLeftArea}>
          <SearchIcon
            height={Dimensions[size] * 0.42}
            color={isDark ? Colors.white : undefined}
          />
        </View>
      )}
      {mask && (
        <MaskInput
          style={[
            style.field,
            { color: isDark ? Colors.white : Colors.gray.gray80 },
          ]}
          mask={mask}
          value={value}
          onFocus={handleFocus}
          onBlur={(e) => handleBlur(e)}
          onChangeText={onChangeTextMask}
          onChange={onChange}
          {...rest}
          secureTextEntry={securityText}
        />
      )}
      {!mask && (
        <TextInput
          style={[
            style.field,
            { color: isDark ? Colors.white : Colors.gray.gray80 },
          ]}
          value={value}
          placeholderTextColor={Colors.gray.gray80}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          onChangeText={onChangeText}
          onChange={onChange}
          ref={ref}
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
      position: 'relative',
    },
    field: {
      flex: 1,
      width: '100%',
      height: Dimensions[size],
      color: Colors.gray.gray80,
      fontSize: 16,
      fontFamily: 'PoppinsLight',
      paddingLeft: InputPadding[variant ?? 'default'],
      ...(variant === 'otp' && {
        color: Colors.black,
        fontSize: 28,
        fontFamily: 'PoppinsBold',
      }),
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
    errorArea: {
      position: 'absolute',
      bottom: -9,
      right: 15,
      paddingHorizontal: 5,
      zIndex: 999,
      backgroundColor: Colors.white,
      color: Colors.red,
    },
  });

export default forwardRef<TextInput, InputProps>(Input);
