import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import {authStyles} from './authStyle';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUpPress = () => {
    // Điều hướng đến trang đăng ký
    navigation.navigate('Đăng ký');
  };
  const handleSignIn = () => {};

  return (
    <View style={authStyles.container}>
      <Text h3 style={authStyles.formHeader}>
        Đăng nhập
      </Text>
      <Input
        label="Tài khoản"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
      />
      <Input
        label="Mật khẩu"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        errorMessage={passwordError}
      />

      <Button
        title="Đăng nhập"
        onPress={handleSignIn}
        containerStyle={authStyles.submitBtn}
      />

      <Text style={authStyles.footer} sytle>
        Chưa có tài khoản?{' '}
        <Text style={authStyles.footerLink} onPress={handleSignUpPress}>
          Đăng ký ngay
        </Text>
      </Text>
    </View>
  );
};
export default Login;
