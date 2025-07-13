import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { router } from 'expo-router';
import { Flex } from 'react-native-flex';

import { TouchableHighlight, View } from 'react-native';

/** Icon */
import Heading from '@/app/_components/Heading';
import Bell from '@/assets/header/bell';
import Filter from '@/assets/icons/button/filter';
import ArrowDown from '@/assets/icons/home/arrow-down.svg';
import LocationIcon from '@/assets/icons/home/location.svg';
import { useCategories } from '@/store/useCategories';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import Button from '../../_components/Button';
import CategoryItem from '../../_components/CategoryItem';
import Input from '../../_components/Input';
import ListHeader from '../../_components/ListHeader';

function HomeScreen() {
  const { data: categories, error } = useCategories({
    page: 1,
    perPage: 8,
  });

  useEffect(() => {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }, [error]);

  return (
    <SafeAreaContainer>
      <Flex p={[20, 20, 0, 20]} vertical>
        <TouchableHighlight className="w-full">
          <Flex gap={10} narrow>
            <View className="w-[40px]	h-[40px] bg-primary5  rounded-[10] flex justify-center items-center">
              <LocationIcon width={15} height={15} />
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
              <TouchableHighlight className="w-[40px]	h-[40px] bg-primary5  rounded-[10] flex justify-center items-center">
                <View className="relative">
                  <View
                    className={`w-2 h-2 bg-[#ED4C4C]  absolute rounded-full right-1 top-1 z-20`}
                  ></View>
                  <Bell />
                </View>
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
          {categories?.data.slice(0, 8)?.map((item, key) => (
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
