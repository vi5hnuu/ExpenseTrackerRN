import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Input({
  label, inputConfig,
  inputStyle, labelStyle }) {
  return <View style={styles.inputContainer}>
    <Text style={[styles.label, labelStyle]}>{label}</Text>
    <TextInput
      style={[styles.input, inputStyle]} {...inputConfig} />
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5
  },
  input: {
    borderColor: '#dee2e6',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})