import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { router } from 'expo-router';
import { Flex } from 'react-native-flex';

import { TouchableHighlight, View } from 'react-native';

/** Icon */
import Heading from '@/app/_components/Heading';
import Filter from '@/assets/icons/button/filter';
import ArrowDown from '@/assets/icons/home/arrow-down.svg';
import BellIcon from '@/assets/icons/home/bell.svg';
import Cart from '@/assets/icons/home/cart.svg';
import { useCategories } from '@/store/useCategories';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import Button from '../../_components/Button';
import CategoryItem from '../../_components/CategoryItem';
import Input from '../../_components/Input';
import ListHeader from '../../_components/ListHeader';

function HomeScreen() {
  const { data: categories, error } = useCategories();

  useEffect(() => {
    if (error instanceof AxiosError) {
      console.log(error.request);
    }
  }, [error]);

  return (
    <SafeAreaContainer>
      <Flex p={[20, 20, 0, 20]} vertical>
        <TouchableHighlight className="w-full">
          <Flex gap={10} narrow>
            <View className="w-[40px]	h-[40px] bg-primary5  rounded-[10] flex justify-center items-center">
              <BellIcon width={15} height={15} />
            </View>
            <Flex vertical gap={5}>
              <Heading size={12} fontFamily="PoppinsLight">
                Meu endereço
              </Heading>
              <Flex gap={5}>
                <Heading size={14} fontFamily="PoppinsLight">
                  Av. Perimetral - Bastiana
                </Heading>
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
        <Flex fullWidth narrow mt={20} gap={8}>
          <Flex>
            <Input placeholder="O que você precisa?" autoFocus />
          </Flex>
          <Flex narrow width={50}>
            <Button iconLeft={<Filter />} />
          </Flex>
        </Flex>
        <Flex fullWidth mt={20} narrow>
          <ListHeader
            title="Categorias"
            subtitle="Ver todos"
            onPress={() => router.push(`/(tabs)/categories`)}
          />
        </Flex>
        <Flex mt={20} gap={6} style={{ flexWrap: 'wrap' }} spaceBetween>
          {categories?.map((item, key) => (
            <CategoryItem
              title={item.title}
              figure={item.figure}
              key={key}
              index={key}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/home/category',
                  params: { categoryId: item.id, title: item.title },
                })
              }
            />
          ))}
        </Flex>
      </Flex>
    </SafeAreaContainer>
  );
}

export default HomeScreen;
