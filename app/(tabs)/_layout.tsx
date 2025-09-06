import { useTheme } from '@/context/theme-provider';
import { BlurView } from 'expo-blur';
import { Tabs, useSegments } from 'expo-router';
import { Platform, Pressable, StyleSheet } from 'react-native';
import BookingIcon from '../../assets/icons/tabs/booking';
import CategoriesIcon from '../../assets/icons/tabs/categories';
import HomeIcon from '../../assets/icons/tabs/home';
import ProfileIcon from '../../assets/icons/tabs/profile';
import IconWithAnimatedTopBar from '../_components/TabBarIcon';

const tabs = [
  { name: 'home', title: 'Início', icon: HomeIcon },
  { name: 'categories', title: 'Categorias', icon: CategoriesIcon },
  { name: 'bookings', title: 'Agendamentos', icon: BookingIcon },
  { name: 'profile', title: 'Perfil', icon: ProfileIcon },
];

export default function TabLayout() {
  const segments = useSegments();

  const { theme, isDark } = useTheme();
  const { colors } = theme;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        headerShown: false,
        tabBarStyle: {
          height: 98,
          position: 'absolute',
          borderTopWidth: 0,
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
              onPress={props.onPress}
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
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }) => (
                <IconWithAnimatedTopBar active={isActive}>
                  <tab.icon color={color} />
                </IconWithAnimatedTopBar>
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
