import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/data';

const RecentExpenses = () => {
   const expensesCtx = useContext(ExpensesContext);

   // We wanna expenses that occurs in the last 7 days
   const recentExpenses = expensesCtx.expenses.filter((expense) => {
      const today = new Date();
      // Look for all expenses that occurred in the last seven days seen from today
      const day7DaysAgo = getDateMinusDays(today, 7);

      // Will wanna return true if an expenserecentExpenses has its state in that range of dates.
      return expense.date >= day7DaysAgo && expense.date < today; // if it's not > than day7DaysAgo that menas that expense.date would be older than seven days
   });

   return (
      <ExpensesOutput
         expenses={recentExpenses}
         expensesPeriod='Last 7 days'
         fallbackText='No expenses registered for the last 7 days.'
      />
   );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
