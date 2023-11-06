import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageKey = {
  TOKEN: 'TOKEN',
  FCM_TOKEN : 'FCM_TOKEN'
};

export const storeStringAsyncData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const storeAsyncData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getStringAsyncData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (e) {
    // error reading value
  }
};

export const getAsyncData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeStringAsyncData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
  }
};
export const getUserLoggedIn = async () => {
  try {
    const token = getAsyncData('TOKEN');
    return token;
  } catch (e) {
    // error reading value
  }
};
