import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  isFavorite: boolean;
  onPress: () => void;
};

export function FavoriteButton({ isFavorite, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      hitSlop={8}>
      <Text style={styles.icon}>{isFavorite ? '♥' : '♡'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 24,
    color: '#e0245e',
  },
});
