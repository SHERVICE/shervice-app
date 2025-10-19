import { PermissionsAndroid, Platform } from 'react-native';
import { Camera } from 'react-native-vision-camera';

/**
 * Verifica permissão de acesso à galeria.
 * @returns {Promise<boolean>} Retorna true se permissão concedida, false caso contrário
 */
export async function checkGalleryPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    // iOS já pede permissão via Info.plist
    return true;
  }

  if (Platform.OS === 'android') {
    try {
      let permissionType =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permissionType);
      if (hasPermission) return true;

      // Se não tem, pede permissão
      const granted = await PermissionsAndroid.request(permissionType, {
        title: 'Permissão de Galeria',
        message: 'O app precisa acessar suas fotos para selecionar imagens.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancelar',
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Erro ao verificar permissão de galeria:', err);
      return false;
    }
  }

  return false;
}

/**
 * Verifica e solicita permissão de câmera
 * @returns {Promise<boolean>} true se permitido, false caso contrário
 */
export async function requestCameraPermission(): Promise<boolean> {
  try {
    // Checa permissão atual
    const status = Camera.getCameraPermissionStatus();

    if (status === 'granted') {
      return true;
    }

    const newStatus = await Camera.requestCameraPermission();

    return newStatus === 'granted';
  } catch (err) {
    console.error('Erro ao pedir permissão da câmera:', err);
    return false;
  }
}
