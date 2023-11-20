import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import DetailsPost from './DetailsPost';
import PostListImage from './PostListImage';
const PostBody = ({item}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  console.log(isModalVisible);
  return (
    <>
      <View style={{backgroundColor: Colors.white, marginTop: 8}}>
        <PostHeader data={item} />
        <View style={styles.postImg}>
          <View style={{flex: 3, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{flex: 1, ...styles.border}}>
              <Image style={styles.image} source={item.postImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                ...styles.border,
                display: Math.round(Math.random()) ? 'none' : 'flex',
              }}>
              <Image style={styles.image} source={item.postImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.spliter}>
            <TouchableOpacity style={{flex: 1, ...styles.border}}>
              <Image style={styles.image} source={item.postImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                display: Math.round(Math.random()) ? 'none' : 'flex',
              }}>
              <Image style={styles.image} source={item.postImg} />
            </TouchableOpacity>
            <View style={{flex: 1, ...styles.border, position: 'relative'}}>
              <TouchableOpacity>
                <Image style={styles.image} source={item.postImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.overlayEndImg}>
                <Text style={{color: Colors.white}}>+31</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PostFooter data={item} />
      </View>

      {/* {isModalVisible && (
        <DetailsPost
          isModalVisible={isModalVisible}
          item={item}
          onClose={() => setModalVisible(false)}
        />
      )} */}

      {isModalVisible && (
        <PostListImage data={item} onClose={() => setModalVisible(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  postImg: {
    width: '100%',
    height: 250,
  },
  border: {borderWidth: 2, borderColor: Colors.white, borderStyle: 'solid'},
  image: {
    width: '100%',
    height: '100%',

    resizeMode: 'cover',
  },
  spliter: {
    flex: 2,

    flexDirection: 'row',
  },
  overlayEndImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: Colors.white,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostBody;
