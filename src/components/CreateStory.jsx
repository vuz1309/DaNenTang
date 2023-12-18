import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {useSelector} from 'react-redux';
import Loading from './base/Loading';
import ImageView from './base/images/ImageView';
const nullImg = require('../assets/images/avatar_null.jpg');
const CreateStory = () => {
  const userLogged = useSelector(state => state.userInfo.user);
  const avatar = React.useMemo(
    () => (userLogged?.avatar ? {uri: userLogged?.avatar} : nullImg),
    [userLogged?.avatar],
  );
  if (!userLogged) return <Loading />;
  return (
    <View style={styles.createStoryContainer}>
      {<ImageView uri={userLogged?.avatar} imageStyles={styles.profileImg} />}
      <View style={styles.iconContainer}>
        <VectorIcon
          name="circle-with-plus"
          type="Entypo"
          size={35}
          color={Colors.primaryColor}
        />
      </View>
      <Text style={styles.createStory}>Tạo tin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImg: {
    height: 110,
    width: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  createStoryContainer: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 10,
    backgroundColor: Colors.storyImageBg,
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: '55%',
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  createStory: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 25,
    width: '50%',
  },
});

export default CreateStory;
