import {StatusBar} from 'react-native';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import {Colors} from './src/utils/Colors';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import RegisterScreen from './src/screens/register/RegisterScreen';
import MainScreen from './src/screens/MainScreen';

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

  const appRoutes = React.useMemo(() => {
    if (userLogged) {
      if (
        userLogged.active ==
        Enum.AccountStatus.NOT_CHANGE_AFTER_SIGNUP.toString()
      ) {
        return (
          <Stack.Screen
            name={APP_ROUTE.CHANGE_AFTER_SIGNUP}
            component={ChangeProfileAfterSignUp}
          />
        );
      } else if (
        userLogged.active == Enum.AccountStatus.NOT_VERIFY.toString()
      ) {
        return (
          <Stack.Screen
            name={ONBOARDING_ROUTE.CHECK_VERIFY_CODE}
            component={CheckVerifyCode}
          />
        );
      } else {
        return (
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
            <Stack.Screen
              component={WatchNightScreen}
              name={APP_ROUTE.WATCH_NIGHT}
            />
          </>
        );
      }
    } else {
      return (
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
        </>
      );
    }
  }, [userLogged]);
  return (
    <>
      <StatusBar
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {appRoutes}
      </Stack.Navigator>
    </>
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
import CommentScreen from './src/screens/CommentScreen';
import {NotificationProvider} from './src/utils/notification/NotificationProvider';
import {AppStateProvider} from './src/utils/notification/AppStateProvider';
import FullScreenVideo from './src/components/posts/FullScreenVideo';
import ChangeProfileAfterSignUp from './src/screens/auths/ChangeProfileAfterSignUp';
import Enum from './src/utils/Enum';
import WatchNightScreen from './src/screens/WatchNightScreen';
import StatusBarHandler from './src/components/statusBar/StatusBarHandler';
const App = () => {
  return (
    <Provider store={store}>
      <AppStateProvider>
        <NotificationProvider>
          <NavigationContainer>
            <StatusBarHandler />
            <AppChild />
          </NavigationContainer>
        </NotificationProvider>
      </AppStateProvider>
    </Provider>
  );
};

export default App;
