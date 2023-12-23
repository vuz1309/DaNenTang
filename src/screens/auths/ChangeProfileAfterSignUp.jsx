import {openLibraryDevice} from '../../utils/helper';
import StyledButton from '../../components/base/StyledButton';
import {changeProfileAfterSignup} from '../../api/modules/userProfile.request';
import {createImageFormData} from '../../helpers/helpers';
import HeaderSearch from '../layouts/HeaderSearch';
const {View, Pressable, Image, Text, TextInput} = require('react-native');
const {Colors} = require('../../utils/Colors');
const React = require('react');
import {useLogout} from '../../hooks/useLogout';
const nullImage = require('../../assets/images/avatar_null.jpg');
import AlertMessage from '../../components/base/AlertMessage';
import {store} from '../../state-management/redux/store';
import {userInfoActions} from '../../state-management/redux/slices/UserInfoSlice';
import Enum from '../../utils/Enum';
import {userSavedInfoActions} from '../../state-management/redux/slices/UserSavedSlice';
import {validateUsername} from '../../utils/validater';
const ChangeProfileAfterSignUp = ({}) => {
  const [username, setUsername] = React.useState('');
  const [image, setImage] = React.useState(nullImage);
  const openLibrary = async () => {
    const img = await openLibraryDevice({noData: true, selectionLimit: 1});

    setImage(img.assets[0]);
  };
  const isDisableSubmit = React.useMemo(() => {
    return !username.trim();
  }, [username]);
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    if (loading) return;
    if (isDisableSubmit) {
      AlertMessage('Vui lòng nhập tên!');
      return;
    }
    const validateRes = validateUsername(username);
    if (!validateRes.isValid) {
      AlertMessage(validateRes.message);
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('avatar', createImageFormData(image));
      const {data} = await changeProfileAfterSignup(formData);

      store.dispatch(
        userInfoActions.updateUserInfo({
          ...data.data,
          active: Enum.AccountStatus.VALID.toString(),
        }),
      );
      store.dispatch(
        userSavedInfoActions.updateUserSaved({
          ...data.data,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const {onLogout} = useLogout();
  return (
    <View style={{flex: 1}}>
      <HeaderSearch
        title={'Đổi thông tin'}
        onBack={onLogout}
        haveSearch={false}
      />
      <View style={{flex: 1, padding: 16}}>
        <View style={{alignItems: 'center', marginTop: '20%'}}>
          <Pressable
            onPress={openLibrary}
            style={{
              height: 160,
              width: 160,
              borderRadius: 100,
              overflow: 'hidden',
            }}>
            <Image
              source={image}
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
            />
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <TextInput
            inputMode="text"
            value={username}
            autoFocus={true}
            placeholder="Nhập họ tên"
            placeholderTextColor={Colors.textGrey}
            onChangeText={value => setUsername(value)}
            style={{
              borderWidth: 1,
              borderColor: Colors.borderGrey,
              padding: 10,
              borderRadius: 12,
              flex: 1,
              color: Colors.black,
            }}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 16}}>
          <StyledButton
            disabled={isDisableSubmit}
            customStyle={{backgroundColor: Colors.primaryColor, width: '80%'}}
            onPress={onSubmit}
            isLoading={loading}
            title="Xác nhận"
          />
        </View>
      </View>
    </View>
  );
};
export default ChangeProfileAfterSignUp;
