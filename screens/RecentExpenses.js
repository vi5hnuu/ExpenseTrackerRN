import { useSelector } from 'react-redux';
import ExpensesOutput from '../components/ExpensesOutput'

export default function RecentExpenses() {
  const expenseSlice = useSelector((state) => {
    return state.expenseSlice
  });

  const recentExpenses = expenseSlice['expenses'].filter(expense => {
    const tdy = new Date()
    return expense.date.getTime() > (tdy.getTime() - 7 * 24 * 60 * 60 * 1000);
  })
  return <ExpensesOutput
    isPending={expenseSlice.pending}
    isError={expenseSlice.error}
    expenses={recentExpenses}
    listHeading={'Recent Expenses'}
    expensesPeriod="Last 7 Days" />
}