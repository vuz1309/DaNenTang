import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {logger} from '../../utils/helper';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';

export const SingleSavedItem = ({id, keyword, onPressItem}) => {
  return (
    <TouchableHighlight
      underlayColor={Colors.lightgrey}
      onPress={() => {
        onPressItem(keyword);
      }}>
      <View style={{flexDirection: 'row', padding: 16}}>
        <TouchableOpacity
          style={styles.row}
          onPress={() =>{}}>
             <VectorIcon
            name="time-outline"
            type="Ionicons"
            size={25}
            color={Colors.grey}
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
