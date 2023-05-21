import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'expense-slice',
  initialState: { expenses: [] },
  reducers: {
    addExpense: (state, action) => {
      const { description, date, amount } = action.payload
      state.expenses.push({ id: Math.random(), description, date, amount })
    },
    deleteExpense: (state, action) => {
      const id = action.payload.id
      state.expenses = state.expenses.filter(expense => expense.id !== id)
    },
    updateExpense: (state, action) => {
      const id = action.payload.id
      const exExpenseIdx = state.expenses.findIndex(expense => expense.id === id)
      const uExpenses = [...state.expenses]
      uExpenses[exExpenseIdx] = { ...state.expenses[exExpenseIdx], ...action.payload }
      state.expenses = uExpenses
    }
  }
})

export default slice
export const actions = slice.actions
