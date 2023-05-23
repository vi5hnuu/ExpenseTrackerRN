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
      state.error = null;
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
      state.pending = false;
      state.error = null;
    },
    deleteExpensePending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    deleteExpenseRejected: (state, action) => {
      state.pending = false;
      state.error = action.payload.error;
    },
    updateExpense: (state, action) => {
      const id = action.payload.id
      const exExpenseIdx = state.expenses.findIndex(expense => expense.id === id)
      const uExpenses = [...state.expenses]
      uExpenses[exExpenseIdx] = { ...state.expenses[exExpenseIdx], ...action.payload }
      state.expenses = uExpenses
      state.pending = false;
      state.error = null;
    },
    updateExpensePending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    updateExpenseRejected: (state, action) => {
      state.pending = false;
      state.error = action.payload.error;
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
      dispatch(slice.actions.addExpense({ id: name, ...expense, date: new Date(expense.date) }))
    } catch (error) {
      dispatch(slice.actions.addExpenseRejected({ error: error.toString() }))
    }
  }
}
function updateExpenseThunk(expense) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateExpensePending())
    try {
      await axios.patch(`https://expensetrackerrn-1f2ae-default-rtdb.firebaseio.com/expenses/${expense.id}.json`, { ...expense, id: null })
      dispatch(slice.actions.updateExpense({ ...expense, date: new Date(expense.date) }))
    } catch (error) {
      dispatch(slice.actions.updateExpenseRejected({ error: error.toString() }))
    }
  }
}
function deleteExpenseThunk(id) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.deleteExpensePending())
    try {
      await axios.delete(`https://expensetrackerrn-1f2ae-default-rtdb.firebaseio.com/expenses/${id}.json`)
      setTimeout(() => {
        dispatch(slice.actions.deleteExpense({ id }))
      }, 2000)
    } catch (error) {
      dispatch(slice.actions.deleteExpenseRejected({ error: error.toString() }))
    }
  }
}



export const thunks = { initilizeExpenses, addExpenseThunk, updateExpenseThunk, deleteExpenseThunk }
export default slice
export const actions = slice.actions
