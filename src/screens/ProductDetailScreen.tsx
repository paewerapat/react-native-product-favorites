import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { FavoriteButton } from '@/components/FavoriteButton';
import { useFavorites } from '@/context/FavoritesContext';
import type { ProductsStackParamList } from '@/navigation/types';
import { formatPrice } from '@/utils/format';

type Props = NativeStackScreenProps<ProductsStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} contentFit="contain" transition={150} />

      <View style={styles.header}>
        <Text style={styles.category}>{product.category}</Text>
        <FavoriteButton isFavorite={favorite} onPress={() => toggleFavorite(product)} />
      </View>

      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.rating}>
          ★ {product.rating.rate.toFixed(1)} ({product.rating.count})
        </Text>
      </View>

      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  image: {
    width: '100%',
    height: 240,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
});
