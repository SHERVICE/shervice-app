import { useSignup } from '@/context/signup';
import { usePhoneNumberCheck } from '@/store/phone/useCheckNumber';
import { UserResponse, useSignupMutation } from '@/store/users/useSignup';
import { cleanNumber } from '@/utils/cleanNumber';
import { ErrorsEnum } from '@/utils/errors';
import { AxiosError } from 'axios';
import { useNavigation } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';
import {
  SignupValidationCombinedStep,
  stepFields,
  stepFieldsWithCPFCNPJ,
} from '../../schemas/signup';
import Button from '../_components/Button';
import SafeAreaContainer from '../_components/SafeAreaContainer';
import { Toast } from '../_components/Toast';
import FirstStep from './_components/onboarding/first-step';
import SecondStep from './_components/onboarding/second-step';
import ThirdStep from './_components/onboarding/third-step';
import SlidingBackground from './_components/view-step';

const steps = [
  { key: 'step1', title: 'Seus dados', component: FirstStep },
  { key: 'step2', title: 'Endereço', component: SecondStep },
  { key: 'step3', title: 'Confirmação', component: ThirdStep },
];

export default function OnBoarding() {
  const { currentStep, setCurrentStep, flashListRef } = useSignup();

  const { mutateAsync: signupMutationAsyn, isPending } = useSignupMutation();
  const { mutateAsync: mutateCheckNumber } = usePhoneNumberCheck();
  const navigate = useNavigation();

  const [, setAccount] = useMMKVObject<UserResponse>('account');

  const { watch, trigger, setError } =
    useFormContext<SignupValidationCombinedStep>();

  const values = watch();

  const createUserInSecondStep = async () => {
    const data = await signupMutationAsyn({
      name: values.name,
      cpfCnpj: cleanNumber(values.cpfCnpj),
      email: values.email,
      address: {
        city: values.city,
        street: values.street ?? '',
        zipcode: cleanNumber(values.zipcode ?? ''),
      },
      password: values.password,
      phone: cleanNumber(values.phone),
      serviceProvider: values.isProvider ?? false,
      photo: values.photo,
      accessToken: values.accessToken,
      provider: values.provider,
      providerAccountId: values.providerAccountId,
    });

    setAccount(data);
  };

  const next = async () => {
    if (currentStep < steps.length - 1) {
      const newIndex = currentStep + 1;

      const stepField =
        values.isProvider && currentStep === 0
          ? stepFieldsWithCPFCNPJ
          : stepFields;

      const isValid = await trigger(stepField[currentStep]);

      if (!isValid) {
        return;
      }

      if (isValid) {
        if (currentStep === 1) {
          try {
            await createUserInSecondStep();
          } catch (err: any) {
            const code = err?.response?.data.code;
            const error = err?.response?.data.error;
            if (err instanceof AxiosError) {
              console.log(err.response?.data, 'sds');
              if (code === ErrorsEnum.PHONE_ALREADY_EXISTS) {
                setError('phone', {
                  message: 'Esse número já está em uso',
                });
                return;
              }
            }
            Toast.error(error || 'Aconteceu algo de errado, tente novamente!');
            return;
          }
        }
        if (currentStep === 0) {
          const numberCheck = await mutateCheckNumber({
            phone: cleanNumber(values.phone),
          });

          if (numberCheck.exists) {
            setError('phone', {
              message: 'Esse número já está em uso',
            });
            return;
          }
        }

        setCurrentStep(newIndex);
        flashListRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }
    }
  };

  const prev = () => {
    if (currentStep === 0) {
      navigate.goBack();
    }

    if (currentStep > 0) {
      const newIndex = currentStep - 1;
      setCurrentStep(newIndex);
      flashListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  return (
    <SafeAreaContainer>
      <Flex vertical>
        <Flex narrow gap={10} p={[0, 20]} mt={30}>
          <SlidingBackground count={steps.length} index={currentStep} />
        </Flex>
        <Flex p={[0, 20]} mt={30}>
          <FlatList
            ref={flashListRef}
            data={steps}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item }) => <item.component />}
          />
        </Flex>

        {currentStep < 2 && (
          <Flex fullWidth p={[40, 20]} gap={10} vEnd narrow>
            <Flex>
              <Button title="Voltar" onPress={prev} type="outlined" />
            </Flex>
            <Flex>
              <Button title="Próximo" onPress={next} disabled={isPending} />
            </Flex>
          </Flex>
        )}
      </Flex>
    </SafeAreaContainer>
  );
}
