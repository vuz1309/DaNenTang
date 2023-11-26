import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tempImage from '../../assets/images/img1.jpeg';
import {Colors} from '../../utils/Colors';
import more from '../../assets/images/more.png';
const Notification = ({noti}) => {
  return (
    <View style={[styles.container, noti.read == 0 && styles.unread]}>
      <View style={styles.imageContainer}>
        <Image source={tempImage} style={styles.avatar}></Image>
        <Image source={tempImage} style={styles.notiType}></Image>
      </View>
      <View style={styles.notificationContainer}>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{noti.title}</Text>
          <Text>5 hours ago</Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Image style={styles.more} source={more}></Image>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // ... (previous styles
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  unread: {
    backgroundColor: '#c4faff',
  },
  imageContainer: {
    flex: 2,
  },
  optionContainer: {
    flex: 1,
  },
  notificationContainer: {
    flex: 7,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 8,
  },
  notification: {
    padding: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingRight: 4,
  },
  notificationText: {
    fontSize: 16,
    color: Colors.black,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  notiType: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginLeft: 30,
    marginTop: 30,
    position: 'absolute',
  },
  more: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
});
export default Notification;
