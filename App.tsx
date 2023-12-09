import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import {Colors} from './src/utils/Colors';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RegisterScreen from './src/screens/register/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import messaging from '@react-native-firebase/messaging';
import {logger} from './src/utils/helper';

import {FacebookRootState, store} from './src/state-management/redux/store';
import {Provider, useSelector} from 'react-redux';
import {
  APP_ROUTE,
  AUTHENTICATE_ROUTE,
  ONBOARDING_ROUTE,
} from './src/navigation/config/routes';
import InputName from './src/screens/register/InputName';

import InputBirthDate from './src/screens/register/InputBirthDate';
import InputEmail from './src/screens/register/InputEmail';
import CreatePassword from './src/screens/register/CreatePassword';
import UserScreen from './src/screens/UserScreen';
const Stack = createStackNavigator();
const AppChild = () => {
  const userLogged = useSelector(
    (state: FacebookRootState) => state.userInfo.user,
  );
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="light-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userLogged ? (
          <>
            <Stack.Screen name={APP_ROUTE.HOME_TAB} component={MainScreen} />
            <Stack.Screen
              name={APP_ROUTE.FRIEND_ALL}
              component={AllFriendsScreen}
            />
            <Stack.Screen
              name={APP_ROUTE.FRIEND_SUGGESTION}
              component={SuggestionScreen}
            />
            <Stack.Screen name={APP_ROUTE.REPORT} component={ReportScreen} />

            <Stack.Screen name={APP_ROUTE.USER_SCREEN} component={UserScreen} />
            <Stack.Screen name={APP_ROUTE.WEBVIEW} component={WebViewScreen} />
            <Stack.Screen
              name={APP_ROUTE.COMMENT_PAGE}
              component={CommentScreen}
            />
            <Stack.Screen
              component={FullScreenVideo}
              name={APP_ROUTE.FULL_VIDEO}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name={AUTHENTICATE_ROUTE.LOGINBYSAVED}
              component={LoginBySaved}
            />

            <Stack.Screen
              name={AUTHENTICATE_ROUTE.LOGIN}
              component={LoginScreen}
            />

            <Stack.Screen
              name={AUTHENTICATE_ROUTE.REGISTER}
              component={RegisterScreen}
            />
            <Stack.Screen
              name={ONBOARDING_ROUTE.INPUT_NAME}
              component={InputName}
            />
            <Stack.Screen
              name={ONBOARDING_ROUTE.INPUT_BIRTH_DATE}
              component={InputBirthDate}
            />
            <Stack.Screen
              name={ONBOARDING_ROUTE.INPUT_EMAIL}
              component={InputEmail}
            />
            <Stack.Screen
              name={ONBOARDING_ROUTE.CREATE_PASSWORD}
              component={CreatePassword}
            />
            <Stack.Screen
              name={ONBOARDING_ROUTE.CHECK_VERIFY_CODE}
              component={CheckVerifyCode}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import {PermissionsAndroid} from 'react-native';
import AllFriendsScreen from './src/screens/friends/AllFriends';
import SuggestionScreen from './src/screens/friends/SuggestionScreen';
import ReportScreen from './src/screens/reports/ReportScreen';
import WebViewScreen from './src/screens/webView/WebViewScreen';
import LoginBySaved from './src/screens/auths/LoginBySaved';
import SplashScreen from './src/screens/SplashScreen';
import CheckVerifyCode from './src/screens/register/CheckVerifyCode';
import {Layout} from './src/components/base/Layout';
import CommentScreen from './src/screens/CommentScreen';
import FullScreenVideo from './src/components/posts/FullScreenVideo';
const App = () => {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);
  React.useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      logger('Message handled in the background!', false, remoteMessage);
      const title = remoteMessage.notification?.title;
      const body = remoteMessage.notification?.body;
      logger('title: ', false, title);
      logger('body: ', false, body);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      logger(
        'Notification caused app to open from background state: ',
        false,
        remoteMessage.notification,
      );
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          logger(
            'Notification caused app to open from quit state: ',
            false,
            remoteMessage.notification,
          );
        }
      });
    messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification?.title;
      const body = remoteMessage.notification?.body;
      logger('title: ', false, title);
      logger('body: ', false, body);
      logger('notification on foreground state');
    });
  });
  return (
    <Provider store={store}>
      <AppChild />
    </Provider>
  );
};

export default App;
