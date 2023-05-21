import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { getDate } from '../utils/utils'

export default function ExpenseItem({ expense }) {
  const nav = useNavigation()

  function expensePresshandler() {
    nav.navigate('ManageExpense', {
      expenseId: expense.id
    })
  }


  return <View>
    <Pressable
      onPress={expensePresshandler}
      android_ripple={{ color: '#dee2e6' }}
      style={styles.expenseItem}>
      <View style={styles.expenseInfoContainer}>
        <Text style={styles.expenseDescription}>{expense.description}</Text>
        <Text style={styles.expenseDate}>{getDate(expense.date)}</Text>
      </View>
      <View style={styles.expenseAmountContainer}>
        <Text style={styles.expenseAmount}>${expense.amount}</Text>
      </View>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: '#adb5bd',
    marginBottom: 5,
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 7,
    elevation: 5,
    overflow: 'hidden'
  },
  expenseInfoContainer: {
    flex: 8,
    gap: 4
  },
  expenseDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  expenseDate: {
    fontWeight: '600',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  expenseAmountContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 4,
    minWidth: 22,
  },
  expenseAmount: {
    fontWeight: 'bold',
  }
})