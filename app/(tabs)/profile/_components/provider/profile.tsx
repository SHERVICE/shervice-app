import { ScrollView, StyleSheet } from 'react-native';
import { Flex } from 'react-native-flex';
import OptionsCustomerProfile from '../customer/customer-options';
import BannerProfile from './banner';

export default function ProfileProvider() {
  return (
    <Flex vertical>
      <BannerProfile />
      <Flex mt={100}>
        <ScrollView>
          <OptionsCustomerProfile />
        </ScrollView>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  p: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 14,
  },
});
