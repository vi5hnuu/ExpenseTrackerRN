import React, { useLayoutEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm';

export default function ManageExpenses({ route, navigation }) {
  const id = route.params?.expenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, id]);


  return <ExpenseForm />
}
