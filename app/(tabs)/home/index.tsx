import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { router } from 'expo-router';
import { Flex } from 'react-native-flex';

import { ScrollView, TouchableHighlight, View } from 'react-native';

/** Icon */
import Bell from '@/assets/header/bell';
import Filter from '@/assets/icons/button/filter';
import HelloIcon from '@/assets/icons/home/hello.svg';
import { UserResponse } from '@/store/session/useSignup';
import { useCategories } from '@/store/useCategories';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import Button from '../../_components/Button';
import CategoryItem from '../../_components/CategoryItem';
import Input from '../../_components/Input';
import ListHeader from '../../_components/ListHeader';
import AddressView from './_components/Address';

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

  const [account] = useMMKVObject<UserResponse>('account');

  const onPressLocaleArea = () => {
    if (account) return;

    router.navigate('/signup');
  };

  return (
    <SafeAreaContainer>
      <Flex p={[20, 20, 0, 20]} vertical>
        <TouchableHighlight
          className="w-full "
          onPress={onPressLocaleArea}
          underlayColor="transparent"
        >
          <Flex gap={10} narrow>
            {account && (
              <View className="w-[40px]	h-[40px] bg-primary5  rounded-[10] flex justify-center items-center">
                <HelloIcon width={20} height={20} />
              </View>
            )}

            <AddressView />
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
            <Input placeholder="O que você precisa?" />
          </Flex>
          <Flex narrow width={50}>
            <Button iconLeft={<Filter />} />
          </Flex>
        </Flex>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </Flex>
    </SafeAreaContainer>
  );
}

export default HomeScreen;
