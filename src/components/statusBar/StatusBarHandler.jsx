// StatusBarHandler.js
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';

const StatusBarHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentRouteName = navigation.getCurrentRoute()?.name;

      if (currentRouteName === APP_ROUTE.FULL_VIDEO) {
        StatusBar.setHidden(true);
      } else {
        StatusBar.setHidden(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return null;
};

export default StatusBarHandler;
