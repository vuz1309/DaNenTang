import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {APP_ROUTE, AUTHENTICATE_ROUTE} from '../navigation/config/routes';
import {store} from '../state-management/redux/store';
import Loading from '../components/base/Loading';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const userLogged = store.getState().userInfo.user;
      const userSaved = store.getState().userSavedInfo.userSaved;
      if (userLogged) {
        navigation.navigate(APP_ROUTE.HOME_TAB);
      } else if (userSaved.length > 0)
        navigation.navigate(AUTHENTICATE_ROUTE.LOGINBYSAVED);
      else navigation.navigate(AUTHENTICATE_ROUTE.LOGIN);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white, // Màu nền của Splash
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: '25%',
  },
});

export default SplashScreen;
