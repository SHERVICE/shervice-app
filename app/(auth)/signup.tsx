import { Colors } from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Flex } from 'react-native-flex';
import Button from '../_components/Button';
import Heading from '../_components/Heading';
import Input from '../_components/Input';
import SafeAreaContainer from '../_components/SafeAreaContainer';
import LoginButtonSocial from './_components/login-button-social';

import { useFindUserByEmail } from '@/store/users/useFindUserByEmail';
import { AxiosError } from 'axios';
import { Controller, useFormContext } from 'react-hook-form';
import Header from '../_components/Header';
import { Toast } from '../_components/Toast';

import { GOOGLE_WEB_CLIENT, IOS_GOOGLE_CLIENT } from '@/const/vars';
import { useSignup } from '@/context/signup';
import {
  ProviderSession,
  SignupValidationCombinedStep,
  stepFields,
} from '@/schemas/signup';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId: IOS_GOOGLE_CLIENT,
  webClientId: GOOGLE_WEB_CLIENT,
});

export default function Signup() {
  const router = useRouter();

  const { control, setError, reset, trigger, watch } =
    useFormContext<SignupValidationCombinedStep>();

  const { setCurrentStep } = useSignup();

  const { email } = watch();

  const { mutateAsync: findUserByEmail, isPending } = useFindUserByEmail();

  const handleSignupGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        reset({
          email: response.data.user.email,
          name: response.data.user.name ?? '',
          photo: response.data.user.photo,
          accessToken: response.data.idToken,
          provider: ProviderSession.GOOGLE,
          isProvider: false,
          hasCNPJ: false,
          providerAccountId: response.data.user.id,
        });
        router.navigate('/(auth)/onboarding');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    try {
      const valid = await trigger(stepFields[0]);

      if (!valid) {
        return;
      }

      const userExists = await findUserByEmail({ email });

      if (userExists.exists) {
        setError('email', { message: 'Email já cadastrado' });
        return;
      }
      setCurrentStep(1);
      router.navigate('/(auth)/onboarding');
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err?.response?.data?.error;
        Toast.error(message);
        return;
      }
      Toast.error('Aconteceu algo de errado');
    }
  };

  return (
    <SafeAreaContainer>
      <Flex p={[0, 20]} narrow>
        <Header />
      </Flex>
      <ScrollView>
        <Flex vertical gap={2} p={[0, 20]} mt={53}>
          <Flex fullWidth centered mb={30}>
            <Image
              source={require('@/assets/images/logo.png')}
              width={80}
              height={80}
            />
          </Flex>
          <Flex narrow centered fullWidth vertical mb={20} gap={10}>
            <Heading fontFamily="PoppinsBold" size={24}>
              Criar Conta
            </Heading>
            <Heading
              fontFamily="PoppinsRegular"
              size={14}
              color={Colors.gray500}
              align="center"
            >
              Seja para contratar ou oferecer, cadastre-se e faça acontecer.
            </Heading>
          </Flex>
          <Flex gap={20} vertical fullWidth>
            <Flex vertical gap={16} fullWidth>
              <Controller
                control={control}
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
                control={control}
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
                    value={value}
                    error={errors.password?.message}
                  />
                )}
              />
              <Button
                title="Continuar"
                onPress={onSubmit}
                isLoading={isPending}
              />
            </Flex>
          </Flex>
          <Flex narrow fullWidth centered vCentered gap={10} m={[20, 0]}>
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
          <Flex gap={10} fullWidth narrow mb={20}>
            {Platform.OS === 'ios' ? (
              <>
                <Flex>
                  <LoginButtonSocial type="APPLE" title="Apple" />
                </Flex>
                <Flex>
                  <LoginButtonSocial
                    type="GOOGLE"
                    title="Google"
                    onPress={handleSignupGoogle}
                  />
                </Flex>
              </>
            ) : (
              <>
                <LoginButtonSocial
                  type="GOOGLE"
                  title="Google"
                  onPress={handleSignupGoogle}
                />
              </>
            )}
          </Flex>
        </Flex>
        <Flex narrow centered fullWidth gap={5}>
          <Heading size={14} fontFamily="PoppinsRegular">
            Já tem uma conta?
          </Heading>
          <Link href="/(auth)/signin" style={styles.link}>
            Entrar
          </Link>
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
