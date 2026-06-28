import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';

type Props = {
  product: Product;
  onPress?: (product: Product) => void;
};

function ProductCardComponent({ product, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress?.(product)}>
      <Image source={product.image} style={styles.image} contentFit="contain" transition={150} />
      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.rating}>
            ★ {product.rating.rate.toFixed(1)} ({product.rating.count})
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.6,
  },
  image: {
    width: 64,
    height: 64,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  rating: {
    fontSize: 12,
    color: '#888',
  },
});
