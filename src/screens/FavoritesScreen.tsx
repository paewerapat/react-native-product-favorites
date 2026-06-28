import { FlatList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ProductCard } from '@/components/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';

export function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <EmptyState message="ยังไม่มีสินค้าที่ถูกใจ กดหัวใจที่หน้ารายละเอียดสินค้าเพื่อบันทึก" />;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <ProductCard product={item} />
          <FavoriteButton isFavorite onPress={() => toggleFavorite(item)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
