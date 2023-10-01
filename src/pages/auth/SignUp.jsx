import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import {authStyles} from './authStyle';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('ga');
  const [passwordError, setPasswordError] = useState('Nhap sai v');

  const handleSignUp = () => {
    // Xử lý đăng ký tại đây
    if (!email || !password) {
      return;
    }
  };
  const handleLoginPress = () => {
    navigation.navigate('Đăng nhập');
  };
  return (
    <View style={authStyles.container}>
      <Text h3 style={authStyles.formHeader}>
        Đăng kí tài khoản
      </Text>
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        errorMessage={passwordError}
      />
      <Button
        title="Đăng kí"
        containerStyle={authStyles.submitBtn}
        onPress={handleSignUp}
      />
      <Text style={authStyles.footer}>
        Đã có tài khoản?{' '}
        <Text style={authStyles.footerLink} onPress={handleLoginPress}>
          Đăng nhập
        </Text>
      </Text>
    </View>
  );
};

export default SignUp;
