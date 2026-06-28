import { StyleSheet, Text, View } from 'react-native';

export function ProductListScreen() {
  return (
    <View style={styles.container}>
      <Text>Product List</Text>
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
