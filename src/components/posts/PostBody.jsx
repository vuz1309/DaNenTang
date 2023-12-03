import {
  Image,
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import DetailsPost from './DetailsPost';
import PostListImage from './PostListImage';
import PostVideo from './PostVideo';

/**
 *
 * @param {object} props
 * @returns
 */
const PostBody = ({item}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={{backgroundColor: Colors.white, marginTop: 8}}>
        <PostHeader data={item} />

        {!item.video && item.image.length > 0 && (
          <View style={styles.postImg}>
            <View style={{flex: 3, flexDirection: 'row'}}>
              {item.image.slice(0, 2).map((img, index) => (
                <TouchableOpacity
                  key={img.url}
                  onPress={() => setModalVisible(index + 1)}
                  style={{flex: 1, ...styles.border}}>
                  <Image
                    style={styles.image}
                    defaultSource={require('../../assets/images/avatar_null.jpg')}
                    source={{uri: img.url}}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {item.image.length > 2 && (
              <View style={styles.spliter}>
                {item.image.slice(2, 4).map((img, index) => (
                  <TouchableOpacity
                    key={img.url}
                    onPress={() => setModalVisible(index + 3)}
                    style={{flex: 1, ...styles.border}}>
                    <Image
                      style={styles.image}
                      defaultSource={require('../../assets/images/avatar_null.jpg')}
                      source={{uri: img.url}}
                    />
                  </TouchableOpacity>
                ))}
                {item.image.length >= 5 && (
                  <View
                    style={{flex: 1, ...styles.border, position: 'relative'}}>
                    <Image
                      style={styles.image}
                      source={{uri: item.image[4].url}}
                    />

                    {item.image.length > 5 && (
                      <TouchableOpacity
                        onPress={() => setModalVisible(5)}
                        style={styles.overlayEndImg}>
                        <Text style={{color: Colors.white}}>
                          {item.image.length - 5}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        )}
        {item.video && <PostVideo videoUrl={item.video.url} />}
        <PostFooter data={item} />
      </View>

      {isModalVisible && item.image.length == 1 && (
        <DetailsPost
          isModalVisible={isModalVisible}
          item={item}
          onClose={() => setModalVisible(false)}
        />
      )}

      {isModalVisible && item.image.length > 1 && (
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
