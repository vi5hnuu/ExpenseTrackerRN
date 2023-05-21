import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((pval, expense) => {
    return pval + expense.amount
  }, 0);

  return <View style={styles.container}>
    <Text style={[styles.period, styles.text]}>{periodName}</Text>
    <Text style={[styles.text, styles.sum]}>${expensesSum.toFixed(2)}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343a40',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sum: {
    color: '#e9ecef',
    fontSize: 20
  },
  period: {
    color: '#fff'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})