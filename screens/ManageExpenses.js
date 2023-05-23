import React, { useEffect, useLayoutEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm';
import { useDispatch } from 'react-redux';
import { thunks } from '../store/expensesSlice';

export default function ManageExpenses({ route, navigation }) {
  const id = route.params?.expenseId
  useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, id]);


  return <ExpenseForm />
}
