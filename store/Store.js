import { configureStore } from "@reduxjs/toolkit";
import exSlice from './expensesSlice'
import thunk from "redux-thunk";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    expenseSlice: exSlice.reducer
  },
  middleware: [thunk, logger]
})
