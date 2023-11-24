import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Profile from '../assets/images/img1.jpeg';
import CameraRoll from '../assets/images/cameraroll.png';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const nullAvatar = require('../assets/images/avatar_null.jpg');
const SubHeader = () => {
  const navigation = useNavigation();
  const userLogged = useSelector(state => state.userInfo.user);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserScreen', {userId: userLogged.id})
        }>
        {userLogged?.avatar ? (
          <Image
            source={{uri: userLogged.avatar}}
            style={styles.profileStyle}
          />
        ) : (
          <Image source={nullAvatar} style={styles.profileStyle} />
        )}
      </TouchableOpacity>
      <View style={styles.inputBox}>
        <TouchableOpacity onPress={() => navigation.navigate('UploadScreen')}>
          <Text style={styles.inputStyle}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>
      <Image source={CameraRoll} style={styles.cameraRoll} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  profileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 30,
    paddingHorizontal: 20,
    width: '70%',
    paddingVertical: 8,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey,
  },
});

export default SubHeader;
