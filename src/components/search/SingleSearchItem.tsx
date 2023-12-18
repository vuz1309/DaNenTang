import React from 'react';
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {logger} from '../../utils/helper';
import {Colors} from '../../utils/Colors';
import ImageView from '../base/images/ImageView';

export const SingleSearchItem = ({id, item}: any) => {
  return (
    <TouchableHighlight underlayColor={Colors.lightgrey} onPress={() => {}}>
      <View style={{flexDirection: 'row', padding: 16}}>
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          {/* <Image
            source={{uri: item.author.avatar}}
            style={styles.userProfile}
          /> */}
          <ImageView
            uri={item?.author?.avatar}
            imageStyles={styles.userProfile}
          />
          <View style={styles.userSection}>
            <Text style={[styles.title]}>{item.author.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  userSection: {
    marginLeft: 26,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
});
