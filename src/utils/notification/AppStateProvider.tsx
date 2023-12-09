import React, { createContext } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { useAppState } from '../../hooks/useAppState';
import { logger } from '../helper';

export const AppStateContext = createContext({});

export const grantAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Location permission is required for WiFi connections',
            message:
                'This app needs location permission as this is required to scan for wifi networks.',
            buttonNegative: 'DENY',
            buttonPositive: 'ALLOW',
        },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const AppStateProvider = (props: any) => {
    const { children } = props;
    const [appState, setAppState] = React.useState<string>("");

    useAppState({
        onForeground: () => {
            setAppState('active');
        },

        onBackground: () => {
            setAppState('background');
        },

        onBackForeground: () => {
        },

        onBackToActive: () => {
        }
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
