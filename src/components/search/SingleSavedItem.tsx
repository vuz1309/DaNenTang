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

export const SingleSavedItem = ({id, keyword} : any) => {
  return (
    <TouchableHighlight
      underlayColor={Colors.lightgrey}
      onPress={() => {
        logger('Pressed!');
      }}>
      <View style={{flexDirection: 'row', padding: 16}}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => logger('pressed on: ', keyword)}>
          <Image
            source={{
              uri: 'https://it4788.catan.io.vn/files/image-1700951038448-634881859.png',
            }}
            style={styles.userProfile}
          />
          <View style={styles.userSection}>
            <Text style={[styles.title]}>{keyword}</Text>
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
