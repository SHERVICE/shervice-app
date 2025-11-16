import Heading from '@/app/_components/Heading';
import { Colors } from '@/constants/Colors';
import { useSearch } from '@/context/search';
import { useTheme } from '@/context/theme-provider';
import { Categories, useCategories } from '@/store/useCategories';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Flex } from 'react-native-flex';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { useDebounce } from 'use-debounce';
import ExpandingSearchIcon from '../_components/Search';

function CategoryScreen() {
  const { isDark } = useTheme();

  const { categoryId } = useLocalSearchParams();

  const { query } = useSearch();
  const [categorySearched, { isPending }] = useDebounce(query, 600);
  const {
    data: subCategories,
    refetch,
    isLoading,
    isFetching,
  } = useCategories({
    categoryId: categoryId as string,
    title: categorySearched.trim(),
  });

  const insets = useSafeAreaInsets();

  const CategorySkeleton = ({ isDark }: { isDark: boolean }) => {
    const colorMode = isDark ? 'dark' : 'light';
    return (
      <MotiView
        animate={{ opacity: 1 }}
        from={{ opacity: 0 }}
        transition={{ type: 'spring', duration: 400 }}
        style={[styles.container]}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <MotiView
            key={i}
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              delay: i * 200,
              duration: 1300,
              repeat: Infinity,
              repeatReverse: true,
            }}
            style={styles.categoryItem}
          >
            <Skeleton colorMode={colorMode} width={60} height={60} />
            <Flex vertical gap={5} vCentered>
              <Skeleton colorMode={colorMode} width={'80%'} height={20} />
              <Skeleton colorMode={colorMode} width={'60%'} height={20} />
            </Flex>
          </MotiView>
        ))}
      </MotiView>
    );
  };

  const renderItem = (props: Categories & { index: number }) => {
    return (
      <Animated.View
        entering={FadeInUp.delay(props.index * 100)
          .duration(400)
          .damping(12)}
      >
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
      </Animated.View>
    );
  };

  const refreshData = () => {
    refetch();
  };

  return (
    <Flex p={[insets.top + 15, 20]} vertical fullWidth>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignContent: 'flex-end',
          width: '100%',
        }}
      >
        <Heading style={styles.title}>Todas categorias</Heading>
        <ExpandingSearchIcon />
      </View>
      <Flex mb={30} mt={20}>
        {isLoading || isFetching || isPending() ? (
          <CategorySkeleton isDark={isDark} />
        ) : (
          <FlashList
            data={subCategories?.data || []}
            estimatedItemSize={20}
            renderItem={({ item, index }) => renderItem({ ...item, index })}
            refreshing={false}
            onRefresh={refreshData}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default CategoryScreen;

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
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    top: 5,
    left: 0,
  },
});
