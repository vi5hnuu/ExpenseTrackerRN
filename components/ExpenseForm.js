import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import IconButton from '../components/IconButton';
import { useNavigation, useRoute } from '@react-navigation/native'
import { actions as expenseActions, thunks } from '../store/expensesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from '../utils/utils'
import Retry from './Retry';

export default function ExpenseForm() {
  const route = useRoute()
  const id = route.params?.expenseId

  const expenseSlice = useSelector((state) => state.expenseSlice)

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [date, setDate] = useState(null)
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState(null)

  useLayoutEffect(() => {
    const exp = expenseSlice.expenses.find(expense => expense.id === id)
    if (!exp) {
      return
    }
    setDate(getDate(exp.date))
    setAmount(exp.amount.toString())
    setDescription(exp.description)
  }, [])

  function isFormValid() {
    const dt = new Date(date)
    const dateIsValid = dt.toString() !== 'Invalid Date' && dt.getTime() <= new Date().getTime()
    const amountIsValid = !isNaN(+amount) && +amount > 0
    const descriptionIsValid = description && description.length > 0
    return dateIsValid && amountIsValid && descriptionIsValid
  }

  function onDateChangeHandler(text) {
    setDate(text)
  }
  function onAmountChangeHandler(text) {
    setAmount(text)
  }
  function onDescriptionChangeHandler(text) {
    setDescription(text)
  }

  function expenseUpdateHandler() {
    if (!isFormValid()) {
      Alert.alert('Invalid data', `Please enter a valid value :\nUsage : \n\tDate: YYYY-MM-DD and <=${getDate(new Date())}\n\tAmount: >0\n\tDescription: >0`, [{ style: 'destructive' }])
      return
    }
    dispatch(expenseActions.updateExpense({ id, description, date: new Date(date), amount: +amount }))
    navigation.goBack();
  }
  function expenseAddHandler() {
    if (!isFormValid()) {
      Alert.alert('Invalid data', `Please enter a valid value :\nUsage : \n\tDate: YYYY-MM-DD and <=${getDate(new Date())}\n\tAmount: >0\n\tDescription: >0`, [{ style: 'destructive' }])
      return
    }
    dispatch(thunks.addExpenseThunk({ description, date: date, amount: +amount }))
  }
  function onRetryHandler() {
    dispatch(thunks.addExpenseThunk({ description, date: date, amount: +amount }))
  }
  function expenseCancelHandler() {
    navigation.goBack();
  }
  function expenseDeleteHandler() {
    // console.log(expenseActions.deleteExpense({ id }));
    dispatch(expenseActions.deleteExpense({ id }))
    navigation.goBack();
  }

  return <View style={styles.form}>
    <Input
      inputConfig={{
        ...styles.dateConfig,
        onChangeText: onDateChangeHandler,
        value: date
      }}
      label={'Date'} />
    <Input
      inputConfig={{
        ...styles.amountConfig,
        onChangeText: onAmountChangeHandler,
        value: amount
      }}
      label={'Amount'} />
    <Input
      inputStyle={styles.description}
      inputConfig={{
        ...styles.descriptionConfig,
        onChangeText: onDescriptionChangeHandler,
        value: description
      }}
      label={'Description'} />

    <View style={styles.actions}>
      {expenseSlice.pending ? <ActivityIndicator style={{ width: '50%' }} /> : expenseSlice.error ? <Retry onRetry={onRetryHandler} error={expenseSlice.error} /> : <Button
        style={{ backgroundColor: '#95d5b2' }}
        textStyle={{ fontWeight: 'bold' }}
        onPress={id ? expenseUpdateHandler : expenseAddHandler}
      >
        {id ? 'Update' : 'Add'}
      </Button>}
      <Button
        onPress={expenseCancelHandler}
        textStyle={{ color: '#f00', fontWeight: 'bold' }}
        flat>
        Cancel
      </Button>
    </View>
    {id && <IconButton
      onPress={expenseDeleteHandler}
      style={styles.iconButton}
      name='trash'
      color='#f00'
      size={24} />}
  </View>
}


const styles = StyleSheet.create({
  form: {
    gap: 7,
    margin: 10
  },
  description: {
    minHeight: 100,
    maxHeight: 200,
    textAlignVertical: 'top',
  },
  descriptionConfig: {
    multiline: true,
    placeholder: 'Hp Laptop'
  },
  dateConfig: {
    placeholder: 'YYYY-MM-DD',
    maxLength: 10,
    keyboardType: 'decimal-pad'
  },
  amountConfig: {
    placeholder: '800.50',
    keyboardType: 'decimal-pad'
  },
  actions: {
    flexDirection: 'row',
    gap: 7
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#dee2e6',
    borderRadius: 5,
    paddingVertical: 7
  }
})
