import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootScenes';
import LoginScreen from '../../screens/LoginScreen';
import React from 'react';
import RegisterScreen from '../../screens/RegisterScreen2';
import {AUTHENTICATE_ROUTE} from '../config/routes';

const MainStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={AUTHENTICATE_ROUTE.LOGIN}
        component={LoginScreen}
      />
      <MainStack.Screen
        name={AUTHENTICATE_ROUTE.REGISTER}
        component={RegisterScreen}
      />
    </MainStack.Navigator>
  );
};

export default AuthStack;
