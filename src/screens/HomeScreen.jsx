import {StyleSheet} from 'react-native';
import React from 'react';
import SubHeader from '../components/SubHeader';
import Stories from '../components/Stories';
import {Colors} from '../utils/Colors';
import Post from '../components/posts/Post';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.homeContainer}>
      <SubHeader />
      <Stories />
      <Post />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});

export default HomeScreen;
