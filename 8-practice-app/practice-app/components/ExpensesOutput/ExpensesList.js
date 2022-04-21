import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
   //itemData.index.item.description gets the index of an item
   return <ExpenseItem {...itemData.item} />; // We can spread all our items as props
}

const ExpensesList = ({ expenses }) => {
   return (
      <FlatList
         data={expenses}
         renderItem={renderExpenseItem}
         keyExtractor={(item) => item.id}
      />
   );
};

export default ExpensesList;

const styles = StyleSheet.create({});
