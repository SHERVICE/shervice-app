import { Colors } from '@/constants/Colors';
import { Tabs, useSegments } from 'expo-router';
import { Pressable } from 'react-native';
import BookingIcon from '../../assets/icons/tabs/booking';
import CategoriesIcon from '../../assets/icons/tabs/categories';
import HomeIcon from '../../assets/icons/tabs/home';
import ProfileIcon from '../../assets/icons/tabs/profile';

const tabs = [
  { name: 'home', title: 'Início', icon: HomeIcon },
  { name: 'categories', title: 'Categorias', icon: CategoriesIcon },
  { name: 'bookings', title: 'Agendamento', icon: BookingIcon },
  { name: 'profile', title: 'Perfil', icon: ProfileIcon },
];

export default function TabLayout() {
  const segments = useSegments();

  /**
   * IDENTIFIER PAGE
   */
  const activeTab = segments[segments.length - 1] || 'home';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black,
        headerShown: false,
        tabBarStyle: { height: 98 },
        tabBarIconStyle: { marginTop: 12, marginBottom: 5 },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'PoppinsLight',
        },
        tabBarButton(props) {
          return (
            <Pressable
              android_ripple={null} // sem ripple no Android
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
        const isActive = activeTab === tab.name;
        console.log(isActive);
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }) => <tab.icon color={color} />,
            }}
          />
        );
      })}
    </Tabs>
  );
}
