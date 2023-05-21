import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function Button({ children, onPress, flat = false, style, textStyle }) {
  return <Pressable
    style={[styles.container, style, flat && styles.flat]}
    android_ripple={{ color: '#ced4da' }}
    onPress={onPress}>
    <View>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dee2e6',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    overflow: 'hidden',
    borderRadius: 5,
    alignItems: 'center',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 18
  }
})