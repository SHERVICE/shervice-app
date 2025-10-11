import Button from '@/app/_components/Button';
import Heading from '@/app/_components/Heading';
import Input from '@/app/_components/Input';
import Successfully from '@/assets/icons/signup/successfully.svg';
import { Colors } from '@/constants/Colors';
import { useSignup } from '@/context/signup';
import { useTheme } from '@/context/theme-provider';
import { SigninType } from '@/schemas/signin';
import { SignupValidationCombinedStep } from '@/schemas/signup';
import { UserResponse } from '@/store/session/useSignup';
import { useEnableAccount } from '@/store/users/useEnableAccount';
import { useRefreshCode } from '@/store/users/useRefreshCode';
import { maskPhoneCustom } from '@/utils/maskPhone';
import { AxiosError } from 'axios';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Flex } from 'react-native-flex';

import { useMMKVObject } from 'react-native-mmkv';

const { width } = Dimensions.get('window');

const FIELDS = ['firstCode', 'secondCode', 'thirdCode', 'fourCode'] as const;

enum NumberCheck {
  ALERT = 'ALERT',
  ENABLE = 'ENABLE',
}

const SuccessFullyAccountCreate = () => {
  const router = useRouter();

  return (
    <Flex narrow gap={20} vertical centered>
      <Successfully />
      <Flex narrow vertical centered gap={10}>
        <Heading fontFamily="PoppinsBold" size={24} align="center">
          Conta criada com sucesso
        </Heading>
        <Heading fontFamily="PoppinsRegular" size={16} align="center">
          Explore e conecte-se com os melhores prestadores de serviço da sua
          região.
        </Heading>
      </Flex>
      <Flex narrow>
        <Button
          title="Ir para o Início"
          onPress={() => router.replace('/home')}
        />
      </Flex>
    </Flex>
  );
};

export default function ThirdStep() {
  const [isVisible, setIsVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  const { isDark } = useTheme();

  const router = useRouter();

  const inputRefs = useRef<TextInput[]>([]);

  const { control, watch, trigger, setError, clearErrors, setValue } =
    useFormContext<SignupValidationCombinedStep>();

  const { currentStep } = useSignup();

  const {
    mutateAsync: enableAccountMutation,
    isPending,
    isSuccess,
    error,
    reset,
  } = useEnableAccount();
  const { mutateAsync: refreshCodeMutation } = useRefreshCode();

  const axiosError = error as AxiosError<{ error: string }>;

  const code = watch('code');
  const [, setUser] = useMMKVObject<SigninType>('user');
  const [account] = useMMKVObject<UserResponse>('account');
  const [, setAuth] = useMMKVObject('auth');

  const [stepPhoneNumber, setStepPhoneNumber] = useState<
    keyof typeof NumberCheck
  >(NumberCheck.ALERT);

  const phoneNumber = watch('phone');

  const enableAccount = async () => {
    try {
      const valid = trigger(['code']);

      if (!valid) return;
      const { accessToken, refreshToken } = await enableAccountMutation({
        code: code.join(''),
        userId: account?.id as string,
      });

      setAuth({ accessToken, refreshToken });
      setUser(undefined);
    } catch (err) {
      if (err instanceof AxiosError) {
        FIELDS.map((_, index) => {
          setError(`code.${index}`, { type: 'validate', message: 'error' });
        });
      }
    }
  };

  const resendCodeOtp = async () => {
    try {
      await refreshCodeMutation({ userId: account?.id ?? '' });
      setSecondsLeft(60);
      setTimerActive(true);
      reset();
      clearErrors('code');
      FIELDS.map((_, index) => {
        setValue(`code.${index}`, '');
      });
      inputRefs.current[0]?.focus();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
    }
  };

  const prev = () => {
    setIsVisible(false);
    router.replace('/(auth)/signup');
  };

  useEffect(() => {
    if (currentStep === 1) {
      setIsVisible(true);
    }
    if (currentStep !== 1 && stepPhoneNumber !== 'ALERT') {
      setStepPhoneNumber(NumberCheck.ALERT);
    }
    if (currentStep === 1 && stepPhoneNumber === NumberCheck.ENABLE) {
      setTimerActive(true);
    }
  }, [currentStep, stepPhoneNumber]);

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  return (
    <View style={styles.container}>
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={prev}
        presentationStyle="overFullScreen"
      >
        <BlurView
          intensity={30}
          tint={isDark ? 'dark' : 'light'}
          style={styles.absolute}
        >
          <TouchableOpacity
            style={styles.absolute}
            activeOpacity={1}
            onPress={prev}
          />
        </BlurView>
        <View style={styles.centeredView}>
          <Flex
            style={[
              styles.modalContent,
              { backgroundColor: isDark ? Colors.black : Colors.white },
            ]}
            narrow
            vertical
            gap={15}
          >
            {!isSuccess && stepPhoneNumber === NumberCheck.ALERT && (
              <>
                <Heading fontFamily="PoppinsLight" size={16}>
                  Verifique seu número de telefone
                </Heading>
                <Heading fontFamily="PoppinsBold" size={20}>
                  {phoneNumber && maskPhoneCustom(phoneNumber)}
                </Heading>
                <Heading fontFamily="PoppinsRegular" size={14} align="center">
                  Enviaremos o código de autenticação para o número de celular
                  que você informou. Deseja continuar?
                </Heading>
                <Flex narrow gap={10}>
                  <Flex>
                    <Button
                      title="Continuar"
                      onPress={() => setStepPhoneNumber(NumberCheck.ENABLE)}
                    ></Button>
                  </Flex>
                </Flex>
              </>
            )}
            {!isSuccess && stepPhoneNumber === NumberCheck.ENABLE && (
              <>
                <Heading fontFamily="PoppinsLight" size={16}>
                  Informe o código
                </Heading>
                <Heading fontFamily="PoppinsRegular" size={14} align="center">
                  Um código de verificação foi enviado para{' '}
                  {phoneNumber && maskPhoneCustom(phoneNumber)}
                </Heading>
                <Flex narrow gap={10}>
                  {FIELDS.map((_, index) => (
                    <Flex width={50} key={index}>
                      <Controller
                        control={control}
                        name={`code.${index}`}
                        render={({
                          field: { onBlur, onChange, value },
                          fieldState,
                        }) => {
                          return (
                            <Input
                              variant="otp"
                              maxLength={1}
                              autoFocus={index === 0}
                              ref={(el: TextInput | null) => {
                                inputRefs.current[index] = el!;
                              }}
                              keyboardType="numeric"
                              onBlur={onBlur}
                              onChangeText={(text) => {
                                onChange(text);

                                if (text && index < FIELDS.length - 1) {
                                  inputRefs.current[index + 1]?.focus();
                                }
                                if (!text && index > 0) {
                                  inputRefs.current[index - 1]?.focus();
                                }
                              }}
                              value={value}
                              error={fieldState.error?.message}
                              showError={false}
                            />
                          );
                        }}
                      />
                    </Flex>
                  ))}
                </Flex>
                <Flex narrow gap={10} vertical centered>
                  <Flex narrow>
                    <Button
                      title="Verificar"
                      onPress={enableAccount}
                      disabled={isPending}
                    />
                  </Flex>
                  <Flex narrow fullWidth>
                    <Heading size={11} color={Colors.red} align="left">
                      {axiosError?.response?.data.error}
                    </Heading>
                  </Flex>
                  <Flex narrow mt={10}>
                    <Heading size={14} fontFamily="PoppinsRegular">
                      Não recebeu o código?{' '}
                    </Heading>
                    <TouchableHighlight
                      onPress={resendCodeOtp}
                      disabled={secondsLeft !== 0}
                    >
                      <Flex>
                        <Heading size={14} color={Colors.primary}>
                          Reenviar {secondsLeft > 1 ? `em ${secondsLeft}s` : ''}
                        </Heading>
                      </Flex>
                    </TouchableHighlight>
                  </Flex>
                </Flex>
              </>
            )}
            {isSuccess && <SuccessFullyAccountCreate />}
          </Flex>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 700,
    marginTop: 25,
  },
  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeText: {
    color: 'blue',
    marginTop: 10,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
