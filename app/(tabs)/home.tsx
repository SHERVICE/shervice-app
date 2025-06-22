import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { Flex } from 'react-native-flex';

import { Text, TouchableHighlight, View } from 'react-native';

/** Icon */
import ArrowDown from '@/assets/icons/home/arrow-down.svg';
import BellIcon from '@/assets/icons/home/bell.svg';
import Cart from '@/assets/icons/home/cart.svg';

function HomeScreen() {
  return (
    <SafeAreaContainer>
      <Flex p={[20, 20, 0, 20]} vertical>
        <TouchableHighlight className="w-full">
          <Flex gap={10} narrow>
            <View className="w-[40px]	h-[40px] bg-primary5  rounded-[10] flex justify-center items-center">
              <BellIcon width={15} height={15} />
            </View>
            <Flex vertical gap={5}>
              <Text className="text-xs font-poppinsLight">Meu endereço</Text>
              <Flex gap={5}>
                <Text className="text-sm font-poppinsLight">
                  Av. Perimetral - Bastiana
                </Text>
                <ArrowDown />
              </Flex>
            </Flex>
            <Flex narrow fullHeight vCentered>
              <TouchableHighlight>
                <Cart />
              </TouchableHighlight>
            </Flex>
          </Flex>
        </TouchableHighlight>
      </Flex>
    </SafeAreaContainer>
  );
}

export default HomeScreen;
