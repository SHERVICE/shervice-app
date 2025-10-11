import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/theme-provider';
import { Camera, User } from 'lucide-react-native';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Flex } from 'react-native-flex';

interface PhotoProps {
  profile: string | null;
}

function PhotoEdit({ profile }: PhotoProps) {
  const { isDark } = useTheme();
  return (
    <TouchableHighlight style={styles.photoArea} underlayColor="transparent">
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
});
