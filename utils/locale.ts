import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

export async function requestAndGetLocation(): Promise<GeolocationResponse | null> {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de localização',
          message: 'Este app precisa acessar sua localização.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancelar',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de localização negada');
        return null;
      }
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          console.error('Erro ao obter localização:', error);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  } catch (error) {
    console.error('Erro na permissão ou localização:', error);
    return null;
  }
}
