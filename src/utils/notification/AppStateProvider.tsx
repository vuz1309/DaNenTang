import React, {createContext} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {useAppState} from '../../hooks/useAppState';
import {logger} from '../helper';

export const AppStateContext = createContext({});

export const grantAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Cần quyền truy cập wifi',
      message: 'Ứng dụng cần quyền truy cập mạng internet!',
      buttonNegative: 'Từ chối',
      buttonPositive: 'Cho phép',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const AppStateProvider = (props: any) => {
  const {children} = props;
  const [appState, setAppState] = React.useState<string>('');

  useAppState({
    onForeground: () => {
      setAppState('active');
    },

    onBackground: () => {
      setAppState('background');
    },

    onBackForeground: () => {},

    onBackToActive: () => {},
  });

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      grantAccessFineLocationPermission();
    }
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        appState,
      }}>
      {children}
    </AppStateContext.Provider>
  );
};
