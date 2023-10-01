import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './src/pages/auth/SignUp';
import Login from './src/pages/auth/Login';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Đăng nhập" component={Login} />
        <Stack.Screen name="Đăng ký" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
