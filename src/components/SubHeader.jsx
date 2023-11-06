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

const SubHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={Profile} style={styles.profileStyle} />
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
