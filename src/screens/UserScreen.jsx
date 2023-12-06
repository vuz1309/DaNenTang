import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl, Modal,
} from 'react-native';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {useSelector} from 'react-redux';
import {getUserInfo} from '../api/modules/userProfile.request';
import {useScrollHanler} from '../hooks/useScrollHandler';
import ActionsOwner from '../components/userScreens/ActionsOwner';
import ActionsOtherUser from '../components/userScreens/ActionsOtherUser';
import Loading from '../components/base/Loading';
import EditUserInfo from "../components/userScreens/EditUserInfo";
const nullImage = require('../assets/images/avatar_null.jpg');

const UserScreen = ({navigation, route}) => {
  const {userId} = route.params;
  const userLogged = useSelector(state => state.userInfo.user);
  const [userInfo, setUserInfo] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
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
      console.log(userId);
      const res = await getUserInfo({user_id: userId});
      console.log(res)
      const {data} = res;
      console.log("user:",data);
      setUserInfo(data.data);
    } catch (error) {
      console.log(error);
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

  const toggleEditModal= async()=> {
    if (isEdit)
    await getUserInfoApi();
    setIsEdit(!isEdit)
  }


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
          transparent={false}
          visible={isEdit}
      >
        <EditUserInfo userInfo={userInfo} closeModal={()=>toggleEditModal()}></EditUserInfo>
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

      <View style={styles.avaContainer}>
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
        {userInfo.avatar ? (
          <Image
            style={styles.ava}
            source={{
              uri: userInfo.avatar,
            }}
          />
        ) : (
          <Image style={styles.ava} source={nullImage} />
        )}
        {Number(userInfo.online) && <View style={styles.isOnline} />}
      </View>

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
        <Text style={{fontSize: 18, paddingTop: 12, color: Colors.textGrey}}>
          <Text style={{fontWeight: '700', color: Colors.black}}>
            {userInfo.coins}{' '}
          </Text>
          coins
        </Text>
        {userInfo?.description?.trim() && (
          <Text
            style={{color: Colors.textColor, fontSize: 18, paddingVertical: 4}}>
            {userInfo.description}
          </Text>
        )}
        {isOwner ? (
          <ActionsOwner userId={userId} action={()=>toggleEditModal()}/>
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
