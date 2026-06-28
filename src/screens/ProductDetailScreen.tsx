import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import type { ProductsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ProductsStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text>Product Detail #{route.params.productId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
