import { StyleSheet, Text, View, Alert } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/data';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
   submitButtonLabel,
   onCancel,
   onSubmit,
   defaultValues,
}) => {
   // We can also store objects here with properties
   const [inputs, setInputs] = useState({
      amount: {
         value: defaultValues ? defaultValues.amount.toString() : '',
         isValid: true,
      },
      date: {
         value: defaultValues ? getFormattedDate(defaultValues.date) : '',
         isValid: true,
      },
      description: {
         value: defaultValues ? defaultValues.description : '',
         isValid: true,
      },
   });

   // This will allow us to register keystrokes and store them in some state later
   function inputChangedHandler(inputIdentifier, enteredValue) {
      setInputs((curInputs) => {
         return {
            ...curInputs,
            // Allows to set and target a property dynamically
            // Now Allows to set and target a object's property dynamically
            // Always set isValid: true when adding values
            [inputIdentifier]: { value: enteredValue, isValid: true },
         };
      });
   }

   function submitHandler() {
      const expenseData = {
         amount: +inputs.amount.value,
         date: new Date(inputs.date.value),
         description: inputs.description.value,
      };

      // If it is NaN and if it's an amount <= than 0, this amountIsValid will hold false
      // If it's not NaN and if it's an amount > than 0, this amountIsValid will hold true
      const amountIsValid =
         !isNaN(expenseData.amount) && expenseData.amount > 0;

      // We use 'Invalid Date' because on the Date constructor when we pass a wrong date, we get this return error
      const dateIsValid = expenseData.date.toString() !== 'Invalid Date';

      // Should be valid once we trim it, once we remove the excess wide space at the start or ed of the string has a length that's greater than zero
      const descriptionIsValid = expenseData.description.trim().length > 0;

      if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
         // Alert.alert('Invalid input', 'Please check your input values');
         setInputs((curInputs) => {
            return {
               amount: {
                  value: curInputs.amount.value,
                  isValid: amountIsValid,
               },
               date: { value: curInputs.amount.date, isValid: dateIsValid },
               description: {
                  value: curInputs.amount.description,
                  isValid: descriptionIsValid,
               },
            };
         });
         return;
      }

      onSubmit(expenseData);
   }

   const formIsInvalid =
      !inputs.amount.isValid ||
      !inputs.date.isValid ||
      !inputs.description.isValid;

   return (
      <View style={styles.form}>
         <Text style={styles.title}>Your Expense</Text>
         <View style={styles.inputsRow}>
            <Input
               style={styles.rowInput}
               label='Amount'
               // Here the value that we wanna pass in is the boolean property isValid
               invalid={!inputs.amount.isValid}
               textInputConfig={{
                  keyboardType: 'decimal-pad',
                  // We pre configure this function with bind, so it can receive the first parameter 'amount'  (the second will be provided by react automatically)
                  onChangeText: inputChangedHandler.bind(this, 'amount'),
                  value: inputs.amount.value,
               }}
            />
            <Input
               style={styles.rowInput}
               label='Date'
               invalid={!inputs.date.isValid}
               textInputConfig={{
                  placeholder: 'YYYY-MM-DD',
                  maxLenght: 10,
                  onChangeText: inputChangedHandler.bind(this, 'date'),
                  value: inputs.date.value,
               }}
            />
         </View>
         <View>
            <Input
               label='Description'
               invalid={!inputs.description.isValid}
               textInputConfig={{
                  multiline: true,
                  onChangeText: inputChangedHandler.bind(this, 'description'),
                  value: inputs.description.value,
               }}
            />
            {/* This text will only be shown if we have invalid inputs */}
            {formIsInvalid && (
               <Text style={styles.errorText}>
                  Invalid input values - please check your entered data!
               </Text>
            )}
            <View style={styles.buttons}>
               <Button style={styles.button} mode='flat' onPress={onCancel}>
                  Cancel
               </Button>
               <Button style={styles.button} onPress={submitHandler}>
                  {submitButtonLabel}
               </Button>
            </View>
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
   errorText: {
      textAlign: 'center',
      color: GlobalStyles.colors.error500,
      margin: 8,
   },
   buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   button: {
      minWidth: 120,
      marginHorizontal: 8,
   },
});
