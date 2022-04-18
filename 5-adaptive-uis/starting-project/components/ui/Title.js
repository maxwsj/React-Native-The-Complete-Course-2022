import { Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/colors';

function Title({ children, style }) {
   return <Text style={[styles.title, style]}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
   title: {
      fontFamily: 'open-sans-bold',
      fontSize: 24,
      // fontWeight: 'bold',
      color: Colors.tertiary100,
      textAlign: 'center',
      // borderWidth: Platform.OS === 'android' ? 2 : 0,
      borderWidth: Platform.select({ ios: 0, android: 2 }),
      borderColor: Colors.tertiary100,
      padding: 12,
      maxWidth: '80%',
      width: 300,
   },
});
