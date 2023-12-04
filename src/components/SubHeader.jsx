import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import VectorIcon from '../utils/VectorIcon';
import {Themes} from '../assets/themes';
import {formatNumberSplitBy} from '../helpers/helpers';

const nullAvatar = require('../assets/images/avatar_null.jpg');
const SubHeader = ({onClick}) => {
  const navigation = useNavigation();
  const userLogged = useSelector(state => state.userInfo.user);
  const coins = React.useMemo(
    () => formatNumberSplitBy(Number(userLogged?.coins || '0')),
    [userLogged, [userLogged?.coins]],
  );
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
        <TouchableOpacity onPress={onClick}>
          <Text style={styles.inputStyle}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <VectorIcon
          name="coins"
          type="FontAwesome5"
          color={Themes.COLORS.yellow}
          size={20}
        />
        <Text style={{fontWeight: '700', color: Colors.black}}>{coins}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
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
    flex: 1,
    paddingVertical: 8,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey,
  },
});

export default SubHeader;
