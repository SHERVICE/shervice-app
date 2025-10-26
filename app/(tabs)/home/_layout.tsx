import PrevIcon from '@/assets/header/prev';
import { useTheme } from '@/context/theme-provider';
import { Stack, useRouter } from 'expo-router';
import { TouchableHighlight } from 'react-native';

const StackLayout = () => {
  const {
    theme: { colors },
  } = useTheme();

  const route = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="category"
        options={{
          title: 'Categorias',
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'PoppinsBold',
            fontSize: 16,
            color: colors.text,
          },
          headerShadowVisible: false,
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
        }}
      />
    </Stack>
  );
};

export default StackLayout;
