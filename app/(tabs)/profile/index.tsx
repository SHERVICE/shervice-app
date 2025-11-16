import Button from '@/app/_components/Button';
import Heading from '@/app/_components/Heading';
import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { Toast } from '@/app/_components/Toast';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/theme-provider';
import { UploadFile, usePhotoEdit } from '@/store/customer/usePhoto';
import { UserResponse } from '@/store/session/useSignup';
import { openAppSettings } from '@/utils/openSettings';
import {
  checkGalleryPermission,
  requestCameraPermission,
} from '@/utils/permissions';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { BookImage, Camera } from 'lucide-react-native';
import { useCallback, useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { Flex } from 'react-native-flex';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMMKVObject } from 'react-native-mmkv';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CameraModal from './_components/cam';
import OptionsCustomerProfile from './_components/customer/customer-options';
import PhotoEdit from './_components/photo';
import ProfileProvider from './_components/provider/profile';

function ProfileScreen() {
  const { isDark } = useTheme();

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const styles = getStyles(insets.bottom);

  const [account, setAccount] = useMMKVObject<UserResponse>('account');

  const sheetRef = useRef<BottomSheet>(null);
  const camRef = useRef<BottomSheet>(null);

  /**
   * React query
   */
  const { mutateAsync: mutationChangePhoto, isPending: isPendingChangePhoto } =
    usePhotoEdit();

  const pickAndUploadImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileUri = asset.uri ?? '';

        await onPhotoTake({ path: fileUri });
      }
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response?.data?.code === 'LIMIT_FILE_SIZE'
      ) {
        Toast.error('O tamanho máximo permitido é 2MB');
        return;
      }
      Toast.error('Falha ao enviar a foto. Tente novamente.');
    }
  };

  const uploadPhoto = async ({ name, type, uri }: UploadFile) => {
    try {
      const response = await mutationChangePhoto({
        uri: uri,
        name: type,
        type: uri,
      });
      return response;
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response?.data?.code === 'LIMIT_FILE_SIZE'
      ) {
        Toast.error('O tamanho máximo permitido é 2MB');
        return;
      }
    }
  };

  const onPhotoTake = async (photo: { path: string }) => {
    camRef.current?.close();
    const response = await uploadPhoto({
      uri: photo.path,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    if (response?.data.photo && account) {
      setAccount({
        ...account,
        photo: response.data.photo,
      });
    }
  };

  const checkPermission = async () => {
    sheetRef.current?.close();
    const hasPermission = await checkGalleryPermission();

    if (!hasPermission) {
      openAppSettings(
        'Permissão necessária',
        'O app precisa acessar a galeria para selecionar imagens. Por favor, habilite a permissão nas configurações.',
      );
      return;
    }
    pickAndUploadImage();
  };

  const checkPermissionAndOpenCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      openAppSettings(
        'Permissão necessária',
        'O app precisa acessar a câmera para tirar fotos. Por favor, habilite a permissão nas configurações.',
      );
      return;
    }
    camRef.current?.expand();
    sheetRef.current?.close();
  };

  const handleBackdropPress = useCallback(() => {
    sheetRef.current?.close(); // fecha o BottomSheet
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
        pressBehavior="close"
        onPress={handleBackdropPress}
      ></BottomSheetBackdrop>
    ),
    [],
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index !== 0) return;
      sheetRef?.current?.close?.();
    },
    [sheetRef],
  );

  if (!account) {
    return (
      <SafeAreaContainer>
        <Flex vCentered fullWidth centered vertical p={[0, 20]}>
          <Flex
            narrow
            vertical
            gap={20}
            centered
            vCentered
            mt={-(insets.top + insets.bottom)}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              width={80}
              height={80}
            />
            <Heading fontFamily="PoppinsBold" size={16}>
              Você não está logado
            </Heading>
          </Flex>
          <View style={styles.floatArea}>
            <Flex>
              <Button
                title="Cadastre-se"
                onPress={() => router.navigate('/(auth)/signup')}
              />
            </Flex>
            <Flex>
              <Button
                title="Entrar"
                type="outlined"
                onPress={() => router.navigate('/(auth)/signin')}
              />
            </Flex>
          </View>
        </Flex>
      </SafeAreaContainer>
    );
  }

  if (account.providerProfile?.id) {
    return <ProfileProvider />;
  }

  return (
    <SafeAreaContainer>
      <Flex p={[15, 20]} vertical gap={10} narrow mb={40}>
        <Flex narrow vCentered gap={40} vertical fullWidth>
          <Heading size={16} fontFamily="PoppinsBold">
            Meu perfil
          </Heading>
          <Flex narrow fullWidth centered vertical gap={10}>
            <PhotoEdit
              profile={account.photo}
              onPress={() => sheetRef.current?.expand()}
              loading={isPendingChangePhoto}
              disabled={isPendingChangePhoto}
            />
            <Flex narrow>
              <Heading fontFamily="PoppinsBold" size={16}>
                {account?.name}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ScrollView>
        <OptionsCustomerProfile />
      </ScrollView>
      <Portal>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={['20%']}
          enablePanDownToClose={true}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: isDark ? Colors.black : Colors.white,
          }}
          handleIndicatorStyle={{
            width: 40,
            backgroundColor: Colors.gray.gray20,
          }}
          onChange={handleSheetChange}
        >
          <BottomSheetScrollView>
            <TouchableHighlight
              onPress={checkPermissionAndOpenCamera}
              underlayColor="transparent"
            >
              <Flex p={[15, 20]} fullWidth vCentered gap={15}>
                <Camera
                  size={25}
                  color={isDark ? Colors.white : Colors.black}
                />
                <Heading fontFamily="PoppinsMedium" size={16}>
                  Tirar Foto
                </Heading>
              </Flex>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={checkPermission}
              underlayColor="transparent"
            >
              <Flex p={[15, 20]} fullWidth vCentered gap={15}>
                <BookImage
                  size={25}
                  color={isDark ? Colors.white : Colors.black}
                />
                <Heading fontFamily="PoppinsMedium" size={16}>
                  Escolher na Galeria
                </Heading>
              </Flex>
            </TouchableHighlight>
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
      <CameraModal
        sheetRef={camRef}
        onPhotoTaken={(photo) => onPhotoTake(photo)}
      />
    </SafeAreaContainer>
  );
}

const getStyles = (bottom: number) =>
  StyleSheet.create({
    button: {
      height: 40,
      width: '100%',
      borderBottomWidth: 1,
      borderColor: Colors.gray.gray10,
    },
    noBorder: {
      borderBottomWidth: 0,
    },
    floatArea: {
      width: '100%',
      position: 'absolute',
      flexDirection: 'row',
      gap: 10,
      bottom: bottom + 100,
    },
  });

export default ProfileScreen;
