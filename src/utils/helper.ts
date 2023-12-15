import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import DeviceInfo from 'react-native-device-info';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

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
export function wait(timeout: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
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

export const openLibraryDevice = (options: ImageLibraryOptions) => {
  return launchImageLibrary(options, r => {
    if (r.didCancel) {
      return [];
    }
    if (r.errorCode) {
      console.log('error');
    }

    return r.assets;
  });
};
import Clipboard from '@react-native-clipboard/clipboard';
import {PermissionsAndroid, ToastAndroid} from 'react-native';

export const copyToClipboard = (data: string) => {
  Clipboard.setString(data);
  ToastAndroid.show('Copy thành công!', ToastAndroid.SHORT);
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Quyền truy cập máy ảnh',
        message: 'Ứng dụng cần truy cập Camera của bạn',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Từ chối',
        buttonPositive: 'Đồng ý',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ToastAndroid.show('Không có quyền truy cập máy ảnh', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Quyền truy cập bị từ chối', ToastAndroid.SHORT);
    }
  } catch (err) {
    console.warn(err);
  }
};
