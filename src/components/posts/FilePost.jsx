import {
  Image,
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import VideoThumnails from './VideoThumnails';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import ImageView from '../base/images/ImageView';

const PostImg = ({img, isBanned}) => {
  const source = React.useMemo(
    () =>
      isBanned ? require('../../assets/images/banned.jpg') : {uri: img.url},
    [isBanned],
  );

  return (
    // <Image
    //   style={styles.image}
    //   defaultSource={require('../../assets/images/avatar_null.jpg')}
    //   source={source}
    // />
    <ImageView uri={source.uri} />
  );
};

const FilePost = ({item}) => {
  const isBanned = React.useMemo(() => !!Number(item.banned), []);
  const isBlocked = React.useMemo(() => !!Number(item.is_blocked), []);
  const {navigate} = useNavigation();

  const handleClickImage =
    item.image.length > 1
      ? index => {
          navigate(APP_ROUTE.POST_LIST_IMAGES, {data: item, index: index - 1});
        }
      : _ => {
          navigate(APP_ROUTE.POST_DETAILS, {item, firstItem: 0});
        };

  return (
    <>
      {!item.video && item.image.length > 0 && (
        <View style={styles.postImg}>
          <View style={{flex: 3, flexDirection: 'row'}}>
            {item.image.slice(0, 2).map((img, index) => (
              <TouchableOpacity
                key={img.url}
                onPress={() => handleClickImage(index + 1)}
                style={{flex: 1, ...styles.border}}>
                <PostImg img={img} isBanned={isBanned} />
              </TouchableOpacity>
            ))}
          </View>
          {item.image.length > 2 && (
            <View style={styles.spliter}>
              {item.image.slice(2, 4).map((img, index) => (
                <TouchableOpacity
                  key={img.url}
                  style={{flex: 1, ...styles.border}}
                  onPress={() => handleClickImage(index + 3)}>
                  <PostImg img={img} isBanned={isBanned} />
                </TouchableOpacity>
              ))}
              {item.image.length >= 5 && (
                <TouchableOpacity
                  onPress={() => handleClickImage(5)}
                  style={{flex: 1, ...styles.border, position: 'relative'}}>
                  <>
                    <PostImg img={item.image[4]} isBanned={isBanned} />

                    {item.image.length > 5 && (
                      <TouchableOpacity
                        onPress={() => handleClickImage(6)}
                        style={styles.overlayEndImg}>
                        <Text style={{color: Colors.white}}>
                          +{item.image.length - 5}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}

      {item.video && (
        <Pressable
          onPress={() => navigate(APP_ROUTE.WATCH_NIGHT, {post: item})}>
          <VideoThumnails uri={item.video.url} />
        </Pressable>
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
export default React.memo(
  FilePost,
  (prev, next) =>
    JSON.stringify({
      image: prev.item.image,
      video: prev.item.video,
      banned: prev.item.banned,
      blocked: prev.item.is_blocked,
    }) ===
    JSON.stringify({
      image: next.item.image,
      video: next.item.video,
      banned: next.item.banned,
      blocked: next.item.is_blocked,
    }),
);
