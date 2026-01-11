import Button from '@/app/_components/Button';
import Heading from '@/app/_components/Heading';
import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { Colors } from '@/constants/Colors';
import { UserResponse } from '@/store/session/useSignup';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OptionsCustomerProfile from './_components/customer/customer-options';
import PhotoEdit from './_components/photo';
import ProfileProvider from './_components/provider/profile';

function ProfileScreen() {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  const styles = getStyles(insets.bottom);

  const [account] = useMMKVObject<UserResponse>('account');

  if (!account) {
    return (
      <SafeAreaContainer>
        <Flex vCentered fullWidth centered vertical p={[0, 20]}>
          <Flex
            narrow
            vertical
            gap={20}
            centered
            vCentered
            mt={-(insets.top + insets.bottom)}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              width={80}
              height={80}
            />
            <Heading fontFamily="PoppinsBold" size={16}>
              Você não está logado
            </Heading>
          </Flex>
          <View style={styles.floatArea}>
            <Flex>
              <Button
                title="Cadastre-se"
                onPress={() => router.navigate('/(auth)/signup')}
              />
            </Flex>
            <Flex>
              <Button
                title="Entrar"
                type="outlined"
                onPress={() => router.navigate('/(auth)/signin')}
              />
            </Flex>
          </View>
        </Flex>
      </SafeAreaContainer>
    );
  }

  if (account.providerProfile?.id) {
    return <ProfileProvider />;
  }

  return (
    <SafeAreaContainer>
      <Flex p={[15, 20]} vertical gap={10} narrow mb={40}>
        <Flex narrow vCentered gap={40} vertical fullWidth>
          <Heading size={16} fontFamily="PoppinsBold">
            Meu perfil
          </Heading>
          <Flex narrow fullWidth centered vertical gap={10}>
            <PhotoEdit profile={account.photo} />
            <Flex narrow>
              <Heading fontFamily="PoppinsBold" size={16}>
                {account?.name}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ScrollView>
        <OptionsCustomerProfile />
      </ScrollView>
    </SafeAreaContainer>
  );
}

const getStyles = (bottom: number) =>
  StyleSheet.create({
    button: {
      height: 40,
      width: '100%',
      borderBottomWidth: 1,
      borderColor: Colors.gray.gray10,
    },
    noBorder: {
      borderBottomWidth: 0,
    },
    floatArea: {
      width: '100%',
      position: 'absolute',
      flexDirection: 'row',
      gap: 10,
      bottom: bottom + 100,
    },
  });

export default ProfileScreen;
