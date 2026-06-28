import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FavoritesProvider } from '@/context/FavoritesContext';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
