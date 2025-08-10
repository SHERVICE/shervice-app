import { LocationProvider } from '@/context/location';
import { Stack } from 'expo-router';

export default function Auth() {
  return (
    <LocationProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen
          name="location"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </LocationProvider>
  );
}
