import StyledButton from '../../components/base/StyledButton';
const {
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
} = require('react-native');
import {Pressable} from 'react-native';
const {Colors} = require('../../utils/Colors');
const React = require('react');
const nullImage = require('../../assets/images/avatar_null.jpg');
import VectorIcon from '../../utils/VectorIcon';
import {useLogin} from '../../utils/authenticate/AuthenticateService';
import { useNavigation } from '@react-navigation/native';
import { AUTHENTICATE_ROUTE } from '../../navigation/config/routes';
const LoginByPassword = ({user, onClose}) => {
  const [password, setPassword] = React.useState('');
  const image = React.useMemo(
    () => (user.avatar ? {uri: user.avatar} : nullImage),
    [user?.avatar],
  );
const {navigate} = useNavigation();
  const {requestLogin, loading} = useLogin();
  const onSubmit = async () => {
    await requestLogin({
      email: user.email,
      password,
    });
  };

  return (
    <View style={{flex: 1, marginTop: '20%'}}>
      <View
        style={{
          position: 'relative',
          backgroundColor: Colors.white,
          elevation: 5,
          borderRadius: 8,
          padding: 16,
        }}>
        <TouchableHighlight
          underlayColor={Colors.lightgrey}
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            padding: 4,
            zIndex: 1000,
          }}>
          <VectorIcon
            name="close"
            type="AntDesign"
            size={24}
            color={Colors.black}
            onPress={onClose}
          />
        </TouchableHighlight>
        <View style={{alignItems: 'center'}}>
          <View
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
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 24,
              marginTop: 8,
              fontWeight: 'bold',
              color: Colors.black,
            }}>
            {user.username || user.email}
          </Text>
        </View>
        <View
          style={{
            marginTop: 16,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10, 
          }}>
              <TextInput
                secureTextEntry={true}
                placeholder="Mật khẩu"
                placeholderTextColor={Colors.textGrey}
                autoFocus={true}
                value={password}
                onChangeText={value => setPassword(value)}
                style={{
                  borderWidth: 1,
                  borderColor: Colors.borderGrey,
                  padding: 10,
                  height:50,
                  borderRadius: 12,
                  color: Colors.black,
                  width:'100%',
                }}
              />
            <Pressable
            onPress={()=>navigate(AUTHENTICATE_ROUTE.FORGOT_PASS)}>
              <Text
              style={{
              }}>Quên mật khẩu?</Text>
            </Pressable>
        </View>
        <View style={{alignItems: 'center', marginTop: 16}}>
          <StyledButton
            customStyle={{backgroundColor: Colors.primaryColor, width: '80%'}}
            onPress={onSubmit}
            isLoading={loading}
            title="Đăng nhập"
          />
        </View>
      </View>
    </View>
  );
};
export default LoginByPassword;
