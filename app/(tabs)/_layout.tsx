import PrevIcon from '@/assets/header/prev';
import { SearchProvider } from '@/context/search';
import { useTheme } from '@/context/theme-provider';
import { BlurView } from 'expo-blur';
import { Tabs, useRouter, useSegments } from 'expo-router';
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import * as Haptics from 'react-native-haptic-feedback';
import BookingIcon from '../../assets/icons/tabs/booking';
import CategoriesIcon from '../../assets/icons/tabs/categories';
import HomeIcon from '../../assets/icons/tabs/home';
import ProfileIcon from '../../assets/icons/tabs/profile';
import ExpandingSearchIcon from '../_components/Search';
import IconWithAnimatedTopBar from '../_components/TabBarIcon';

const tabs = [
  { name: 'home', title: 'Início', icon: HomeIcon },
  { name: 'categories', title: 'Categorias', icon: CategoriesIcon },
  { name: 'bookings', title: 'Agendamentos', icon: BookingIcon },
  { name: 'profile', title: 'Perfil', icon: ProfileIcon },
];

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function TabLayout() {
  const segments = useSegments();

  function playHaptic() {
    Haptics.trigger('selection', hapticOptions);
  }

  const { theme, isDark } = useTheme();
  const { colors } = theme;
  const route = useRouter();

  return (
    <SearchProvider>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
          headerShown: false,
          tabBarStyle: {
            height: 98,
            position: 'absolute',
            borderTopWidth: 0,
            ...Platform.select({
              android: {
                backgroundColor: colors.background,
              },
            }),
          },
          ...(Platform.OS === 'ios' && {
            tabBarBackground: () => (
              <BlurView
                tint={isDark ? 'dark' : 'light'}
                intensity={50}
                style={{
                  ...StyleSheet.absoluteFillObject,
                }}
              />
            ),
          }),
          tabBarIconStyle: {
            marginTop: 6,
            marginBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: 'PoppinsLight',
          },
          tabBarButton(props) {
            return (
              <Pressable
                android_ripple={null}
                style={props.style}
                onPress={(e) => {
                  playHaptic();
                  props.onPress?.(e);
                }}
                onLongPress={props.onLongPress}
                accessibilityRole={props.accessibilityRole}
                accessibilityState={props.accessibilityState}
                accessibilityLabel={props.accessibilityLabel}
                testID={props.testID}
              >
                {props.children}
              </Pressable>
            );
          },
        }}
      >
        {tabs.map((tab) => {
          const activeTab = segments.find((item) => item.includes(tab.name));
          const isActive = activeTab === tab.name;
          const showHeader = tab.name === 'teste';
          return (
            <Tabs.Screen
              key={tab.name}
              name={tab.name}
              options={{
                title: tab.title,
                headerShown: showHeader,
                tabBarIcon: ({ color }) => (
                  <IconWithAnimatedTopBar active={isActive}>
                    <tab.icon color={color} />
                  </IconWithAnimatedTopBar>
                ),
                headerTransparent: true,
                headerTitleAlign: 'left',
                headerTitle: 'Todas Categorias',
                headerTintColor: colors.text,
                headerTitleStyle: {
                  fontFamily: 'PoppinsBold',
                  fontSize: 16,
                  color: colors.text,
                },

                headerLeft: (props) =>
                  props.canGoBack && (
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={() => route.back()}
                      style={{
                        minWidth: 40,
                        height: 44,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 4,
                      }}
                    >
                      <PrevIcon color={colors.text} />
                    </TouchableHighlight>
                  ),
                headerRight: () => <ExpandingSearchIcon />,
              }}
            />
          );
        })}
      </Tabs>
    </SearchProvider>
  );
}
