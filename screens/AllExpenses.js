import React from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { useSelector } from 'react-redux'

export default function AllExpenses() {
  const expenseSlice = useSelector((state) => state.expenseSlice)
  return <ExpensesOutput
    expenses={expenseSlice.expenses}
    listHeading={'Expenses'}
    expensesPeriod="Total" />
}