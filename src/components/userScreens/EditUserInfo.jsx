import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {setUserInfo} from '../../api/modules/userProfile.request';
import {launchImageLibrary} from 'react-native-image-picker';
import {store} from '../../state-management/redux/store';
import {createImageFormData} from '../../helpers/helpers';
import {SUCCESS_CODE} from '../../utils/constants';
import {userInfoActions} from '../../state-management/redux/slices/UserInfoSlice';
import ImageView from '../base/images/ImageView';
const HeaderOption = ({name}) => {
  return (
    <View style={styles.headerOption}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: Colors.black,
        }}>
        {name}
      </Text>
    </View>
  );
};

const EditUserInfo = ({userInfo, closeModal}) => {
  const [userData, setUserData] = React.useState({
    username: userInfo.username,
    description: userInfo.description,
    avatar: {uri: userInfo.avatar},
    address: userInfo.address,
    city: userInfo.city,
    country: userInfo.country,
    cover_image: {uri: userInfo.cover_image},
    link: userInfo.link,
  });

  const keyboardVerticalOffset = Platform.OS === 'android' ? 100 : 0;
  const openLibrary = async title => {
    try {
      await launchImageLibrary({noData: true}, response => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = response.assets[0];

          setUserData(prevState => ({
            ...prevState,
            [title]: source,
          }));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('description', userData.description);
      userData.link.trim() && formData.append('link', userData.link);
      userData.address.trim() && formData.append('address', userData.address);
      userData.city.trim() && formData.append('city', userData.city);
      userData.country.trim() && formData.append('country', userData.country);

      if (userData.cover_image.uri !== userInfo.cover_image)
        formData.append(
          'cover_image',
          createImageFormData(userData.cover_image),
        );
      if (userData.avatar.uri !== userInfo.avatar) {
        formData.append('avatar', createImageFormData(userData.avatar));
      }

      const {data} = await setUserInfo(formData);
      // console.log('update user info: ', data);
      if (data.code == SUCCESS_CODE) {
        store.dispatch(userInfoActions.updateUserInfo(data.data));

        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
        closeModal();
      } else {
        ToastAndroid.show(
          'Cập nhật thất bại, vui lòng thử lại sau!',
          ToastAndroid.SHORT,
        );
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        'Cập nhật thất bại, vui lòng thử lại sau!',
        ToastAndroid.SHORT,
      );
    }
  };
  // React.useEffect(() => {
  //   console.log(userData);
  // }, [userData]);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={closeModal}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={22}
              color={Colors.grey}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Chỉnh sửa thông tin</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.primaryColor,
            }}>
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={styles.editOption}>
            <HeaderOption name={'Ảnh đại diện'} />
            <View
              style={{
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => openLibrary('avatar')}>
                <ImageView
                  uri={userData?.avatar?.uri}
                  imageStyles={styles.ava}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.editOption}>
            <HeaderOption name={'Ảnh nền'} />
            <View
              style={{
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 18,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: Colors.borderGrey,
                }}
                onPress={() => openLibrary('cover_image')}>
                <ImageView uri={userData?.cover_image?.uri} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.editOption}>
            <HeaderOption name={'Thông tin'} />
            <View style={styles.infoOption}>
              <Text style={styles.label}>Tên tài khoản: </Text>
              <TextInput
                placeholder="Tài khoản"
                inputMode="text"
                value={userData.username}
                placeholderTextColor={Colors.borderGrey}
                onChangeText={value =>
                  setUserData(prevState => ({
                    ...prevState,
                    username: value,
                  }))
                }
                style={styles.inputBox}
              />
            </View>
            <View style={styles.infoOption}>
              <Text style={styles.label}>Quốc gia: </Text>
              <TextInput
                placeholder="Quốc gia"
                inputMode="text"
                value={userData.country}
                placeholderTextColor={Colors.borderGrey}
                onChangeText={value =>
                  setUserData(prevState => ({
                    ...prevState,
                    country: value,
                  }))
                }
                style={styles.inputBox}
              />
            </View>
            <View style={styles.infoOption}>
              <Text style={styles.label}>Thành phố: </Text>
              <TextInput
                placeholder="Thành phố"
                inputMode="text"
                value={userData.city}
                placeholderTextColor={Colors.borderGrey}
                onChangeText={value =>
                  setUserData(prevState => ({
                    ...prevState,
                    city: value,
                  }))
                }
                style={styles.inputBox}
              />
            </View>

            <View style={styles.infoOption}>
              <Text style={styles.label}>Nơi ở: </Text>
              <TextInput
                placeholder="Nơi ở"
                inputMode="text"
                value={userData.address}
                placeholderTextColor={Colors.borderGrey}
                onChangeText={value =>
                  setUserData(prevState => ({
                    ...prevState,
                    address: value,
                  }))
                }
                style={styles.inputBox}
              />
            </View>
            <View style={styles.infoOption}>
              <Text style={styles.label}>Link: </Text>
              <TextInput
                placeholder="Link"
                inputMode="text"
                value={userData.link}
                placeholderTextColor={Colors.borderGrey}
                onChangeText={value =>
                  setUserData(prevState => ({
                    ...prevState,
                    link: value,
                  }))
                }
                style={styles.inputBox}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EditUserInfo;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    position: 'relative',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black,
  },
  editOption: {
    paddingBottom: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  headerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  ava: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  background: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoOption: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    flex: 1,
    color: Colors.black,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 0.4,
    color: Colors.black,
  },
});
