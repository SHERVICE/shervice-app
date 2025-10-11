import '@/global.css';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/context/theme-provider';
import { ToastProvider } from '@/context/toast';
import { requestAndGetLocation } from '@/utils/locale';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Host } from 'react-native-portalize';

Sentry.init({
  dsn: 'https://bacc95daf522e511b01adddfd3660e8d@o4510171911553024.ingest.us.sentry.io/4510171912404992',
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],
  spotlight: __DEV__,
});

const queryClient = new QueryClient();

export default Sentry.wrap(function RootLayout() {
  const [loaded] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    requestAndGetLocation();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Host>
            <ToastProvider>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{ headerShown: false, animation: 'none' }}
                />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ToastProvider>
          </Host>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
});
