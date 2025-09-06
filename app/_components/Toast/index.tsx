import { Colors } from '@/constants/Colors';
import { Check, CircleAlert } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Flex } from 'react-native-flex';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Heading from '../Heading';

const TOAST_DURATION = 2000;

type ToastType = 'success' | 'error' | 'alert';

// API pública para chamar os toasts de fora
let showToastExternal: ((message: string, type?: ToastType) => void) | null =
  null;

export const Toast = {
  success: (message: string) => showToastExternal?.(message, 'success'),
  error: (message: string) => showToastExternal?.(message, 'error'),
  alert: (message: string) => showToastExternal?.(message, 'alert'),
};

const typeMessage = {
  success: {
    color: Colors.success,
    icon: <Check color={Colors.white} />,
  },
  error: {
    color: Colors.red,
    icon: <CircleAlert color={Colors.white} />,
  },
  alert: {
    color: Colors.tertiary,
    icon: <CircleAlert color={Colors.white} />,
  },
} as const;

export default function ToastManager() {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const showToast = (msg: string, toastType: ToastType = 'success') => {
    // impede abrir outro toast enquanto um está visível
    if (timer.current) return;

    setMessage(msg);
    setType(toastType);

    // anima para baixo (entra)
    translateY.value = withTiming(insets.top + 30, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    // agenda saída
    timer.current = setTimeout(() => {
      translateY.value = withTiming(
        -100,
        { duration: 400, easing: Easing.in(Easing.cubic) },
        () => runOnJS(clearToast)(),
      );
    }, TOAST_DURATION);
  };

  const clearToast = () => {
    timer.current && clearTimeout(timer.current);
    timer.current = null;
    setMessage('');
  };

  useEffect(() => {
    showToastExternal = showToast;
    return () => {
      showToastExternal = null;
      clearToast();
    };
  }, []);

  if (!message) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        animatedStyle,
        { backgroundColor: typeMessage[type].color },
      ]}
    >
      <Flex vCentered centered gap={10}>
        <Flex narrow>{typeMessage[type].icon}</Flex>
        <Flex>
          <Heading size={16} color={Colors.white}>
            {message}
          </Heading>
        </Flex>
      </Flex>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    zIndex: 99999999,
    elevation: 10,
    height: 50,
    justifyContent: 'center',
  },
});
