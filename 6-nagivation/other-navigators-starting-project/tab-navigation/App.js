import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserScreen from './screens/UserScreen';
import WelcomeScreen from './screens/WelcomeScreen';
const BottomTab = createBottomTabNavigator();

function App() {
   return (
      <NavigationContainer>
         <BottomTab.Navigator
            screenOptions={{
               tabBarActiveTintColor: '#3c0a6b',
            }}
         >
            <BottomTab.Screen
               name='Welcome'
               component={WelcomeScreen}
               options={{
                  tabBarIcon: ({ color, size }) => (
                     <Ionicons name='home' size={size} color={color} />
                  ),
               }}
            />
            <BottomTab.Screen
               name='User'
               component={UserScreen}
               options={{
                  tabBarIcon: ({ color, size }) => (
                     <Ionicons name='person' size={size} color={color} />
                  ),
               }}
            />
         </BottomTab.Navigator>
      </NavigationContainer>
   );
}

export default App;
