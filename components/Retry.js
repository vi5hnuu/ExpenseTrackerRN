import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { thunks } from '../store/expensesSlice';

export default function Retry({ error, onRetry }) {
  const dispatch = useDispatch()



  return <View style={styles.container}>
    <Text style={styles.error}>{error}</Text>
    <IconButton onPress={onRetry} name='reload' size={24} color='#fff' />
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#da1e37',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
  error: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  }
})