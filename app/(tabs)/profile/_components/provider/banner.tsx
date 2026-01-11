import { UserResponse } from '@/store/session/useSignup';
import { Image, StyleSheet, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import PhotoEdit from '../photo';

const uri =
  'https://shervice-staging-assets.s3.us-east-2.amazonaws.com/banners/test.png';

export default function BannerProfile() {
  const [account] = useMMKVObject<UserResponse>('account');

  return (
    <View style={styles.banner}>
      <Image source={{ uri }} resizeMode="cover" style={styles.bannerImage} />
      <View style={styles.photoArea}>
        <PhotoEdit profile={account?.photo ?? null} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  photoArea: {
    position: 'absolute',
    bottom: -40,
    left: 20,
  },
});
