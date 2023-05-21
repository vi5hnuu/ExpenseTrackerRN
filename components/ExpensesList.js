import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'
import EmptyItem from './EmptyItem'

export default function ExpensesList({ expenses }) {


  return <FlatList
    data={expenses}
    keyExtractor={(expense) => expense.id}
    ListEmptyComponent={<EmptyItem />}
    renderItem={(expenseWrapper) => <ExpenseItem
      expense={expenseWrapper.item} />}
  />
}


const styles = StyleSheet.create({

})