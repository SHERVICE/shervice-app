import { Colors } from '@/constants/Colors';
import { TouchableHighlight, TouchableHighlightProps } from 'react-native';
import { Flex } from 'react-native-flex';
import Heading from '../Heading';

interface ListHeaderProps {
  title: string;
  subtitle: string;
  onPress?: TouchableHighlightProps['onPress'];
}

function ListHeader({ title, subtitle, onPress }: ListHeaderProps) {
  return (
    <Flex narrow spaceBetween fullWidth vCentered>
      <Heading fontFamily="PoppinsBold" size={16}>
        {title}
      </Heading>
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <Heading
          fontFamily="PoppinsRegular"
          size={14}
          color={Colors.primary}
          style={{ color: Colors.primary }}
        >
          {subtitle}
        </Heading>
      </TouchableHighlight>
    </Flex>
  );
}

export default ListHeader;
