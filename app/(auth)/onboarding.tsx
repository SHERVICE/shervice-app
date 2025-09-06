import { useSignup } from '@/context/signup';
import { SigninType } from '@/schemas/signin';
import { UserResponse, useSignupMutation } from '@/store/users/useSignup';
import { cleanNumber } from '@/utils/cleanNumber';
import { ErrorsEnum } from '@/utils/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useNavigation } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';
import {
  SignupConbinedSchema,
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

  const navigate = useNavigation();

  const [user] = useMMKVObject<SigninType>('user');
  const [account, setAccount] = useMMKVObject<UserResponse>('account');

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(SignupConbinedSchema),
    defaultValues: {
      isProvider: false,
      hasCNPJ: false,
      email: user?.email,
      password: user?.password,
      code: ['', '', '', '', '', ''],
    },
  });

  const values = methods.watch();

  const createUserInSecondStep = async () => {
    const values = methods.getValues();
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

      const valid = await methods.trigger(stepField[currentStep]);

      if (valid) {
        if (currentStep === 1 && !account) {
          try {
            await createUserInSecondStep();
          } catch (err: any) {
            const code = err?.response?.data.code;
            const error = err?.response?.data.error;
            if (err instanceof AxiosError) {
              if (code === ErrorsEnum.PHONE_ALREADY_EXISTS) {
                methods.setError('phone', {
                  message: 'Esse número já está em uso',
                });
                return;
              }
            }
            Toast.error(error || 'Aconteceu algo de errado, tente novamente!');
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
        <FormProvider {...methods}>
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
        </FormProvider>

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
