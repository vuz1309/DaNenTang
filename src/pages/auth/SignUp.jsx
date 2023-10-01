import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import {authStyles} from './authStyle';

/**
 * @author ntvu 1/10/2023
 * @param {*} param0
 * @returns
 */
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('Nhóm Nguyễn Thế Vũ - 20204625');
  const [passwordError, setPasswordError] = useState('20204625');
  const [confirmPasswordError, setConfirmPasswordError] = useState('Nhóm FA');

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
      <Input
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={confirmPasswordError}
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
