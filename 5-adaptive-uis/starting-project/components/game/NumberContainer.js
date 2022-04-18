import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../constants/colors';

function NumberContainer({ children }) {
   return (
      <View style={styles.container}>
         <Text style={styles.numberText}>{children}</Text>
      </View>
   );
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
   container: {
      borderWidth: 4,
      borderColor: Colors.quaternary500,
      padding: deviceWidth < 380 ? 16 : 24,
      margin: deviceWidth < 380 ? 16 : 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
   },
   numberText: {
      color: Colors.tertiary100,
      fontSize: deviceWidth < 380 ? 16 : 36,
      // fontWeight: 'bold',
      fontFamily: 'open-sans-bold',
   },
});
