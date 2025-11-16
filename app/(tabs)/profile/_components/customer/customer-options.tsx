import Heading from '@/app/_components/Heading';
import Switch from '@/app/_components/Switch';
import LogoutIcon from '@/assets/icons/profile/logout';
import TermsIcon from '@/assets/icons/profile/terms';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/theme-provider';
import { UserResponse } from '@/store/session/useSignup';
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
  Platform,
  StyleSheet,
  Switch as SwitchIOS,
  TouchableHighlight,
} from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';

export default function OptionsCustomerProfile() {
  const { toggleTheme, isDark } = useTheme();

  const router = useRouter();

  const [, setAccount] = useMMKVObject<UserResponse>('account');

  const { setToken } = useAuthTokens();

  const onLogout = () => {
    setAccount(undefined);
    setToken(undefined);
  };

  return (
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
              <MapPin color={isDark ? Colors.white : Colors.black} size={24} />
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
              {Platform.OS === 'ios' && (
                <SwitchIOS
                  value={isDark}
                  onValueChange={() => toggleTheme()}
                  trackColor={{
                    true: Colors.primary,
                    false: Colors.gray.gray80,
                  }}
                />
              )}
              {Platform.OS === 'android' && (
                <Switch
                  value={isDark}
                  onValueChange={() => toggleTheme()}
                  trackColor={{
                    true: Colors.primary,
                    false: Colors.gray.gray80,
                  }}
                />
              )}
            </Flex>
          </Flex>
        </TouchableHighlight>
      </Flex>
      <Flex narrow vCentered fullWidth>
        <TouchableHighlight
          style={styles.button}
          onPress={() => router.push('/profile/privacy')}
          underlayColor="transparent"
        >
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
              <Heading size={16} fontFamily="PoppinsRegular" color={Colors.red}>
                Sair
              </Heading>
            </Flex>
          </Flex>
        </TouchableHighlight>
      </Flex>
    </Flex>
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
