import { useLocation } from '@/context/location';
import { requestAndGetLocation } from '@/utils/locale';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Flex } from 'react-native-flex';
import Geocoder from 'react-native-geocoding';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../_components/Button';
import Heading from '../_components/Heading';

const { width } = Dimensions.get('window');

Geocoder.init('AIzaSyDMeGV6pQc-UECRzYUZ5NX6typIAfgu6oo');

export default function Location() {
  const [adressFormated, setAddressFormated] = useState('');

  /**
   * Context
   */

  const { setAddress, setCoords, coords } = useLocation();
  const mapRef = useRef<MapView>(null);

  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState({
    latitude: coords?.latitude || 37.78825,
    longitude: coords?.longitude || -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [markerPosition, setMarkerPosition] = useState<LatLng>({
    latitude: coords?.latitude || -23.55052,
    longitude: coords?.longitude || -46.633308,
  });

  const onDragEnd = (e: { nativeEvent: { coordinate: LatLng } }) => {
    getAddressFromCoords(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    );
    setMarkerPosition(e.nativeEvent.coordinate);
  };

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
        const zipcode = getComponent(['postal_code']);
        setAddressFormated(json.results[0].formatted_address);
        setAddress({
          number,
          state,
          street,
          city,
          zipcode,
        });
        setCoords({
          latitude: lat,
          longitude: lng,
        });
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const getLocation = async () => {
    const location = await requestAndGetLocation();

    if (location && !coords) {
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      setMarkerPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      getAddressFromCoords(location.coords.latitude, location.coords.longitude);

      setTimeout(() => {
        mapRef.current?.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
          1000,
        );
      }, 1000);
      return;
    }

    if (coords) {
      getAddressFromCoords(coords?.latitude, coords?.longitude);
    }
  };

  const styles = getStyles(insets.bottom);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Flex vertical>
      <Flex narrow p={20} centered fullWidth vertical vCentered>
        <Heading>Selecionar localização</Heading>
        <Heading fontFamily="PoppinsRegular">
          Arraste o pino para selecionar a localização
        </Heading>
      </Flex>

      <View style={{ position: 'relative', flex: 1, width: width }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={location}
          ref={mapRef}
        >
          <Marker coordinate={markerPosition} draggable onDragEnd={onDragEnd} />
        </MapView>
        <View style={styles.locateInfo}>
          <Flex vertical gap={10}>
            <Flex centered narrow fullWidth>
              <Heading>Localicazão Atual</Heading>
            </Flex>
            <Flex narrow gap={10}>
              <LottieView
                source={require('@/assets/animation/laguna.json')}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 0,
                }}
                autoPlay
              />
              <Flex>
                <Heading size={13}>{adressFormated}</Heading>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt={30}>
            <Button title="Voltar" />
          </Flex>
        </View>
      </View>
    </Flex>
  );
}

const getStyles = (paddingBottom: number) =>
  StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    locateInfo: {
      width: '100%',
      height: 200,
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
      paddingBottom: paddingBottom,
      paddingTop: 20,
      bottom: 0,
    },
  });
