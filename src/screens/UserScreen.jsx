import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Modal,
  PermissionsAndroid,
  FlatList,
  Pressable,
} from 'react-native';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {useSelector} from 'react-redux';
import {getUserInfo} from '../api/modules/userProfile.request';
import ActionsOwner from '../components/userScreens/ActionsOwner';
import ActionsOtherUser from '../components/userScreens/ActionsOtherUser';
import Loading from '../components/base/Loading';
import EditUserInfo from '../components/userScreens/EditUserInfo';
import {Themes} from '../assets/themes';
import ZoomableImage from '../components/base/ZoomableImage';
import StyledTouchableHighlight from '../components/base/StyledTouchableHighlight';
import {APP_ROUTE} from '../navigation/config/routes';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AlertMessage from '../components/base/AlertMessage';
import {store} from '../state-management/redux/store';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {userSavedInfoActions} from '../state-management/redux/slices/UserSavedSlice';
import HeaderCenter from '../components/base/headers/HeaderCenter';
import {formatNumberSplitBy} from '../helpers/helpers';
import {useLoadOnScroll} from '../hooks/useLoadOnScroll';
import {getListPost} from '../api/modules/post.request';
import LoadingOverlay from '../components/base/LoadingOverlay';
import PostHeader from '../components/posts/PostHeader';
import FilePost from '../components/posts/FilePost';
import PostFooter from '../components/posts/PostFooter';
import ImageView from '../components/base/images/ImageView';
import {getAllFriends} from '../api/modules/friends.request';

const Detail = ({iconName, iconType, type, info}) => {
  return (
    <View
      style={{
        color: Colors.textGrey,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
      }}>
      <VectorIcon
        name={iconName}
        type={iconType}
        color={Colors.grey}
        size={25}
      />
      <Text style={{fontWeight: '400', color: Colors.black, fontSize: 18}}>
        {type}
        <Text style={{fontWeight: '700', color: Colors.black, fontSize: 18}}>
          {' '}
          {info}
        </Text>
      </Text>
    </View>
  );
};
const UserScreen = ({navigation, route}) => {
  const {userId} = route.params;
  const userLogged = useSelector(state => state.userInfo.user);
  const [userInfo, setUserInfo] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);

  const [imageViewed, setImageViewed] = React.useState('');
  const [isChangeImg, setIsChangeImg] = React.useState(false);

  const [friends, setFriends] = React.useState([]);
  const [totalFriends, setTotalFriends] = React.useState(0);

  const coins = React.useMemo(
    () => formatNumberSplitBy(Number(userInfo.coins)),
    [userInfo?.coins],
  );
  const toggleChangeImg = () => {
    setIsChangeImg(!isChangeImg);
  };

  const isOwner = React.useMemo(() => userLogged.id == userId, [userId]);
  const getUserInfoApi = async () => {
    try {
      const res = await getUserInfo({user_id: userId});

      const {data} = res;
      setUserInfo(data.data);

      if (isOwner) {
        store.dispatch(userInfoActions.updateUserInfo(data.data));
        store.dispatch(userSavedInfoActions.updateUserSaved(data.data));
      }
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  };
  const openLibrary = () => {
    launchImageLibrary({noData: true, selectionLimit: 1}, r => {
      if (r.didCancel) {
        return;
      }
      if (r.errorCode) {
        console.log('error');
      }

      const tmp = r.assets;

      AlertMessage('Tối đa 20 ảnh');
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Quyền truy cập máy ảnh',
          message: 'Ứng dụng cần truy cập Camera của bạn',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Không có quyền truy cập máy ảnh');
      } else {
        console.log('Quyền truy cập bị từ chối');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCamera = () => {
    requestCameraPermission().then(() => {
      const options = {};
      launchCamera(options).then(r => console.log(r));
    });
  };

  const getUserFriends = async () => {
    try {
      const {data} = await getAllFriends({
        count: '6',
        index: '0',
        user_id: userId,
      });
      setTotalFriends(data.data.total);
      setFriends(data.data.friends);
      // console.log('user friends:', data.data);
    } catch (error) {
      console.log('friends:', error);
    }
  };

  const toggleEditModal = async () => {
    if (isEdit) await getUserInfoApi();
    setIsEdit(!isEdit);
  };
  const [userPosts, setUserPosts] = React.useState([]);
  const {
    handleScroll: scrollPost,
    reload: reloadPost,
    getNewItems,
    params,
    searchText,
    setSearchText,
    refreshing: refreshingPost,
    isLoadMore,
  } = useLoadOnScroll(getUserPosts);

  const reload = () => {
    console.log('reload user screen');
    getUserInfoApi();
    setSearchText('99999');
    reloadPost();
    getUserFriends();
  };
  const removePost = id => {
    const index = userPosts.findIndex(item => item.id === id);
    if (index >= 0) {
      const posts = [...userPosts];
      posts.splice(index, 1);
      setUserPosts(posts);
    }
  };
  async function getUserPosts() {
    try {
      const {data} = await getListPost({
        ...params,
        user_id: userId,
        last_id: searchText,
      });

      if (data.data.last_id != 'undefined') {
        setSearchText(data.data.last_id);
      }

      if (params.index == '0') setUserPosts(data.data.post);
      else {
        const newItems = getNewItems(data.data.post, userPosts);

        setUserPosts(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.log('user posts:', error);
    }
  }
  React.useEffect(() => {
    reload();
  }, [userId]);

  if (!userInfo.id) return <LoadingOverlay />;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChangeImg}
        onBackdropPress={toggleChangeImg}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              backgroundColor: Colors.white,
            }}>
            <View
              style={{
                alignItems: 'center',
                margin: 0,
                padding: 0,
              }}>
              <StyledTouchableHighlight
                onPress={toggleChangeImg}
                emojiConfig={{
                  name: 'minus',
                  type: 'Entypo',
                  size: 24,
                  color: Colors.headerIconGrey,
                }}
              />
            </View>
            <StyledTouchableHighlight
              onPress={openLibrary}
              text={'Chọn ảnh từ thư viện'}
              emojiConfig={{
                name: 'insert-photo',
                type: 'MaterialIcons',
                size: 24,
                color: Colors.headerIconGrey,
              }}
            />
            <StyledTouchableHighlight
              text={'Chụp ảnh đại mới'}
              onPress={openCamera}
              emojiConfig={{
                name: 'camera',
                type: 'FontAwesome',
                size: 24,
                color: Colors.headerIconGrey,
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={false} visible={isEdit}>
        <EditUserInfo
          userInfo={userInfo}
          closeModal={() => toggleEditModal()}
        />
      </Modal>

      <FlatList
        data={userPosts}
        onScroll={scrollPost}
        ListHeaderComponent={() => (
          <>
            <HeaderCenter text={userInfo.username} goBack={navigation.goBack} />
            <TouchableOpacity
              onPress={() => setImageViewed(userInfo.cover_image)}
              style={styles.avaContainer}>
              <>
                <ImageView uri={userInfo?.cover_image} />

                {isOwner && (
                  <TouchableOpacity
                    style={styles.changeCover}
                    onPress={toggleChangeImg}>
                    <VectorIcon
                      name="camera"
                      type="FontAwesome5"
                      color={Themes.COLORS.grey}
                      size={20}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.ava}
                  onPress={() => setImageViewed(userInfo.avatar)}>
                  <ImageView uri={userInfo?.avatar} />
                </TouchableOpacity>
                <Modal
                  onRequestClose={() => setImageViewed('')}
                  visible={!!imageViewed}>
                  <ZoomableImage
                    onClose={() => setImageViewed('')}
                    urls={[{url: imageViewed}]}
                  />
                </Modal>
                {isOwner && (
                  <TouchableOpacity
                    style={styles.changeImg}
                    onPress={toggleChangeImg}>
                    <VectorIcon
                      name="camera"
                      type="FontAwesome5"
                      color={Themes.COLORS.grey}
                      size={20}
                    />
                  </TouchableOpacity>
                )}
                {Number(userInfo.online) && !isOwner && (
                  <View style={styles.isOnline} />
                )}
              </>
            </TouchableOpacity>
            <View style={styles.info}>
              <Text
                style={{fontWeight: 'bold', color: Colors.black, fontSize: 25}}>
                {userInfo.username}
              </Text>
              {/* <Text
                style={{fontSize: 18, paddingTop: 12, color: Colors.textGrey}}>
                <Text style={{fontWeight: '700', color: Colors.black}}>
                  {userInfo.listing}{' '}
                </Text>
                bạn bè
              </Text> */}
              {userInfo?.description?.trim() && (
                <Text
                  style={{
                    color: Colors.textColor,
                    fontSize: 18,
                    paddingVertical: 4,
                  }}>
                  {userInfo.description}
                </Text>
              )}
              {isOwner ? (
                <ActionsOwner
                  userId={userId}
                  action={() => toggleEditModal()}
                />
              ) : (
                <ActionsOtherUser
                  firstMode={Number(userInfo.is_friend)}
                  user={userInfo}
                />
              )}
            </View>
            <View style={styles.detail}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    color: Colors.black,
                  }}>
                  Bạn bè
                </Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate(APP_ROUTE.FRIEND_ALL, {user: userInfo})
                  }>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.primaryColor,
                    }}>
                    Tìm bạn bè
                  </Text>
                </Pressable>
              </View>
              <Text style={{fontSize: 16, color: Colors.textGrey}}>
                {totalFriends} người bạn
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 4,
                }}>
                {friends.map(fri => (
                  <Pressable
                    key={fri.id}
                    onPress={() =>
                      navigation.navigate(APP_ROUTE.USER_SCREEN, {
                        userId: fri.id,
                      })
                    }
                    style={{width: '32%'}}>
                    <View
                      style={{
                        height: 88,
                        borderRadius: 8,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: Colors.lightgrey,
                      }}>
                      <ImageView uri={fri.avatar} />
                    </View>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {fri.username}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={styles.detail}>
              <View
                style={{
                  color: Colors.textGrey,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingBottom: 12,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: Colors.black,
                    fontSize: 22,
                  }}>
                  Thông tin
                </Text>
              </View>

              <View
                style={{
                  marginTop: 12,
                  color: Colors.textGrey,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <VectorIcon
                  name="coins"
                  type="FontAwesome5"
                  color={Colors.grey}
                  size={20}
                />
                <Text
                  style={{
                    fontWeight: '700',
                    color: Colors.black,
                    fontSize: 18,
                  }}>
                  {coins}
                </Text>
              </View>

              {userInfo.city !== '' && userInfo.country !== '' && (
                <Detail
                  iconName={'location-sharp'}
                  iconType={'Ionicons'}
                  type={'Sống tại'}
                  info={`${userInfo.city}, ${userInfo.country}`}
                />
              )}
              {userInfo.address !== '' && (
                <Detail
                  iconName={'home'}
                  iconType={'Entypo'}
                  type={'Địa chỉ'}
                  info={`${userInfo.address}`}
                />
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => (
          <View style={{backgroundColor: Colors.white, marginTop: 8}}>
            <PostHeader
              reload={() => removePost(item.id)}
              data={item}
              isShowRemove={false}
            />

            <FilePost item={item} />

            <PostFooter data={item} />
          </View>
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshingPost}
            onRefresh={reload}
          />
        }
        // viewabilityConfig={{
        //   viewAreaCoveragePercentThreshold: 50,
        // }}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    position: 'relative',
    flex: 1,
  },
  isOnline: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.white,
    borderStyle: 'solid',
    backgroundColor: Colors.green,
    position: 'absolute',
    top: 220,
    left: '35%',
    elevation: 50,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    color: Colors.black,
  },
  avaContainer: {
    flexDirection: 'column',
    height: 200,
    zIndex: 1000,
    backgroundColor: Colors.white,
  },
  ava: {
    width: 180,
    height: 180,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 1,
    top: 80,
    left: 10,
    borderColor: Colors.white,
    borderWidth: 4,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  info: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.white,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    marginTop: 10,
  },
  changeImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.white,
    borderStyle: 'solid',
    backgroundColor: Colors.lightgray,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    top: 220,
    left: '35%',
  },
  changeCover: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.white,
    borderStyle: 'solid',
    backgroundColor: Colors.lightgray,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    right: 5,
  },
  modalContent: {
    color: Colors.black,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  detail: {
    padding: 20,
    backgroundColor: Colors.white,
    marginTop: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  buttonWrapper: {
    backgroundColor: Colors.lightgrey,
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 12,
  },
});

export default UserScreen;
