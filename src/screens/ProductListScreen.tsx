import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { ErrorView } from '@/components/ErrorView';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import type { ProductsStackParamList } from '@/navigation/types';
import type { Product } from '@/types/product';

type Props = NativeStackScreenProps<ProductsStackParamList, 'ProductList'>;

export function ProductListScreen({ navigation }: Props) {
  const { products, isLoading, isRefreshing, error, refresh, retry } = useProducts();

  const handlePressProduct = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { product });
    },
    [navigation],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <ErrorView message={error} onRetry={retry} />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <ProductCard product={item} onPress={handlePressProduct} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
      contentContainerStyle={products.length === 0 ? styles.emptyContent : undefined}
      ListEmptyComponent={<EmptyState message="ไม่มีสินค้า" />}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  emptyContent: {
    flexGrow: 1,
  },
});
