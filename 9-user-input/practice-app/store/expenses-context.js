import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
   {
      id: 'e1',
      description: 'A pair of shoes',
      amount: 59.99,
      date: new Date('2021-12-19'),
   },
   {
      id: 'e2',
      description: 'Milkbox',
      amount: 30.0,
      date: new Date('2022-04-19'),
   },
   {
      id: 'e3',
      description: 'Gamepass',
      amount: 90.0,
      date: new Date('2021-11-19'),
   },
   {
      id: 'e4',
      description: 'Book',
      amount: 120.0,
      date: new Date('2022-02-19'),
   },
   {
      id: 'e5',
      description: 'Another book',
      amount: 18.59,
      date: new Date('2022-02-18'),
   },
   {
      id: 'e6',
      description: 'A pair of trousers',
      amount: 89.29,
      date: new Date('2022-01-05'),
   },
   {
      id: 'e7',
      description: 'Some bananas',
      amount: 5.99,
      date: new Date('2021-12-01'),
   },
   {
      id: 'e8',
      description: 'A book',
      amount: 14.99,
      date: new Date('2022-02-19'),
   },
   {
      id: 'e9',
      description: 'Another book',
      amount: 18.59,
      date: new Date('2022-02-18'),
   },
];

export const ExpensesContext = createContext({
   // Here we can define the shape of our context object, our context data
   // This is just a dummy definition for auto completion
   expenses: [],
   addExpense: ({ description, amount, data }) => {},
   deleteExpense: (id) => {},
   updateExpense: (id, { description, amount, data }) => {},
});

// Reducer function which will receive the current state and an action object
function expensesReducer(state, action) {
   // Here we can check the type of action that we received
   switch (action.type) {
      case 'ADD':
         const id = new Date().toString() + Math.random().toString();
         return [{ ...action.payload, id: id }, ...state]; // The object that we receive from the addExpense will be spread with our previous state (DUMMY DATA), we use an object inside an array to update the state immutable

      case 'UPDATE':
         // First we find the expense that we wanna update by id
         const updatableExpenseIndex = state.findIndex(
            (expense) => expense.id === action.payload.id
         );
         // We access the index of the expense with updatableExpenseIndex which has the index of an expense
         const updatableExpense = state[updatableExpenseIndex];
         // Then we create our update item, by generating an new item and merging with all the updated properties for the expense
         const updatedItem = { ...updatableExpense, ...action.payload.data };
         // The overwall array that should be updated, and we construct a new array
         const updatedExpenses = [...state];
         // We overrite the item at this index
         updatedExpenses[updatableExpenseIndex] = updatedItem;

         return updatedExpenses;

      case 'DELETE':
         return state.filter((expense) => expense.id !== action.payload);

      default:
         return state;
   }
}

// This will be a React Component Function
function ExpensesContextProvider({ children }) {
   // We can add our context logic here, the state management logic
   const [expensesState, dispatch] = useReducer(
      expensesReducer,
      DUMMY_EXPENSES
   ); // As a second parameter we can set a initial value

   function addExpense(expenseData) {
      dispatch({ type: 'ADD', payload: expenseData }); // We can pass a value to dispatch which will be made available by React inside of the reducer function
   }

   function deleteExpense(id) {
      dispatch({ type: 'DELETE', payload: id });
   }

   function updateExepnse(id, expenseData) {
      dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
   }

   const value = {
      // This is recreated whenever action is dispatched
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExepnse,
   };

   return (
      <ExpensesContext.Provider value={value}>
         {children}
      </ExpensesContext.Provider>
   );
}

export default ExpensesContextProvider;
