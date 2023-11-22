import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageVariable = {
  token: null,
};

export const initialize = async () => {
  storageVariable.token = await AsyncStorage.getItem('token');
};

export const getUserLogged = async () => {
  const user = await AsyncStorage.getItem('user');
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};

export const setUserLogged = async user => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const removeUserLogged = async () => {
  await AsyncStorage.removeItem('user');
};

/**
 *
 * @returns {string}
 */
export const getAccessToken = () => {
  return storageVariable.token;
};
/**
 *
 * @param {string} token
 */
export const setAccessToken = token => {
  storageVariable.token = token;
  AsyncStorage.setItem('token', token);
};

export const removeAccessToken = () => {
  AsyncStorage.removeItem('token');
};
