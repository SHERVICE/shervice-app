import { Flex } from 'react-native-flex';
import { ScrollView } from 'react-native-gesture-handler';
import OptionsCustomerProfile from '../customer/customer-options';
import BannerProfile from './banner';

export default function ProfileProvider() {
  return (
    <Flex vertical>
      <BannerProfile />
      <Flex mt={90}>
        <ScrollView>
          <OptionsCustomerProfile />
        </ScrollView>
      </Flex>
    </Flex>
  );
}
