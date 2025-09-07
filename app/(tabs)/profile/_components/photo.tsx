import { Colors } from '@/constants/Colors';
import { Camera } from 'lucide-react-native';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Flex } from 'react-native-flex';

function PhotoEdit() {
  return (
    <TouchableHighlight style={styles.photoArea} underlayColor="transparent">
      <Flex vertical>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/a/ACg8ocIRAadRS4iSUsQCaDoNT22dnmZXdCzLZAumxpmZfhx0-JGIAJ_a=s576-c-no',
          }}
          style={styles.photo}
          resizeMode="cover"
        />
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
    backgroundColor: 'yellow',
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
