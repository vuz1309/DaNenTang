import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import PostBody from './PostBody';

const Post = ({listPost}) => {
  return (
    <View style={styles.postContainer}>
      {listPost?.map(item => (
        <PostBody key={item.id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.background,
    marginTop: 8,
  },
});

export default Post;
