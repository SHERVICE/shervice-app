import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { useRouter } from 'expo-router';
import { Flex } from 'react-native-flex';
import Button from '../_components/Button';

function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaContainer>
      <Flex p={30}>
        <Button title="Login" onPress={() => router.navigate(`/(auth)/signin`)}>
          Login
        </Button>
      </Flex>
    </SafeAreaContainer>
  );
}

export default ProfileScreen;
