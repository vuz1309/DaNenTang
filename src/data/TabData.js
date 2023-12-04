import FriendScreen from '../screens/friends/FriendScreen';
import HomeScreen from '../screens/HomeScreen';
// import MarketPlaceScreen from '../screens/MarketPlaceScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WatchScreen from '../screens/WatchScreen';
export const TabName = {
  HOME: 'Home',
  FRIENDS: 'Friends',
  WATCH: 'Watch',
  NOTIFICATION: 'Notification',
  PROFILE: 'Profile',
};
export const TabData = [
  {
    id: 1,
    route: HomeScreen,
    name: TabName.HOME,
    activeIconName: 'home',
    activeiconType: 'Entypo',
    inactiveIconName: 'home-outline',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 28,
  },
  {
    id: 2,
    route: FriendScreen,
    name: TabName.FRIENDS,
    activeIconName: 'people-sharp',
    activeiconType: 'Ionicons',
    inactiveIconName: 'people-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 3,
    route: WatchScreen,
    name: TabName.WATCH,
    activeIconName: 'youtube-tv',
    activeiconType: 'MaterialCommunityIcons',
    inactiveIconName: 'television-play',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 25,
  },
  // {
  //   id: 4,
  //   route: MarketPlaceScreen,
  //   name: 'MarketPlace',
  //   activeIconName: 'shop',
  //   activeiconType: 'Entypo',
  //   inactiveIconName: 'storefront-outline',
  //   inactiveIconType: 'MaterialCommunityIcons',
  //   size: 25,
  //   unFocusSize: 25,
  // },
  {
    id: 5,
    route: NotificationScreen,
    name: TabName.NOTIFICATION,
    activeIconName: 'notifications',
    activeiconType: 'Ionicons',
    inactiveIconName: 'notifications-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 6,
    route: ProfileScreen,
    name: TabName.PROFILE,
    activeIconName: 'person',
    activeiconType: 'Ionicons',
    inactiveIconName: 'person-outline',
    inactiveIconType: 'Ionicons',
    size: 24,
    unFocusSize: 24,
  },
];
