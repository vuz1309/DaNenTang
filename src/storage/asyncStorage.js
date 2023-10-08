import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserLogged = async () => {
  const user = await AsyncStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user);
};

export const setUserLogged = user => {
  AsyncStorage.setItem('user', JSON.stringify(user));
};

export const removeUserLogged = () => {
  AsyncStorage.removeItem('user');
};

export const getAccessToken = () => {
  return AsyncStorage.getItem('token');
};

export const setAccessToken = token => {
  AsyncStorage.setItem('token', JSON.stringify(token));
};

export const removeAccessToken = () => {
  AsyncStorage.removeItem('token');
};
