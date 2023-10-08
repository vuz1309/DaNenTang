import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import {Colors} from './src/utils/Colors';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import {getUserLogged} from './src/storage/asyncStorage';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserLogged();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="MainScreen" component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
