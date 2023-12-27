import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Colors} from '../utils/Colors';
import {useSelector} from 'react-redux';

import {useLogout} from '../hooks/useLogout';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {store} from '../state-management/redux/store';
import {APP_ROUTE, AUTHENTICATE_ROUTE} from '../navigation/config/routes';

import {storeStringAsyncData} from '../utils/authenticate/LocalStorage';
import {AsyncStorageKey} from '../utils/authenticate/LocalStorage';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import {StyledTouchable} from '../components/base';
import {Themes} from '../assets/themes';
import ChangePassword from './auths/ChangePassword';
import VectorIcon from '../utils/VectorIcon';
import tempImage from '../assets/images/img1.jpeg';
import HeaderTitle from '../components/layouts/HeaderTitle';
import DialogConfirm from '../components/base/dialog/DialogConfirm';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const [isShowModalLogout, setIsShowModalLogout] = React.useState(false);

  const {navigate} = useNavigation();

  const [isChangePass, setIsChangePass] = React.useState(false);
  const {onLogout} = useLogout();

  const toggleModalChangePass = () => {
    setIsChangePass(!isChangePass);
  };

  const [help, setHelp] = useState(false);
  const [setting, setSetting] = useState(false);

  const userLogged = useSelector(
    /**
     *
     * @param {FacebookRootState} state
     * @returns
     */
    state => state.userInfo.user,
  );

  const animatedHeightHelp = useRef(new Animated.Value(0)).current;
  const animatedHeightSetting = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedHeightHelp, {
      toValue: help ? 350 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [help, animatedHeightHelp]);

  useEffect(() => {
    Animated.timing(animatedHeightSetting, {
      toValue: setting ? 420 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [setting, animatedHeightSetting]);

  const ToggleSetting = () => {
    setSetting(!setting);
  };
  const ToggleHelp = () => {
    setHelp(!help);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderTitle title={'Menu'} />
        <View style={styles.profile}>
          <Image
            style={[styles.profileImage, {marginLeft: 10}]}
            source={userLogged ? {uri: userLogged.avatar} : null}
          />
          <Pressable
            style={styles.profileUser}
            onPress={() =>
              navigate(APP_ROUTE.USER_SCREEN, {userId: userLogged.id})
            }>
            <Text style={styles.userName}>{userLogged?.username}</Text>
            <Text style={{color: Colors.textGrey}}>
              Xem trang cá nhân của bạn
            </Text>
          </Pressable>
          <View style={styles.OtherProfile}>
            {/* <Image style={styles.profileImage} source={userLogged?{uri:userLogged.avatar}:null} />
            <Image style={styles.profileImage} source={userLogged?{uri:userLogged.avatar}:null} />
            <Image style={styles.profileImage} source={userLogged?{uri:userLogged.avatar}:null} /> */}
          </View>
        </View>
        <Pressable onPress={ToggleHelp} style={styles.option}>
          <VectorIcon
            style={styles.optionIcon}
            name="questioncircle"
            type="AntDesign"
            size={35}
            color={Colors.black}
          />
          <Text style={styles.optionText}>Trợ giúp & hỗ trợ</Text>
          <VectorIcon
            style={styles.optionExpandIcon}
            name={help ? 'up' : 'down'}
            type="AntDesign"
            size={22}
            color={Colors.black}
          />
        </Pressable>
        <Animated.View
          style={[styles.expandContainer, {height: animatedHeightHelp}]}>
          {help ? (
            <View>
              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <View style={styles.expandOptionMain}>
                  <VectorIcon
                    type="FontAwesome"
                    name="life-bouy"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Trung tâm trợ giúp</Text>
                </View>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <View style={styles.expandOptionMain}>
                  <VectorIcon
                    type="Foundation"
                    name="mail"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Hộp thư hỗ trợ</Text>
                </View>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <View style={styles.expandOptionMain}>
                  <VectorIcon
                    type="Entypo"
                    name="chat"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Cộng đồng trợ giúp</Text>
                </View>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <View style={styles.expandOptionMain}>
                  <VectorIcon
                    type="MaterialIcons"
                    name="report"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Báo cáo sự cố</Text>
                </View>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <View style={styles.expandOptionMain}>
                  <VectorIcon
                    type="MaterialCommunityIcons"
                    name="newspaper-variant-outline"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>
                    Điều khoản và chính sách
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </Animated.View>

        {/* Cài đặt quyền riêng tư */}
        <Pressable onPress={ToggleSetting} style={styles.option}>
          <VectorIcon
            style={styles.optionIcon}
            name="settings"
            type="Ionicons"
            size={35}
            color={Colors.black}
          />
          <Text style={styles.optionText}>Cài đặt & quyền riêng tư</Text>
          <VectorIcon
            style={styles.optionExpandIcon}
            name={setting ? 'up' : 'down'}
            type="AntDesign"
            size={22}
            color={Colors.black}
          />
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isChangePass}
          onRequestClose={toggleModalChangePass}
          style={{flex: 1}}>
          <ChangePassword closeModal={toggleModalChangePass} />
        </Modal>
        {/* <TouchableOpacity
          onPress={toggleModalChangePass}
          style={styles.changePassBtn}>
          <Text style={{...styles.logout, color: Colors.primaryColor}}>
            Đổi mật khẩu
          </Text>
        </TouchableOpacity> */}
        <Animated.View
          style={[styles.expandContainer, {height: animatedHeightSetting}]}>
          {true ? (
            <View>
              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <Pressable
                  onPress={toggleModalChangePass}
                  style={styles.expandOptionMain}>
                  <VectorIcon
                    type="FontAwesome"
                    name="user"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}> Đổi mật khẩu</Text>
                </Pressable>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <Pressable
                  onPress={() => navigate(APP_ROUTE.PUSH_SETTINGS)}
                  style={styles.expandOptionMain}>
                  <VectorIcon
                    type="FontAwesome"
                    name="reply"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Thông báo đẩy</Text>
                </Pressable>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <Pressable
                  onPress={() => navigate(APP_ROUTE.BLOCK)}
                  style={styles.expandOptionMain}>
                  <VectorIcon
                    type="Entypo"
                    name="key"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Danh sách chặn</Text>
                </Pressable>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <View style={styles.expandOptionMain}>
                  <VectorIcon
                    type="AntDesign"
                    name="clockcircle"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>
                    Thời gian ở trên Facebook
                  </Text>
                </View>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <View style={styles.expandOptionMain}>
                  <VectorIcon
                    type="MaterialIcons"
                    name="language"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Ngôn ngữ</Text>
                </View>
              </View>

              <View style={styles.expandOption}>
                <View style={styles.expandOptionShadow}></View>
                <Pressable
                  style={styles.expandOptionMain}
                  onPress={() => navigate(AUTHENTICATE_ROUTE.FORGOT_PASS)}>
                  <VectorIcon
                    type="Feather"
                    name="smartphone"
                    size={30}
                    color={Colors.black}
                    style={styles.expandOptionIcon}
                  />
                  <Text style={styles.expandText}>Trình tiết kiệm dữ liệu</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </Animated.View>

        <TouchableOpacity
          onPress={() => setIsShowModalLogout(true)}
          style={styles.logoutButton}>
          <Text style={styles.logout}>Đăng xuất</Text>
        </TouchableOpacity>

        <DialogConfirm
          isVisible={!!isShowModalLogout}
          closeBtn={{text: 'Không', onPress: () => setIsShowModalLogout(false)}}
          mainBtn={{text: 'Đăng xuất', onPress: onLogout}}
          content={'Bạn có chắc chắn muốn đăng xuất?'}
          title={'Đăng xuất?'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profile: {
    marginVertical: 10,
    paddingTop: 10,
    height: 70,
    justifyContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    // elevation: 5, // Android only
  },
  userName: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: 700,
  },
  OtherProfile: {
    flex: 2,
    flexDirection: 'row',
  },
  profileUser: {
    flex: 4,
    marginLeft: 30,
  },
  profileImage: {
    borderRadius: 50,
    width: 40,
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    marginRight: -20,
  },
  headerIcons: {
    marginLeft: 10,
  },
  menu: {
    flex: 8,
    fontSize: 24,
    paddingVertical: 16,
    paddingHorizontal: 8,
    color: Colors.black,
    fontWeight: '700',
  },
  menuIcon: {
    flex: 2,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  title: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: '500',
    marginTop: 30,
  },
  option: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderColor: Colors.borderGrey,
  },
  optionIcon: {
    flex: 2,
    alignContent: 'center',
    margin: 10,
  },
  optionText: {
    flex: 12,
    fontSize: 20,
    fontWeight: 700,
    color: Colors.black,
    paddingTop: 12,
  },
  optionExpandIcon: {
    flex: 1,
    paddingTop: 15,
  },
  expandOptionMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 15,
    gap: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  expandOption: {
    marginVertical: 5,
    alignItems: 'center',
  },
  expandContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  expandOptionIcon: {
    flex: 1,
    marginLeft: 15,
  },
  expandText: {
    // paddingLeft:10,
    flex: 10,
    fontSize: 18,
    fontWeight: 600,
    color: Colors.black,
  },
  expandOptionShadow: {
    position: 'absolute',
    elevation: 5,
    width: '103%',
    height: '103%',
  },
  logout: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 16,
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 24,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  changePassBtn: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default ProfileScreen;
