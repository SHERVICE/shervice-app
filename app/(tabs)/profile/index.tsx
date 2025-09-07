import Heading from '@/app/_components/Heading';
import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import Switch from '@/app/_components/Switch';
import LogoutIcon from '@/assets/icons/profile/logout';
import TermsIcon from '@/assets/icons/profile/terms';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/theme-provider';
import { useAuthTokens } from '@/utils/getToken';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Eye,
  LockKeyhole,
  MapPin,
  SquarePen,
} from 'lucide-react-native';
import { ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';
import PhotoEdit from './_components/photo';

function ProfileScreen() {
  const router = useRouter();

  const { toggleTheme, isDark } = useTheme();

  const { accessToken, setToken } = useAuthTokens();

  const [, setUser] = useMMKVObject('account');

  const onLogout = () => {
    setUser(undefined);
    setToken(undefined);
  };

  return (
    <SafeAreaContainer>
      <Flex p={[15, 20]} vertical gap={10} narrow mb={40}>
        <Flex narrow vCentered gap={40} vertical fullWidth>
          <Heading size={16} fontFamily="PoppinsBold">
            Meu perfil
          </Heading>
          <Flex narrow fullWidth centered vertical gap={10}>
            <PhotoEdit />
            <Flex narrow>
              <Heading fontFamily="PoppinsBold" size={16}>
                Vitor Shermon
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

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.gray.gray10,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});

export default ProfileScreen;
