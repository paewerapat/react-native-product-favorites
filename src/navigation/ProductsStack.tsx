import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ProductsStackParamList } from '@/navigation/types';
import { ProductDetailScreen } from '@/screens/ProductDetailScreen';
import { ProductListScreen } from '@/screens/ProductListScreen';

const Stack = createNativeStackNavigator<ProductsStackParamList>();

export function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Detail' }}
      />
    </Stack.Navigator>
  );
}
