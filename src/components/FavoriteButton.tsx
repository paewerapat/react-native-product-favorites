import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  isFavorite: boolean;
  onPress: () => void;
};

export function FavoriteButton({ isFavorite, onPress }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(withTiming(1.4, { duration: 120 }), withTiming(1, { duration: 120 }));
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={handlePress}
      hitSlop={8}>
      <Animated.Text style={[styles.icon, animatedStyle]}>{isFavorite ? '♥' : '♡'}</Animated.Text>
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
