import Heading from '@/app/_components/Heading';
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
import { BookImage, Camera, User } from 'lucide-react-native';
import { useCallback, useRef } from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';
import { Flex } from 'react-native-flex';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMMKVObject } from 'react-native-mmkv';
import { Portal } from 'react-native-portalize';
import CameraModal from './cam';

interface PhotoProps extends TouchableHighlightProps {
  profile: string | null;
}

function PhotoEdit({ profile, ...rest }: PhotoProps) {
  const { isDark } = useTheme();

  const { mutateAsync: mutationChangePhoto, isPending: isPendingChangePhoto } =
    usePhotoEdit();

  const sheetRef = useRef<BottomSheet>(null);
  const camRef = useRef<BottomSheet>(null);

  const [account, setAccount] = useMMKVObject<UserResponse>('account');

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

  return (
    <TouchableHighlight
      style={styles.photoArea}
      underlayColor="transparent"
      {...rest}
      onPress={() => sheetRef.current?.expand()}
    >
      <Flex vertical centered vCentered>
        {profile && (
          <Image
            source={{
              uri: profile,
            }}
            style={styles.photo}
            resizeMode="cover"
          />
        )}

        {!profile && (
          <User size={40} color={isDark ? Colors.white : Colors.black} />
        )}

        <View style={styles.photoIcon}>
          <Camera size={18} color={Colors.white} />
        </View>

        {isPendingChangePhoto && (
          <View style={styles.loading}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        )}

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
      </Flex>
    </TouchableHighlight>
  );
}

export default PhotoEdit;

const styles = StyleSheet.create({
  photoArea: {
    width: 80,
    height: 80,
    borderRadius: 10,
    position: 'relative',
    backgroundColor: Colors.gray.gray10,
    overflow: 'hidden',
  },
  photoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
});
