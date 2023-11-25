import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {StyledButton} from '../components/base';
import {Themes} from '../assets/themes';
import {useSelector} from 'react-redux';
import AlertMessage from '../components/base/AlertMessage';
import {getUserInfo} from '../api/modules/userProfile.request';
import {useScrollHanler} from '../hooks/useScrollHandler';
const nullImage = require('../assets/images/avatar_null.jpg');
const UserScreen = ({navigation, route}) => {
  const {userId} = route.params;
  const userLogged = useSelector(state => state.userInfo.user);
  const [userInfo, setUserInfo] = React.useState({});
  const reload = () => {
    getUserInfoApi();
  };
  const {handleScroll, onRefresh, refreshing, setRefreshing} = useScrollHanler(
    reload,
    () => {},
  );
  const isOwner = React.useMemo(() => userId == userInfo.id, [userInfo]);
  const getUserInfoApi = async () => {
    try {
      console.log(userId);
      const {data} = await getUserInfo({user_id: userId});
      console.log(data);
      setUserInfo(data.data);
    } catch (error) {
      console.log(JSON.stringify(error));
      AlertMessage('Vui lòng kiểm tra lại mạng!');
    }
  };
  React.useEffect(() => {
    getUserInfoApi();
  }, []);
  if (!userInfo.id) return <Text>Loading...</Text>;
  return (
    <ScrollView
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            name="arrowleft"
            type="AntDesign"
            size={22}
            color={Colors.grey}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userInfo.username}</Text>
        <TouchableOpacity>
          <VectorIcon
            name="share"
            type="FontAwesome5"
            size={22}
            color={Colors.grey}
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
        {Number(userInfo.online) && <View style={styles.isOnline}></View>}
      </View>
      <View style={styles.info}>
        <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 25}}>
          {userInfo.username}
        </Text>
        <View style={styles.infoButton}>
          <StyledButton
            title={'Thêm vào tin'}
            customStyle={{
              backgroundColor: Themes.COLORS.dodgerBlue,
              flex: 2,
            }}
            customStyleText={{
              fontWeight: 'bold',
            }}
            icon={{
              name: 'plus',
              type: 'Entypo',
            }}></StyledButton>
          <StyledButton
            title={'Chỉnh sửa'}
            customStyle={{
              backgroundColor: Themes.COLORS.logan,
              flex: 1.5,
            }}
            customStyleText={{
              fontWeight: 'bold',
            }}
            icon={{
              name: 'mode-edit',
              type: 'MaterialIcons',
            }}></StyledButton>
          <StyledButton
            customStyle={{
              backgroundColor: Themes.COLORS.logan,
              flex: 0.5,
              gap: 0,
            }}
            icon={{
              name: 'dots-three-horizontal',
              type: 'Entypo',
            }}></StyledButton>
        </View>
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
    left: '30%',
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
    borderColor: 'white',
    borderWidth: 10,
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
