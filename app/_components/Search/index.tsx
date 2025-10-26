import { useSearch } from '@/context/search';
import { useTheme } from '@/context/theme-provider';
import { SearchIcon, X } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  Platform,
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
  const screenWidth = Dimensions.get('window').width - 34;
  const inputRef = useRef<TextInput>(null);

  const { query, setQuery, searchActive, setSearchActive } = useSearch();

  const width = useSharedValue(searchActive ? screenWidth : 50);

  const {
    theme: { colors },
  } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(width.value, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  const inputAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(width.value, [50, screenWidth], [0, 1]);
    return { opacity };
  });

  useEffect(() => {
    width.value = searchActive ? screenWidth : 50;

    if (searchActive) {
      runOnJS(() => inputRef.current?.focus())();
    }
  }, [searchActive, screenWidth, width]);

  const onBlur = () => {
    if (searchActive && query.length <= 0) {
      width.value = withTiming(50, {
        easing: Easing.out(Easing.cubic),
      });
      setSearchActive((prev) => !prev);
    }
  };

  const onClose = () => {
    setQuery('');
  };

  const onFocus = () => {
    width.value = searchActive ? screenWidth : 50;

    if (searchActive) {
      runOnJS(() => inputRef.current?.focus())();
    }
  };

  return (
    <View style={{ paddingRight: 20 }}>
      <Pressable onPress={() => setSearchActive(true)}>
        <Animated.View
          style={[
            styles.container,
            animatedStyle,
            { backgroundColor: searchActive ? colors.card : 'transparent' },
          ]}
        >
          <View style={styles.iconWrapper}>
            <SearchIcon
              color={searchActive ? '#898A83' : colors.text}
              size={22}
              strokeWidth={3}
            />
          </View>
          {searchActive && (
            <Animated.View style={[styles.inputWrapper, inputAnimatedStyle]}>
              <TextInput
                ref={inputRef}
                value={query}
                onChangeText={(text) => setQuery(text)}
                placeholder="Buscar..."
                onBlur={onBlur}
                onFocus={onFocus}
                placeholderTextColor="#898A83"
                style={[styles.input]}
              />
            </Animated.View>
          )}
          {query.length > 0 && (
            <Pressable onPress={onClose} style={styles.rightIcon}>
              <X size={18} color="#898A83" strokeWidth={3} />
            </Pressable>
          )}
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
    marginRight: 0,
  },
  iconWrapper: {
    width: 30,
    height: 26,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    color: '#898A83',
    paddingVertical: 0,
    textAlignVertical: 'center',
    ...Platform.select({ android: { paddingVertical: 0 } }),
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
