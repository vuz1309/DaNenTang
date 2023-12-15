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
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import VideoThumnails from './VideoThumnails';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import DetailsPost from './DetailsPost';
import PostListImage from './PostListImage';

const PostImg = ({img, onPress, isBanned}) => {
  const source = React.useMemo(
    () =>
      isBanned ? require('../../assets/images/banned.jpg') : {uri: img.url},
    [isBanned],
  );

  return (
    <TouchableOpacity onPress={onPress} style={{flex: 1, ...styles.border}}>
      <Image
        style={styles.image}
        defaultSource={require('../../assets/images/avatar_null.jpg')}
        source={source}
      />
    </TouchableOpacity>
  );
};

/**
 *
 * @param {object} props
 * @returns
 */
const PostBody = ({item, setIsShowDialogCoins}) => {
  const isBanned = React.useMemo(() => !!Number(item.banned));
  const isBlocked = React.useMemo(() => !!Number(item.is_blocked));
  const {navigate} = useNavigation();
  const [isModalVisible, setModalVisible] = React.useState(0);
  return (
    <View style={{backgroundColor: Colors.white, marginTop: 8}}>
      <PostHeader data={item} setIsShowDialogCoins={setIsShowDialogCoins} />

      {!item.video && item.image.length > 0 && (
        <View style={styles.postImg}>
          <View style={{flex: 3, flexDirection: 'row'}}>
            {item.image.slice(0, 2).map((img, index) => (
              <PostImg
                key={img.url}
                img={img}
                onPress={() => setModalVisible(index + 1)}
                isBanned={isBanned}
              />
            ))}
          </View>
          {item.image.length > 2 && (
            <View style={styles.spliter}>
              {item.image.slice(2, 4).map((img, index) => (
                <PostImg
                  key={img.url}
                  img={img}
                  onPress={() => setModalVisible(index + 3)}
                  isBanned={isBanned}
                />
              ))}
              {item.image.length >= 5 && (
                <TouchableOpacity
                  onPress={() => setModalVisible(5)}
                  style={{flex: 1, ...styles.border, position: 'relative'}}>
                  <>
                    <Image
                      style={styles.image}
                      source={
                        isBanned
                          ? require('../../assets/images/banned.jpg')
                          : {uri: item.image[4].url}
                      }
                    />

                    {item.image.length > 5 && (
                      <TouchableOpacity
                        onPress={() => setModalVisible(6)}
                        style={styles.overlayEndImg}>
                        <Text style={{color: Colors.white}}>
                          {item.image.length - 5}
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
      <PostFooter data={item} />
      {!!isModalVisible && item.image.length == 1 && (
        <DetailsPost
          isModalVisible={isModalVisible}
          item={item}
          onClose={() => setModalVisible(0)}
        />
      )}

      {!!isModalVisible && item.image.length > 1 && (
        <PostListImage
          data={item}
          onClose={() => setModalVisible(0)}
          index={isModalVisible.index - 1}
        />
      )}
    </View>
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
  PostBody,
  (prev, next) => JSON.stringify(prev.item) == JSON.stringify(next.item),
);
