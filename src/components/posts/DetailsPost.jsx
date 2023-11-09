import {View, StyleSheet, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {logger} from '../../utils/helper';
import Pinchable from 'react-native-pinchable';
const DetailsPost = ({item}) => {
  return (
    <View style={styles.postContainer}>
      <Pinchable>
        <Image
          style={styles.backgroundImg}
          resizeMode="contain"
          source={item.postImg}
        />
      </Pinchable>
      <View style={styles.postInfo}>
        <View>
          <Text>Bui Anh Mi</Text>
          <Text>Thoi co ma nam tay nhau ra troung dung han nhe.</Text>
          <Text>28 phut truoc</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.black,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
  },
  postInfo: {
    position: 'absolute',
    bottom: 0,
    color: Colors.white,
    backgroundColor: Colors.black,

    elevation: 200,
  },
});

export default DetailsPost;
