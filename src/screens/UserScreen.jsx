import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {useSelector} from 'react-redux';
import {getUserInfo} from '../api/modules/userProfile.request';
import {useScrollHanler} from '../hooks/useScrollHandler';
import ActionsOwner from '../components/userScreens/ActionsOwner';
import ActionsOtherUser from '../components/userScreens/ActionsOtherUser';
import Loading from '../components/base/Loading';
import EditUserInfo from '../components/userScreens/EditUserInfo';
import {Themes} from '../assets/themes';
import ZoomableImage from '../components/base/ZoomableImage';
import StyledTouchableHighlight from '../components/base/StyledTouchableHighlight';
import Enum from '../utils/Enum';
import {APP_ROUTE} from '../navigation/config/routes';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AlertMessage from '../components/base/AlertMessage';
import {store} from '../state-management/redux/store';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {userSavedInfoActions} from '../state-management/redux/slices/UserSavedSlice';

const nullImage = require('../assets/images/avatar_null.jpg');

const UserScreen = ({navigation, route}) => {
  const {userId} = route.params;
  const userLogged = useSelector(state => state.userInfo.user);
  const [userInfo, setUserInfo] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);

  const [imageViewed, setImageViewed] = React.useState('');
  const [isChangeImg, setIsChangeImg] = React.useState(false);
  const toggleChangeImg = () => {
    setIsChangeImg(!isChangeImg);
  };
  const reload = () => {
    getUserInfoApi();
  };
  const {handleScroll, onRefresh, refreshing} = useScrollHanler(
    reload,
    () => {},
  );
  const isOwner = React.useMemo(() => userLogged.id == userId, [userId]);
  const getUserInfoApi = async () => {
    try {
      const res = await getUserInfo({user_id: userId});

      const {data} = res;
      setUserInfo(data.data);
      if (userId == userLogged.id) {
        store.dispatch(userInfoActions.updateUserInfo(data.data));
        store.dispatch(userSavedInfoActions.updateUserSaved(data.data));
      }
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  };
  const openLibrary = () => {
    launchImageLibrary(
      // {noData: true, selectionLimit: 20 - images.length},
      r => {
        if (r.didCancel) {
          return;
        }
        if (r.errorCode) {
          console.log('error');
        }

        const tmp = r.assets;

        // if (images.length < 20) {
        //     const newImgList = [...images, ...tmp];
        //     setImages(newImgList);
        //     console.log('list img:', newImgList);
        //     return;
        // }
        AlertMessage('Tối đa 20 ảnh');
      },
    );
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
  React.useEffect(() => {
    getUserInfoApi();
  }, []);
  if (!userInfo.id)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loading color={Colors.primaryColor} />
      </View>
    );

  const toggleEditModal = async () => {
    if (isEdit) await getUserInfoApi();
    setIsEdit(!isEdit);
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl
          colors={[Colors.primaryColor]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChangeImg}
        onBackdropPress={toggleChangeImg}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              backgroundColor: 'white',
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            name="arrowleft"
            type="AntDesign"
            size={22}
            color={Colors.black}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userInfo.username}</Text>
        <TouchableOpacity>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={22}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => setImageViewed(userInfo.cover_image)}
        style={styles.avaContainer}>
        <>
          <View>
            {userInfo.cover_image ? (
              <Image
                style={styles.background}
                source={{
                  uri: userInfo.cover_image,
                }}
                defaultSource={nullImage}
              />
            ) : (
              <Image style={styles.background} source={nullImage} />
            )}
          </View>
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
            {userInfo.avatar ? (
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                source={{
                  uri: userInfo.avatar,
                }}
              />
            ) : (
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                source={nullImage}
              />
            )}
          </TouchableOpacity>
          <Modal visible={!!imageViewed}>
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
        <Text style={{fontWeight: 'bold', color: Colors.black, fontSize: 25}}>
          {userInfo.username}
        </Text>
        <Text style={{fontSize: 18, paddingTop: 12, color: Colors.textGrey}}>
          <Text style={{fontWeight: '700', color: Colors.black}}>
            {userInfo.listing}{' '}
          </Text>
          bạn bè
        </Text>
        <View
          style={{
            paddingTop: 12,
            color: Colors.textGrey,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{fontWeight: '700', color: Colors.black, fontSize: 18}}>
            {userInfo.coins}{' '}
          </Text>
          <VectorIcon
            name="coins"
            type="FontAwesome5"
            color={Themes.COLORS.yellow}
            size={20}
          />
        </View>
        {userInfo?.description?.trim() && (
          <Text
            style={{color: Colors.textColor, fontSize: 18, paddingVertical: 4}}>
            {userInfo.description}
          </Text>
        )}
        {isOwner ? (
          <ActionsOwner userId={userId} action={() => toggleEditModal()} />
        ) : (
          <ActionsOtherUser
            firstMode={Number(userInfo.is_friend)}
            user={userInfo}
          />
        )}
      </View>
    </ScrollView>
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
    borderColor: 'white',
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
});

export default UserScreen;
