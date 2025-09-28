import Button from '@/app/_components/Button';
import Heading from '@/app/_components/Heading';
import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import Switch from '@/app/_components/Switch';
import LogoutIcon from '@/assets/icons/profile/logout';
import TermsIcon from '@/assets/icons/profile/terms';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/theme-provider';
import { UserResponse } from '@/store/users/useSignup';
import { useAuthTokens } from '@/utils/getToken';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Eye,
  LockKeyhole,
  MapPin,
  SquarePen,
} from 'lucide-react-native';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PhotoEdit from './_components/photo';

function ProfileScreen() {
  const { toggleTheme, isDark } = useTheme();

  const router = useRouter();

  const { setToken } = useAuthTokens();

  const insets = useSafeAreaInsets();

  const styles = getStyles(insets.bottom);

  const [account, setAccount] = useMMKVObject<UserResponse>('account');

  const onLogout = () => {
    setAccount(undefined);
    setToken(undefined);
  };

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
        <Flex narrow p={[0, 20]} vertical gap={20}>
          <Flex narrow vCentered fullWidth>
            <TouchableHighlight style={styles.button}>
              <Flex narrow fullWidth spaceBetween>
                <Flex gap={16} narrow>
                  <SquarePen
                    color={isDark ? Colors.white : Colors.black}
                    size={24}
                  />
                  <Heading size={16} fontFamily="PoppinsRegular">
                    Editar Perfil
                  </Heading>
                </Flex>
                <Flex narrow>
                  <ChevronRight
                    color={isDark ? Colors.white : Colors.black}
                    size={24}
                  />
                </Flex>
              </Flex>
            </TouchableHighlight>
          </Flex>
          <Flex narrow vCentered fullWidth>
            <TouchableHighlight style={styles.button}>
              <Flex narrow fullWidth spaceBetween>
                <Flex gap={16} narrow>
                  <LockKeyhole
                    color={isDark ? Colors.white : Colors.black}
                    size={24}
                  />
                  <Heading size={16} fontFamily="PoppinsRegular">
                    Alterar a senha
                  </Heading>
                </Flex>
                <Flex narrow>
                  <ChevronRight
                    color={isDark ? Colors.white : Colors.black}
                    size={24}
                  />
                </Flex>
              </Flex>
            </TouchableHighlight>
          </Flex>
          <Flex narrow vCentered fullWidth>
            <TouchableHighlight style={styles.button}>
              <Flex narrow fullWidth spaceBetween>
                <Flex gap={16} narrow>
                  <MapPin
                    color={isDark ? Colors.white : Colors.black}
                    size={24}
                  />
                  <Heading size={16} fontFamily="PoppinsRegular">
                    Meus Endereços
                  </Heading>
                </Flex>
                <Flex narrow>
                  <ChevronRight
                    color={isDark ? Colors.white : Colors.black}
                    size={24}
                  />
                </Flex>
              </Flex>
            </TouchableHighlight>
          </Flex>
          <Flex narrow vCentered fullWidth>
            <TouchableHighlight style={styles.button}>
              <Flex narrow fullWidth spaceBetween>
                <Flex gap={16} narrow>
                  <Eye color={isDark ? Colors.white : Colors.black} size={24} />
                  <Heading size={16} fontFamily="PoppinsRegular">
                    Modo Escuro
                  </Heading>
                </Flex>
                <Flex narrow>
                  {/* <Switch
                    value={isDark}
                    onChange={() => toggleTheme()}
                    trackColor={{ true: Colors.primary }}
                  /> */}
                  <Switch
                    value={isDark}
                    onValueChange={() => toggleTheme()}
                    // trackColor={{ true: Colors.primary }}
                    trackColor={{
                      true: Colors.primary,
                      false: Colors.gray.gray80,
                    }}
                  />
                </Flex>
              </Flex>
            </TouchableHighlight>
          </Flex>
          <Flex narrow vCentered fullWidth>
            <TouchableHighlight style={styles.button}>
              <Flex narrow fullWidth spaceBetween>
                <Flex gap={16} narrow>
                  <TermsIcon color={isDark ? Colors.white : Colors.black} />
                  <Heading size={16} fontFamily="PoppinsRegular">
                    Política de Privacidade
                  </Heading>
                </Flex>
                <Flex narrow>
                  <ChevronRight
                    color={isDark ? Colors.white : Colors.black}
                    size={24}
                  />
                </Flex>
              </Flex>
            </TouchableHighlight>
          </Flex>
          <Flex narrow vCentered fullWidth>
            <TouchableHighlight
              style={[styles.button, styles.noBorder]}
              onPress={onLogout}
              underlayColor="transparent"
            >
              <Flex narrow fullWidth spaceBetween>
                <Flex gap={16} narrow>
                  <LogoutIcon color={Colors.red} />
                  <Heading
                    size={16}
                    fontFamily="PoppinsRegular"
                    color={Colors.red}
                  >
                    Sair
                  </Heading>
                </Flex>
              </Flex>
            </TouchableHighlight>
          </Flex>
        </Flex>
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
