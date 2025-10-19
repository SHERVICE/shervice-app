import { Alert, Linking, Platform } from 'react-native';

/**
 * Mostra um alerta informando que o app precisa de permissão
 * e redireciona o usuário para as configurações do app.
 *
 * @param title Título do alerta
 * @param subtitle Mensagem do alerta
 */
export function openAppSettings(title: string, subtitle: string) {
  Alert.alert(title, subtitle, [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Abrir Configurações',
      onPress: () => {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      },
    },
  ]);
}
