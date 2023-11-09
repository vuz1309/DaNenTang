
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKey = { FCM_TOKEN: 'FCM_TOKEN', AUTH_TOKEN: 'MERCHANT' };

export const LocalStorage = new Storage({
  size: 50,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: null,
  enableCache: true,
  sync: {
  },
});

