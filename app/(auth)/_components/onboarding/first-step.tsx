import Heading from '@/app/_components/Heading';
import Input from '@/app/_components/Input';
import RadiusCheck from '@/app/_components/Radius';
import { CNPJ_MASK, CPF_MASK, MASK_PHONE } from '@/constants/Mask';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Dimensions, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Flex } from 'react-native-flex';
import { SignupValidationCombinedStep } from '../../../../schemas/signup';

const { width } = Dimensions.get('window');

export default function FirstStep() {
  const { control, setValue, watch } =
    useFormContext<SignupValidationCombinedStep>();

  const hasCNPJ = watch('hasCNPJ');
  const isProvider = watch('isProvider');

  useEffect(() => {
    setValue('cpfCnpj', '');
  }, [hasCNPJ]);

  return (
    <ScrollView style={styles.firstStep}>
      <Flex vertical fullWidth gap={30}>
        <Flex vertical gap={10} fullWidth narrow>
          <Heading>Qual é o seu nome?</Heading>
          <Controller
            control={control}
            name="name"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors },
            }) => (
              <Input
                keyboardType="default"
                placeholder="Nome"
                variant="default"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />
        </Flex>
        <Flex vertical gap={15} fullWidth narrow>
          <Heading>Você deseja oferecer seus serviços pelo app?</Heading>
          <Flex gap={20} narrow vertical>
            <Flex narrow gap={5} vCentered>
              <Controller
                control={control}
                name="isProvider"
                render={({ field: { value } }) => (
                  <RadiusCheck
                    checked={value === false}
                    onPress={() => setValue('isProvider', false)}
                  />
                )}
              />
              <Pressable onPress={() => setValue('isProvider', false)}>
                <Heading size={12}>Não (Sou Cliente)</Heading>
              </Pressable>
            </Flex>
            <Flex narrow gap={5} vCentered>
              <Controller
                control={control}
                name="isProvider"
                render={({ field: { value } }) => (
                  <RadiusCheck
                    checked={!!value}
                    onPress={() => setValue('isProvider', true)}
                  />
                )}
              />
              <Pressable onPress={() => setValue('isProvider', true)}>
                <Heading size={12}>Sim (Sou prestador)</Heading>
              </Pressable>
            </Flex>
          </Flex>
        </Flex>
        {isProvider && (
          <Flex vertical gap={15} fullWidth narrow>
            <Heading>Possui CNPJ?</Heading>
            <Flex gap={20} narrow>
              <Flex narrow gap={5} vCentered>
                <Controller
                  control={control}
                  name="hasCNPJ"
                  render={({ field: { value } }) => (
                    <RadiusCheck
                      checked={value === false}
                      onPress={() => setValue('hasCNPJ', false)}
                    />
                  )}
                />
                <Pressable onPress={() => setValue('hasCNPJ', false)}>
                  <Heading size={12}>Não</Heading>
                </Pressable>
              </Flex>
              <Flex narrow gap={5} vCentered>
                <Controller
                  control={control}
                  name="hasCNPJ"
                  render={({ field: { value } }) => (
                    <RadiusCheck
                      checked={!!value}
                      onPress={() => setValue('hasCNPJ', true)}
                    />
                  )}
                />
                <Pressable onPress={() => setValue('hasCNPJ', true)}>
                  <Heading size={12}>Sim</Heading>
                </Pressable>
              </Flex>
            </Flex>
          </Flex>
        )}
        {isProvider && (
          <Flex vertical narrow gap={10} fullWidth>
            <Heading>{hasCNPJ ? 'CNPJ' : 'CPF'}</Heading>
            {!hasCNPJ && (
              <Controller
                control={control}
                name="cpfCnpj"
                render={({
                  field: { onBlur, onChange, value },
                  formState: { errors },
                }) => (
                  <Input
                    keyboardType="default"
                    mask={CPF_MASK}
                    placeholder="000.000.000-00"
                    variant="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.cpfCnpj?.message}
                  />
                )}
              />
            )}
            {hasCNPJ && (
              <Controller
                control={control}
                name="cpfCnpj"
                render={({
                  field: { onBlur, onChange, value },
                  formState: { errors },
                }) => (
                  <Input
                    keyboardType="default"
                    mask={CNPJ_MASK}
                    placeholder="000.000.000-00"
                    variant="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.cpfCnpj?.message}
                  />
                )}
              />
            )}
          </Flex>
        )}
        <Flex vertical narrow gap={10} fullWidth>
          <Heading>Telefone</Heading>
          <Controller
            control={control}
            name="phone"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors },
            }) => (
              <Input
                keyboardType="default"
                mask={MASK_PHONE}
                placeholder="(00) 0000-0000"
                variant="default"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.phone?.message}
              />
            )}
          />
        </Flex>
      </Flex>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  firstStep: {
    width: width - 40,
    height: 700,
    marginTop: 25,
  },
});
