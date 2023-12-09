import StyledButton from '../../components/base/StyledButton';
const {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} = require('react-native');
const {Colors} = require('../../utils/Colors');
const React = require('react');
const nullImage = require('../../assets/images/avatar_null.jpg');
import VectorIcon from '../../utils/VectorIcon';
import {useLogin} from '../../utils/authenticate/AuthenticateService';
const LoginByPassword = ({user, onClose}) => {
  const [password, setPassword] = React.useState('');
  const image = React.useMemo(
    () => (user.avatar ? {uri: user.avatar} : nullImage),
    [user.avatar],
  );
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
            style={{
              fontSize: 24,
              marginTop: 8,
              fontWeight: 'bold',
              color: Colors.black,
            }}>
            {user.username}
          </Text>
        </View>
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <TextInput
            secureTextEntry={true}
            placeholder="Mật khẩu"
            placeholderTextColor={Colors.textGrey}
            value={password}
            onChangeText={value => setPassword(value)}
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
