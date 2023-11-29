import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../utils/Colors';
import Logo from '../assets/images/logo.png';
import MetaLogo from '../assets/images/meta-logo.png';
import {useLogin} from '../utils/authenticate/AuthenticateService';
import {AUTHENTICATE_ROUTE} from '../navigation/config/routes';
import {RequestUserPermission} from '../utils/notification/notificationHelper';
import Loading from '../components/base/Loading';
import {validateEmail, validatePassword} from '../utils/validater';
import LoadingOverlay from '../components/base/LoadingOverlay';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToRegisterScreen = () => {
    navigation.navigate(AUTHENTICATE_ROUTE.REGISTER);
  };

  const {requestLogin, loading} = useLogin();

  const onLogin = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      AlertMessage('Tài khoản hoặc mật khẩu không chính xác!');
      return;
    }

    await RequestUserPermission();
    requestLogin({email, password});
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <View style={styles.subContainer}>
        <Image source={Logo} style={styles.logoStyle} />
        <TextInput
          placeholder="Email"
          inputMode="email"
          value={email}
          placeholderTextColor={Colors.borderGrey}
          onChangeText={value => setEmail(value)}
          style={styles.inputBox}
        />

        <TextInput
          placeholder="Mật khẩu"
          placeholderTextColor={Colors.borderGrey}
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.inputBox}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={onLogin} style={styles.loginButton}>
          <Text style={styles.login}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
        <TouchableOpacity
          style={styles.newAccount}
          onPress={goToRegisterScreen}>
          <Text style={styles.newAccountText}>Tạo tài khoản</Text>
        </TouchableOpacity>
        <Image source={MetaLogo} style={styles.metaLogoStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: 50,
    width: 50,
    marginVertical: '20%',
  },
  container: {
    padding: 16,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    width: '95%',
    marginTop: 12,
    color: Colors.black,
  },
  loginButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 20,
    width: '95%',
    alignItems: 'center',
    marginTop: 12,
  },
  login: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  forgotPass: {
    color: Colors.grey,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15,
  },
  newAccount: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 18,
    width: '95%',
    alignItems: 'center',
    marginTop: '35%',
  },
  newAccountText: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: '400',
  },
  metaLogoStyle: {
    height: 15,
    width: 70,
    marginTop: 15,
  },
});

export default LoginScreen;
