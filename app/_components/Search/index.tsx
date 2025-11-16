import { useSearch } from '@/context/search';
import { useTheme } from '@/context/theme-provider';
import { SearchIcon, X } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function ExpandingSearchIcon() {
  const screenWidth = Dimensions.get('window').width - 40;
  const inputRef = useRef<TextInput>(null);
  const { query, setQuery, searchActive, setSearchActive } = useSearch();

  const width = useSharedValue(50);
  const { theme } = useTheme();
  const { colors } = theme;

  useEffect(() => {
    width.value = withTiming(searchActive ? screenWidth : 50, {
      duration: 400,
      easing: Easing.out(Easing.exp), // curva mais natural
    });

    if (searchActive) {
      runOnJS(() => inputRef.current?.focus())();
    } else {
      runOnJS(() => inputRef.current?.blur())();
    }
  }, [searchActive, screenWidth, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const inputAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(width.value, [50, screenWidth * 0.7], [0, 1]);
    return { opacity };
  });

  const onBlur = () => {
    if (searchActive && query.length <= 0) {
      setSearchActive(false);
    }
  };

  const onClose = () => {
    inputRef.current?.focus();
    setQuery('');
  };

  return (
    <View>
      <Pressable onPress={() => setSearchActive(true)}>
        <Animated.View
          style={[
            styles.container,
            animatedStyle,
            { backgroundColor: searchActive ? colors.card : 'transparent' },
          ]}
        >
          <View
            style={[
              styles.iconWrapper,
              { position: 'absolute', opacity: searchActive ? 0 : 1 },
            ]}
          >
            <SearchIcon
              color={searchActive ? '#898A83' : colors.text}
              size={22}
              strokeWidth={3}
            />
          </View>

          <Animated.View style={[styles.inputWrapper, inputAnimatedStyle]}>
            <View style={[styles.iconWrapper]}>
              <SearchIcon
                color={searchActive ? '#898A83' : colors.text}
                size={22}
                strokeWidth={3}
              />
            </View>
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar..."
              onBlur={onBlur}
              placeholderTextColor="#898A83"
              style={styles.input}
            />
            {query.length > 0 && (
              <Pressable onPress={onClose} style={styles.rightIcon}>
                <X size={18} color="#898A83" strokeWidth={3} />
              </Pressable>
            )}
          </Animated.View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrapper: {
    width: 30,
    height: 26,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  input: {
    fontSize: 16,
    color: '#898A83',
    paddingVertical: 0,
    textAlignVertical: 'center',
    flex: 1,
  },
  rightIcon: {
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
