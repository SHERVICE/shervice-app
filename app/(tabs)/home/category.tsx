import Button from '@/app/_components/Button';
import Header from '@/app/_components/Header';
import Heading from '@/app/_components/Heading';
import Input from '@/app/_components/Input';
import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import Filter from '@/assets/icons/button/filter';
import { Colors } from '@/constants/Colors';
import { SubCategories, useSubCategories } from '@/store/useSubCategories';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Flex } from 'react-native-flex';
import { SvgUri } from 'react-native-svg';

function Category() {
  const [search, setSeach] = useState<string>();

  const { categoryId, title } = useLocalSearchParams();
  const { data: subCategories, refetch } = useSubCategories({
    categoryId: categoryId as string,
    title: search,
  });

  const renderItem = (props: SubCategories) => {
    return (
      <TouchableHighlight style={styles.categoryItem}>
        <Flex vCentered gap={10}>
          <View style={styles.categoryFigure}>
            <SvgUri uri={props.figure} width={40} height={40} />
          </View>
          <View style={styles.categoryTitle}>
            <Heading size={16} fontFamily="PoppinsRegular">
              {props.title}
            </Heading>
            <Heading
              size={14}
              fontFamily="PoppinsRegular"
              color={Colors.gray500}
            >
              {`${props.quantityProvider} prestadore(s)`}
            </Heading>
          </View>
        </Flex>
      </TouchableHighlight>
    );
  };

  const refreshData = () => {
    refetch();
  };

  return (
    <SafeAreaContainer>
      <Flex p={[10, 20]} vertical fullWidth>
        <Flex narrow>
          <Header title={`Serviços de ${title}`} />
        </Flex>
        <Flex fullWidth narrow mt={20} gap={8}>
          <Flex>
            <Input
              placeholder="Buscar"
              autoFocus
              onChangeText={(e) => setSeach(e)}
            />
          </Flex>
          <Flex narrow width={50}>
            <Button iconLeft={<Filter />} />
          </Flex>
        </Flex>
        <Flex mt={30}>
          <FlashList
            data={subCategories?.data || []}
            estimatedItemSize={20}
            renderItem={({ item }) => renderItem(item)}
            refreshing={false}
            onRefresh={refreshData}
          />
        </Flex>
      </Flex>
    </SafeAreaContainer>
  );
}

export default Category;

export const styles = StyleSheet.create({
  categoryItem: {
    width: '100%',
    height: 80,
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.gray.gray10,
    borderRadius: 10,
    marginBottom: 20,
  },
  categoryFigure: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray.gray05,
    borderRadius: 5,
  },
  categoryTitle: {
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
  },
});
