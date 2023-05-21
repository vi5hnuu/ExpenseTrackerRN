import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function EmptyItem() {
  return <View style={styles.container}>
    <Text style={styles.text}>😲No Expenses to show😲</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe246',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
})