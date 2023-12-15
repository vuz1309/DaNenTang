// import {createStackNavigator} from '@react-navigation/stack';
// import {useAppSelector} from '../../state-management/redux/hooks';
// import {Host} from 'react-native-portalize';

// import isEqual from 'react-fast-compare';
// import React from 'react';
// import {APP_ROUTE} from '../config/routes';
// import navigationConfigs from '../config/options';
// import RegisterScreen from '../../screens/RegisterScreen2';

// export type RootStackParamList = Record<string, any>;
// const MainStack = createStackNavigator<RootStackParamList>();
// const AppStack = () => (
//   <Host>
//     <MainStack.Navigator screenOptions={navigationConfigs}>
//       <MainStack.Screen name={APP_ROUTE.HOME_TAB} component={RegisterScreen} />
//     </MainStack.Navigator>
//   </Host>
// );

// const Navigation: React.FunctionComponent = () => {
//   const {token, user} = useAppSelector(state => state.userInfo, isEqual);
//   if (token) {
//     return <AppStack />;
//   }
//   return <AppStack />;
// };

// export default Navigation;
