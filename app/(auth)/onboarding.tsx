import { storage } from '@/utils/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from 'expo-router';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Flex } from 'react-native-flex';
import { useMMKVString } from 'react-native-mmkv';
import {
  SignupConbinedSchema,
  stepFields,
  stepFieldsWithCPFCNPJ,
} from '../../schemas/signup';
import Button from '../_components/Button';
import SafeAreaContainer from '../_components/SafeAreaContainer';
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
  const [currentStep, setCurrentStep] = useState(0);
  const flashListRef = useRef<FlatList<any>>(null);

  const navigate = useNavigation();

  /**
   * Values filled prev step
   */

  const [user] = useMMKVString('user');

  const { email, password } = JSON.parse(user || '');

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(SignupConbinedSchema),
    defaultValues: {
      isProvider: false,
      hasCNPJ: false,
      email,
      password,
    },
  });

  const values = methods.watch();

  const next = async () => {
    if (currentStep < steps.length - 1) {
      const newIndex = currentStep + 1;

      const stepField =
        values.isProvider && currentStep === 0
          ? stepFieldsWithCPFCNPJ
          : stepFields;

      const valid = await methods.trigger(stepField[currentStep]);
      if (valid) {
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

    persistData(currentStep);
  };

  const persistData = (step: number) => {
    const userData = JSON.parse(user || '');
    const updateUser = {
      ...userData,
      name: values.name,
      isProvider: !!values.isProvider,
      phone: values.phone,
      ...(values.isProvider && {
        cpfCnpj: values.cpfCnpj,
      }),
    };
    switch (step) {
      case 1:
        storage.set('user', JSON.stringify(updateUser));
        break;
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
              // keyExtractor={(item) => item.key}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) => <item.component />}
            />
          </Flex>
        </FormProvider>

        <Flex fullWidth p={[40, 20]} gap={10} vEnd narrow>
          <Flex>
            <Button title="Voltar" onPress={prev} />
          </Flex>
          <Flex>
            <Button title="Próximo" onPress={next} />
          </Flex>
        </Flex>
      </Flex>
    </SafeAreaContainer>
  );
}
