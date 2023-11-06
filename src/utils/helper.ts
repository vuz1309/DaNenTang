import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import DeviceInfo from 'react-native-device-info';

export function generatePersistConfig(key: string, whitelist: string[]) {
  return {
    key,
    whitelist,
    version: 1,
    debug: __DEV__,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
  };
}

export function logger(msg: any, isWarning?: boolean, params?: any): void {
  if (__DEV__ && !isWarning) {
    if (params) {
      console.log(msg, params);
    } else {
      console.log(msg);
    }
  }
  if (__DEV__ && isWarning) {
    if (params) {
      console.warn(msg, params);
    } else {
      console.warn(msg);
    }
  }
}

export const getDeviceId = async () => {
  const uniqueId: any = await DeviceInfo.getUniqueId();
  return uniqueId ?? '';
};
