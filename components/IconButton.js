import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ name, color, size, onPress, style }) {
  return <Pressable
    style={({ pressed }) => pressed ? [{ opacity: 0.5 }, style] : style}
    onPress={onPress}
  >
    <View>
      <Ionicons
        name={name}
        size={size}
        color={color} />
    </View>
  </Pressable>

}
