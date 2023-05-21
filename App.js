import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import IconButton from './components/IconButton';
import { Provider } from 'react-redux';
import { store } from './store/Store';

const Stack = createNativeStackNavigator();
const BottomTaps = createBottomTabNavigator()

function ExpensesOverview() {
  return <BottomTaps.Navigator
    screenOptions={({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: '#212529'
        },
        headerTitleStyle: {
          color: '#f8f9fa'
        },
        tabBarStyle: {
          backgroundColor: '#212529',
        },
        tabBarActiveTintColor: '#f8f9fa',
        headerRight: () => <IconButton
          name='add-circle-outline'
          size={28}
          color="#f8f9fa"
          onPress={() => {
            navigation.navigate('ManageExpense')
          }}
        />,
        headerRightContainerStyle: {
          marginRight: 15,
        }
      }
    }}>
    <BottomTaps.Screen
      name='RecentExpenses'
      component={RecentExpenses}
      options={{
        headerTitle: 'Recent Expenses',
        tabBarLabel: 'Recent Expenses',
        tabBarIcon: ({ color, size }) => {
          return <Entypo name="back-in-time" size={size} color={color} />
        }
      }} />
    <BottomTaps.Screen
      name='AllExpenses'
      component={AllExpenses}
      options={{
        headerTitle: 'Expenses',
        tabBarLabel: 'Expenses',
        tabBarIcon: ({ color, size }) => {
          return <Fontisto name="wallet" size={size} color={color} />
        }
      }} />
  </BottomTaps.Navigator>
}
export default function App() {
  return <Provider store={store}>
    <StatusBar style='light' />
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='ExpensesOverview'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#212529',
          },
          headerTitleStyle: {
            color: '#f8f9fa'
          },
          headerTintColor: '#f8f9fa'
        }}>
        <Stack.Screen
          name='ManageExpense'
          component={ManageExpenses}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='ExpensesOverview'
          component={ExpensesOverview} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
}
