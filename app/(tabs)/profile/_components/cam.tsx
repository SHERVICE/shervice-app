import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Camera as CameraIcon, Repeat } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import {
  Camera,
  CameraPosition,
  PhotoFile,
  useCameraDevice,
} from 'react-native-vision-camera';

interface CameraModalProps {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  onPhotoTaken?: (photo: PhotoFile) => void;
}

const CameraModal = ({ onPhotoTaken, sheetRef }: CameraModalProps) => {
  const camera = useRef<Camera>(null);
  const [camPosition, setCamPosition] = useState<CameraPosition>('front'); // 'front' ou 'back'
  const device = useCameraDevice(camPosition);

  const handleBackdropPress = useCallback(() => {
    sheetRef.current?.close();
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
      />
    ),
    [],
  );

  if (!device) return null;

  const takePhoto = async () => {
    if (!camera.current) return;
    const takenPhoto = await camera.current.takePhoto({
      flash: 'off',
    });
    onPhotoTaken?.(takenPhoto);
  };

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={['90%']}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        style={styles.bottomSheetModal}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photoQualityBalance="speed"
            photo={true}
          />
          <View style={styles.camArea}>
            <Pressable onPress={() => takePhoto()} style={styles.camPressable}>
              <CameraIcon size={32} color="black" />
            </Pressable>
          </View>
          <View style={styles.changePositionArea}>
            <Pressable
              onPress={() =>
                setCamPosition(camPosition === 'front' ? 'back' : 'front')
              }
              style={styles.buttonChangePosition}
            >
              <Repeat size={24} color="white" />
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'black',
    zIndex: 9999,
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  preview: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    marginLeft: -100,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'white',
  },
  changePositionArea: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  buttonChangePosition: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  camPressable: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    height: '100%',
    overflow: 'hidden',
    zIndex: 9999,
  },
  bottomSheetModal: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
});
