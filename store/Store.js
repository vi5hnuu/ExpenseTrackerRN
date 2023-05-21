import { configureStore } from "@reduxjs/toolkit";
import exSlice from './expensesSlice'

export const store = configureStore({
  reducer: {
    expenseSlice: exSlice.reducer
  }
})
