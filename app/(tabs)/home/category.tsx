import Heading from '@/app/_components/Heading';
import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import ExpandingSearchIcon from '@/app/_components/Search';
import PrevIcon from '@/assets/header/prev';
import { Colors } from '@/constants/Colors';
import { useSearch } from '@/context/search';
import { useTheme } from '@/context/theme-provider';
import { Categories, useCategories } from '@/store/useCategories';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Flex } from 'react-native-flex';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { useDebounce } from 'use-debounce';

function Category() {
  const navigate = useNavigation();
  const { query } = useSearch();
  const [searchService] = useDebounce(query, 500);

  const { categoryId, title } = useLocalSearchParams();
  const { data: subCategories, refetch } = useCategories({
    categoryId: categoryId as string,
    title: searchService,
  });

  const {
    theme: { colors },
  } = useTheme();
  const insets = useSafeAreaInsets();

  const renderItem = (props: Categories) => {
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
              {`${props.quantityProvider} prestador`}
            </Heading>
          </View>
        </Flex>
      </TouchableHighlight>
    );
  };

  const refreshData = () => {
    refetch();
  };

  const onPressBack = () => {
    navigate.goBack();
  };

  return (
    <SafeAreaContainer edges={['bottom']}>
      <Flex p={[insets.top + 10, 20]} vertical fullWidth>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <TouchableHighlight
            style={styles.buttonHeader}
            onPress={onPressBack}
            underlayColor="transparent"
          >
            <PrevIcon color={colors.text} />
          </TouchableHighlight>
          <Heading>{title}</Heading>

          <View style={{ position: 'absolute', right: 0 }}>
            <ExpandingSearchIcon />
          </View>
        </View>
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
  title: {
    position: 'absolute',
    top: 5,
    left: 0,
  },
  buttonHeader: {
    minWidth: 40,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
  },
});
