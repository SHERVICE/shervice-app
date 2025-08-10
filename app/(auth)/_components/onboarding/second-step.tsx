import Button from '@/app/_components/Button';
import Heading from '@/app/_components/Heading';
import Input from '@/app/_components/Input';
import { useLocation } from '@/context/location';
import { SignupValidationCombinedStep } from '@/schemas/signup';
import { requestAndGetLocation } from '@/utils/locale';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Dimensions, StyleSheet } from 'react-native';
import { Flex } from 'react-native-flex';
import Geocoder from 'react-native-geocoding';

const { width } = Dimensions.get('window');

export default function SecondStep() {
  const { control, setValue } = useFormContext<SignupValidationCombinedStep>();
  const { coords } = useLocation();

  const router = useRouter();

  async function getAddressFromCoords(lat: number, lng: number) {
    try {
      const json = await Geocoder.from(lat, lng);
      if (json.results.length > 0) {
        const addressComponents = json.results[0].address_components;
        const getComponent = (types: string[]) =>
          addressComponents.find((comp) =>
            types.every((type) => comp.types.includes(type)),
          )?.long_name || '';

        const street = getComponent(['route']);
        const number = getComponent(['street_number']);
        const city =
          getComponent(['locality']) ||
          getComponent(['administrative_area_level_2']);
        const state = getComponent(['administrative_area_level_1']);
        const postalCode = getComponent(['postal_code']);

        setValue('city', city);
        setValue('state', state);
        setValue('street', street);
        setValue('zipcode', postalCode);
        setValue('number', number);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const getLocation = async () => {
    const location = await requestAndGetLocation();

    if (location) {
      getAddressFromCoords(
        coords?.latitude || location.coords.latitude,
        coords?.longitude || location.coords.longitude,
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, [coords]);

  return (
    <Flex style={styles.secondStep}>
      <Flex vertical gap={20} fullWidth narrow fullHeight>
        <Flex narrow vertical gap={10}>
          <Heading>Cidade</Heading>
          <Controller
            control={control}
            name="city"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors },
            }) => (
              <Input
                keyboardType="default"
                variant="default"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.city?.message}
              />
            )}
          />
        </Flex>

        <Flex vertical narrow gap={10}>
          <Heading>Rua</Heading>
          <Controller
            control={control}
            name="street"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors },
            }) => (
              <Input
                keyboardType="default"
                variant="default"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.street?.message}
              />
            )}
          />
        </Flex>
        <Flex gap={10} narrow>
          <Flex vertical gap={10}>
            <Heading>Estado</Heading>

            <Controller
              control={control}
              name="state"
              render={({
                field: { onBlur, onChange, value },
                formState: { errors },
              }) => (
                <Input
                  keyboardType="default"
                  variant="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.state?.message}
                />
              )}
            />
          </Flex>
          <Flex vertical gap={10}>
            <Heading>Nº</Heading>

            <Controller
              control={control}
              name="number"
              render={({
                field: { onBlur, onChange, value },
                formState: { errors },
              }) => (
                <Input
                  keyboardType="default"
                  variant="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.number?.message}
                />
              )}
            />
          </Flex>
        </Flex>
        <Flex vertical gap={10}>
          <Heading>CEP</Heading>
          <Controller
            control={control}
            name="zipcode"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors },
            }) => (
              <Input
                keyboardType="default"
                placeholder="000.000.000-00"
                variant="default"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.zipcode?.message}
              />
            )}
          />
        </Flex>

        <Flex>
          <Button
            title="Selecionar Localização"
            onPress={() => router.push('/(auth)/location')}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create({
  secondStep: {
    width: width - 40,
    // height: 900,
    flex: 1,
  },
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
