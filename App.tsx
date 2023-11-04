import {StatusBar} from 'react-native';
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import {Colors} from './src/utils/Colors';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RegisterScreen from './src/screens/register/RegisterScreen';
import MainScreen from './src/screens/MainScreen';

import {FacebookRootState, store} from './src/state-management/redux/store';
import {Provider, useSelector} from 'react-redux';
import {
  APP_ROUTE,
  AUTHENTICATE_ROUTE,
  ONBOARDING_ROUTE,
} from './src/navigation/config/routes';
import InputName from './src/screens/register/InputName';

const Stack = createStackNavigator();
export const UserContext = createContext({});
const AppChild = () => {
  const userLogged = useSelector(
    (state: FacebookRootState) => state.userInfo.user,
  );
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userLogged ? (
          <Stack.Screen name={APP_ROUTE.HOME_TAB} component={MainScreen} />
        ) : (
          <>
            <Stack.Screen
              name={AUTHENTICATE_ROUTE.LOGIN}
              component={LoginScreen}
            />
            <Stack.Screen
              name={AUTHENTICATE_ROUTE.REGISTER}
              component={RegisterScreen}
            />
            <Stack.Screen
              name={ONBOARDING_ROUTE.INPUT_NAME}
              component={InputName}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token = ', token);
  };

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    requestUserPermission();
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <AppChild />
    </Provider>
  );
};

export default App;
