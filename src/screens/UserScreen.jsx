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
const nullImage = require('../assets/images/avatar_null.jpg');

const UserScreen = ({navigation, route}) => {
  const {userId} = route.params;
  const userLogged = useSelector(state => state.userInfo.user);
  const [userInfo, setUserInfo] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);

  const [imageViewed, setImageViewed] = React.useState('');
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
      console.log('user:', data);
      setUserInfo(data.data);
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
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
          {Number(userInfo.online) && <View style={styles.isOnline} />}
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
});

export default UserScreen;
