import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function App() {
   return (
      <NavigationContainer>
         <Drawer.Navigator
            screenOptions={({ navigation }) => ({
               drawerPosition: 'right',
               headerStyle: { backgroundColor: '#0b2e66' },
               headerTintColor: 'white',
               headerTitleAlign: 'center',
               drawerActiveBackgroundColor: '#000',
               // Estiliza a parte lateral do drawer globalmente
               drawerStyle: {
                  backgroundColor: '#739fe6',
                  width: 130,
               },
               // Estiliza a parte lateral do Drawer individualmente
               //  drawerContentContainerStyle: { backgroundColor: 'white' },
               //  drawerContentStyle: { backgroundColor: '#f31' },
               headerLeft: false,
               headerRight: ({ color, size }) => (
                  <Ionicons
                     name='menu'
                     size={30}
                     color={'white'}
                     onPress={() => navigation.toggleDrawer()}
                  />
               ),
               headerRightContainerStyle: { paddingRight: 16 },
               headerTitleContainerStyle: { paddingLeft: 16 },
            })}
         >
            <Drawer.Screen
               name='Welcome'
               component={WelcomeScreen}
               options={{
                  drawerIcon: ({ color, size }) => (
                     <Ionicons name='home' size={size} color={color} />
                  ),
               }}
            />
            <Drawer.Screen
               name='User'
               component={UserScreen}
               options={{
                  drawerIcon: ({ color, size }) => (
                     <Ionicons name='person' size={size} color={color} />
                  ),
               }}
            />
         </Drawer.Navigator>
      </NavigationContainer>
   );
}

export default App;
