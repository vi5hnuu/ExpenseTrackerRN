import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'
import Retry from './Retry'

export default function ExpensesOutput({ isPending, isError,
  expenses,
  expensesPeriod, listHeading }) {

  return <View style={styles.container}>
    <ExpensesSummary
      expenses={expenses}
      periodName={expensesPeriod} />
    <View style={styles.expensesContainer} >
      <Text style={styles.listHeading}>{listHeading}</Text>
      {isPending ? <ActivityIndicator /> : isError ? <Retry error={isError} /> : <ExpensesList expenses={expenses} />}
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    marginHorizontal: 7,
    marginTop: 8,
    paddingBottom: 7
  },
  expensesContainer: {
    flex: 1,
    backgroundColor: '#343a40',
    borderRadius: 5,
    padding: 5
  },
  listHeading: {
    textAlign: 'center',
    color: '#f8f9fa',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8
  }
})