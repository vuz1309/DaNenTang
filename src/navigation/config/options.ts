import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
// import {Themes} from 'assets/themes';
import {Platform} from 'react-native';
import { Colors } from '../../utils/Colors';
// import transition from './transition';

const navigationConfigs: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: Colors.green,
  },
  headerShown: false,
  gestureEnabled: true,
  cardShadowEnabled: true,
  keyboardHandlingEnabled: Platform.OS === 'ios',
  cardOverlayEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//   transitionSpec: {
//     open: transition,
//     close: transition,
//   },
};

export const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

export default navigationConfigs;
