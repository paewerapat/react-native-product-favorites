import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { RootTabParamList } from '@/navigation/types';
import { ProductsNavigator } from '@/navigation/ProductsNavigator';
import { FavoritesScreen } from '@/screens/FavoritesScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={ProductsNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
