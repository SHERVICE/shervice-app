import { Colors } from '@/constants/Colors';
import { MASK_PHONE } from '@/constants/Mask';
import { Link } from 'expo-router';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Flex } from 'react-native-flex';
import Button from '../_components/Button';
import Heading from '../_components/Heading';
import Input from '../_components/Input';
import SafeAreaContainer from '../_components/SafeAreaContainer';
import LoginButtonSocial from './_components/login-button-social';

export default function Signin() {
  return (
    <SafeAreaContainer>
      <ScrollView>
        <Flex vertical gap={2} p={[0, 20]} mt={63}>
          <Flex fullWidth centered mb={30}>
            <Image
              source={require('@/assets/images/logo.png')}
              width={80}
              height={80}
            />
          </Flex>
          <Flex narrow centered fullWidth vertical mb={20}>
            <Heading fontFamily="PoppinsBold" size={24}>
              Entre na sua conta
            </Heading>
            <Heading
              fontFamily="PoppinsRegular"
              size={14}
              color={Colors.gray500}
              align="center"
            >
              Acesse sua conta usando o número de celular ou redes sociais
            </Heading>
          </Flex>
          <Flex gap={20} vertical fullWidth>
            <Flex vertical gap={10} fullWidth narrow>
              {Platform.OS === 'ios' ? (
                <>
                  <LoginButtonSocial type="APPLE" />
                  <LoginButtonSocial type="GOOGLE" />
                </>
              ) : (
                <>
                  <LoginButtonSocial type="GOOGLE" />
                </>
              )}
            </Flex>
            <Flex narrow fullWidth centered vCentered gap={10}>
              <View className="flex-1 h-[1px]" style={styles.divider} />
              <Heading
                fontFamily="PoppinsRegular"
                size={14}
                color={Colors.gray500}
              >
                Ou
              </Heading>
              <View className="flex-1 h-[1px]" style={styles.divider} />
            </Flex>
            <Flex vertical gap={16} fullWidth>
              <Input
                variant="default"
                placeholder="Informe seu número de celular"
                keyboardType="number-pad"
                size="large"
                mask={MASK_PHONE}
              />
              <Input
                variant="password"
                placeholder="Senha"
                secureTextEntry
                size="large"
              />
              <Flex narrow end fullWidth>
                <Link href="/(auth)/signup" style={styles.link}>
                  Esqueceu a senha?
                </Link>
              </Flex>
              <Button title="Entrar" />
              <Flex narrow centered fullWidth gap={5}>
                <Heading size={14} fontFamily="PoppinsRegular">
                  Não possui conta?
                </Heading>
                <Link href="/(auth)/signup" style={styles.link}>
                  Cadastrar
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </ScrollView>
    </SafeAreaContainer>
  );
}

export const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.gray.gray20,
  },
  link: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
  },
});
