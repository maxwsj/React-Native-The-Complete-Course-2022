import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Input from './Input';

const ExpenseForm = () => {
   // This will allow us to register keystrokes and store them in some state later
   function amountChangedHandler() {}

   return (
      <View style={styles.form}>
         <Text style={styles.title}>Your Expense</Text>
         <View style={styles.inputsRow}>
            <Input
               style={styles.rowInput}
               label='Amount'
               textInputConfig={{
                  keyboardType: 'decimal-pad',
                  onChangeText: amountChangedHandler,
               }}
            />
            <Input
               style={styles.rowInput}
               label='Date'
               textInputConfig={{
                  placeholder: 'YYYY-MM-DD',
                  maxLenght: 10,
                  onChangeText: () => {},
               }}
            />
         </View>
         <View>
            <Input
               label='Description'
               textInputConfig={{
                  multiline: true,
               }}
            />
         </View>
      </View>
   );
};

export default ExpenseForm;

const styles = StyleSheet.create({
   form: {
      marginTop: 40,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 24,
      textAlign: 'center',
   },
   inputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   rowInput: {
      flex: 1,
   },
});
