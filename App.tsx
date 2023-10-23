import {StatusBar} from 'react-native';
import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import {Colors} from './src/utils/Colors';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import {
  getUserLogged,
  removeUserLogged,
  setUserLogged,
} from './src/storage/asyncStorage';
import UploadScreen from './src/screens/UploadScreen';

const Stack = createStackNavigator();
export const UserContext = createContext({});
const App = () => {
  const [user, setUser] = useState<any>(null);

  const login = useCallback((res: any) => {
    setUser(res);
    setUserLogged(res);
  }, []);

  const logout = useCallback(() => {
    removeUserLogged();
    setUser(null);
  }, []);

  const userContextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login],
  );

  useEffect(() => {
    const getUser = async () => {
      const userLogged = await getUserLogged();
      setUser(userLogged);
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={userContextValue}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <>
              <Stack.Screen name="MainScreen" component={MainScreen} />
              <Stack.Screen name="UploadScreen" component={UploadScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
