import Heading from '@/app/_components/Heading';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ThirdStep() {
  return (
    <View style={styles.thirdStep}>
      <Heading>Formulário 1</Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  thirdStep: {
    width: width - 40,
  },
});
