import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {PostData} from '../../data/PostData';
import PostBody from './PostBody';

const Post = () => {
  return (
    <View style={styles.postContainer}>
      {PostData.map(item => (
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
