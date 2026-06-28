import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { RootTabParamList } from '@/navigation/types';
import { ProductsStack } from '@/navigation/ProductsStack';
import { FavoritesScreen } from '@/screens/FavoritesScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
