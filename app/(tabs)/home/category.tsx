import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { Colors } from '@/constants/Colors';
import { Text } from 'react-native';
import { Flex } from 'react-native-flex';

function Category() {
  return (
    <SafeAreaContainer>
      <Flex bg={Colors.white}>
        <Text>Category</Text>
      </Flex>
    </SafeAreaContainer>
  );
}

export default Category;
