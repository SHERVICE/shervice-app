import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { useTheme } from '@/context/theme-provider';
import { useAuthTokens } from '@/utils/getToken';
import { useRouter } from 'expo-router';
import { Switch } from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';
import Button from '../_components/Button';
import Heading from '../_components/Heading';

function ProfileScreen() {
  const router = useRouter();

  const { toggleTheme, isDark } = useTheme();

  const { accessToken, setToken } = useAuthTokens();

  const [, setUser] = useMMKVObject('account');

  const onPressButton = () => {
    if (accessToken) {
      setUser(undefined);
      setToken(undefined);
      return;
    }
    router.navigate(`/(auth)/signin`);
  };

  return (
    <SafeAreaContainer>
      <Flex p={30} vertical gap={10}>
        <Button
          title={accessToken ? 'Sair' : 'Login'}
          onPress={onPressButton}
        />
        <Flex narrow vCentered gap={10}>
          <Heading>Tema Escuro</Heading>
          <Switch value={isDark} onChange={() => toggleTheme()} />
        </Flex>
      </Flex>
    </SafeAreaContainer>
  );
}

export default ProfileScreen;
