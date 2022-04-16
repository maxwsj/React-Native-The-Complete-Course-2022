import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

function GuessLogItem({ roundNumber, guess }) {
   return (
      <View style={styles.listItem}>
         <Text style={styles.itemText}>#{roundNumber}</Text>
         <Text style={styles.itemText}>Opponent's Guest {guess}</Text>
      </View>
   );
}

export default GuessLogItem;

const styles = StyleSheet.create({
   listItem: {
      borderColor: Colors.primary800,
      borderWidth: 1,
      borderRadius: 40,
      padding: 12,
      marginVertical: 8,
      backgroundColor: Colors.accent500,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%', // This wil make sure that the log item take the full width that is made available by the parent component, which is the FlatList
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3,
   },
   itemText: {
      fontFamily: 'open-sans',
   },
});
