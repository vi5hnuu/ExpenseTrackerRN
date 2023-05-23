import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: 'expense-slice',
  initialState: { expenses: [], error: null, pending: false },
  reducers: {
    init: (state, action) => {
      return { expenses: action.payload.expenses }
    },
    initPending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    initRejected: (state, action) => {
      state.pending = false;
      state.error = action.payload.error;
    },
    addExpense: (state, action) => {
      state.pending = false;
      state.error = false;
      state.expenses.push(action.payload)
    },
    addExpensePending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    addExpenseRejected: (state, action) => {
      state.pending = false;
      state.error = action.payload.error;
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
    },
  }
})
//thunks
async function initilizeExpenses(dispatch, getState) {
  dispatch(slice.actions.initPending())
  try {
    const { data } = await axios.get('https://expensetrackerrn-1f2ae-default-rtdb.firebaseio.com/expenses.json')
    const expenses = []
    for (const key of Object.keys(data)) {
      const expense = { id: key, ...data[key] }
      expense.date = new Date(expense.date)
      expenses.push(expense)
    }
    dispatch(slice.actions.init({ expenses }))
  } catch (error) {
    dispatch(slice.actions.initRejected({ error: error.toString() }))
  }
}

function addExpenseThunk(expense) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addExpensePending())
    try {
      const { name } = await axios.post('https://expensetrackerrn-1f2ae-default-rtdb.firebaseio.com/expenses.json', expense)
      setTimeout(() => {
        dispatch(slice.actions.addExpense({ id: name, ...expense, date: new Date(expense.date) }))
      }, 2000)
    } catch (error) {
      dispatch(slice.actions.addExpenseRejected({ error: error.toString() }))
    }
  }
}
function updateExpenseThunk(expense) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateExpensePending())
    try {
      const { name } = await axios.post('https://expensetrackerrn-1f2ae-default-rtdb.firebaseio.com/expenses.json', expense)
      setTimeout(() => {
        dispatch(slice.actions.updateExpense({ id: name, ...expense, date: new Date(expense.date) }))
      }, 2000)
    } catch (error) {
      dispatch(slice.actions.updateExpenseRejected({ error: error.toString() }))
    }
  }
}



export const thunks = { initilizeExpenses, addExpenseThunk }
export default slice
export const actions = slice.actions
