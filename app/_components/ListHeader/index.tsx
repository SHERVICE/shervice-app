import { Colors } from '@/constants/Colors';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';
import { Flex } from 'react-native-flex';

interface ListHeaderProps {
  title: string;
  subtitle: string;
  onPress?: TouchableHighlightProps['onPress'];
}

function ListHeader({ title, subtitle, onPress }: ListHeaderProps) {
  return (
    <Flex narrow spaceBetween fullWidth vCentered>
      <Text style={styles.title}>{title}</Text>
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <Text style={styles.subtitle}>{subtitle}</Text>
      </TouchableHighlight>
    </Flex>
  );
}

export default ListHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: 'PoppinsBold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: Colors.primary,
  },
});
