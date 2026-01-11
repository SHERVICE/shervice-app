import { Colors } from '@/constants/Colors';
import { ProviderSession, SigninSchema, SigninType } from '@/schemas/signin';
import { UserResponse, useSigninMutation } from '@/store/session/useSignin';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Link, useRouter } from 'expo-router';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';
import Button from '../_components/Button';
import Header from '../_components/Header';
import Heading from '../_components/Heading';
import Input from '../_components/Input';
import SafeAreaContainer from '../_components/SafeAreaContainer';
import { Toast } from '../_components/Toast';
import LoginButtonSocial from './_components/login-button-social';

import { GOOGLE_WEB_CLIENT, IOS_GOOGLE_CLIENT } from '@/const/vars';
import { useSignup } from '@/context/signup';
import { SignupValidationCombinedStep } from '@/schemas/signup';
import { useFindUserByEmail } from '@/store/users/useFindUserByEmail';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId: IOS_GOOGLE_CLIENT,
  webClientId: GOOGLE_WEB_CLIENT,
});

export default function Signin() {
  const router = useRouter();

  const { mutateAsync: signinMutation, isPending: isPendingSignin } =
    useSigninMutation();

  const { mutateAsync: findUserByEmail } = useFindUserByEmail();

  const [, setAccount] = useMMKVObject<UserResponse>('account');

  const { setCurrentStep, setLastIdRegistered } = useSignup();

  const { reset } = useFormContext<SignupValidationCombinedStep>();

  /**
   * Redirect to active account
   */

  const checkAccountActive = (account: UserResponse) => {
    if (!account.phoneVerification) {
      setCurrentStep(1);
      setLastIdRegistered(account.id);
      router.push({
        pathname: '/(auth)/_components/onboarding/third-step',
        params: { phone: account.phone, id: account.id },
      });
      return;
    }

    setAccount(account);
    router.dismissAll();
    router.push('/(tabs)/profile');
  };

  const form = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (data: SigninType) => {
    try {
      const account = await signinMutation(data);
      checkAccountActive(account);
    } catch (err) {
      if (err instanceof AxiosError) {
        Toast.error(err.response?.data?.error || 'Aconteceu algo de errado');
      }
      Toast.error('Erro');
    }
  };

  const handleSigninGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      const userExists = await findUserByEmail({
        email: response.data?.user.email ?? '',
      });

      if (!isSuccessResponse(response)) {
        Toast.error('Falha ao autenticar com Google');
        return;
      }

      if (!userExists.exists) {
        reset({
          email: response.data.user.email,
          name: response.data.user.name ?? '',
          photo: response.data.user.photo,
          token: response.data.idToken,
          provider: ProviderSession.GOOGLE,
          isProvider: false,
          hasCNPJ: false,
          providerAccountId: response.data.user.id,
        });
        router.navigate('/(auth)/onboarding');
        return;
      }

      const account = await signinMutation({
        email: response.data.user.email,
        token: response.data.idToken,
        provider: ProviderSession.GOOGLE,
        password: null,
      });

      if (!account) {
        Toast.error('Erro ao autenticar com Google');
        return;
      }

      checkAccountActive(account);
    } catch (err) {
      if (err instanceof AxiosError) {
        Toast.error(err.response?.data?.error || 'Aconteceu algo de errado');
      }
    }
  };

  return (
    <SafeAreaContainer>
      <Flex p={[0, 20]} narrow>
        <Header />
      </Flex>
      <ScrollView>
        <Flex vertical gap={2} p={[0, 20]} mt={50}>
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
                  <LoginButtonSocial type="APPLE" title="Entrar com Apple" />
                  <LoginButtonSocial
                    type="GOOGLE"
                    title="Entrar com Google"
                    onPress={handleSigninGoogle}
                  />
                </>
              ) : (
                <>
                  <LoginButtonSocial
                    type="GOOGLE"
                    title="Entrar com Google"
                    onPress={handleSigninGoogle}
                  />
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
              <Controller
                control={form.control}
                name="email"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    variant="default"
                    placeholder="Seu email"
                    size="large"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onBlur={onBlur}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({
                  field: { onBlur, onChange, value },
                  formState: { errors },
                }) => (
                  <Input
                    keyboardType="default"
                    placeholder="Sua senha"
                    secureTextEntry
                    variant="password"
                    onChangeText={onChange}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onBlur={onBlur}
                    value={value ? value : undefined}
                    error={errors.password?.message}
                  />
                )}
              />
              <Flex narrow end fullWidth>
                <Link href="/(auth)/signup" style={styles.link} push>
                  Esqueceu a senha?
                </Link>
              </Flex>
              <Button
                title="Entrar"
                onPress={form.handleSubmit(onSubmit)}
                isLoading={isPendingSignin}
              />
              <Flex narrow centered fullWidth gap={5}>
                <Heading size={14} fontFamily="PoppinsRegular">
                  Não possui conta?
                </Heading>
                <Link href="/(auth)/signup" style={styles.link} push>
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
