import {View, StyleSheet, TextInput} from 'react-native';
import {StyledText, StyledButton} from '../../components/base';
import {
  ONBOARDING_ROUTE,
  AUTHENTICATE_ROUTE,
} from '../../navigation/config/routes';
import VectorIcon from '../../utils/VectorIcon';
import React, {useState} from 'react';
import {getStringAsyncData} from '../../utils/authenticate/LocalStorage';
import {logger} from '../../utils/helper';
import AlertMessage from '../../components/base/AlertMessage';
import {Colors} from '../../utils/Colors';
import {request} from '../../api/request';
import {
  checkVerifyCodeRequest,
  getVerifyCodeRequest,
} from '../../api/modules/onboarding';
import {useLogin} from '../../utils/authenticate/AuthenticateService';
import HeaderSearch from '../layouts/HeaderSearch';
import {useLogout} from '../../hooks/useLogout';
export const CheckVerifyCode = ({navigation}) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {requestLogin, loading, error} = useLogin();

  const onPress = async () => {
    if (code.length < 6) {
      AlertMessage('Bạn cần nhập đủ 6 chữ số!');
      return;
    }
    const checkVerifyParams = {
      email: email,
      code_verify: code,
    };
    try {
      const response = await checkVerifyCodeRequest(checkVerifyParams);

      if (response.status === 200) {
        requestLogin({email, password});
      }
    } catch (ex) {
      logger(ex);
    }
  };
  const onPressNotGetCode = async () => {
    const getVerifyCodeParams = {
      email,
    };
    try {
      AlertMessage(
        'Chúng tôi đã gửi một mã xác thực đến email của bạn. Hãy kiểm tra hòm thư',
      );
      await getVerifyCodeRequest(getVerifyCodeParams);
    } catch (ex) {
      logger(ex);
    }
  };
  const onInputCode = value => {
    if (value.length <= 6) {
      setCode(value);
    }
  };
  React.useEffect(() => {
    const getEmailAndPassword = async () => {
      const email = await getStringAsyncData('email');
      setEmail(email);
      setMessage(
        `Chúng tôi đã gửi một mã xác thực gồm 6 chữ số đến email: ${email}`,
      );
      const password = await getStringAsyncData('password');
      setPassword(password);
    };
    getEmailAndPassword();
  }, []);
  const {onLogout} = useLogout();
  return (
    <View style={styles.container}>
      <HeaderSearch onBack={onLogout} title={''} haveSearch={false} />
      <View
        style={{
          marginTop: 16,
        }}
      />
      <View style={[styles.subContainer]}>
        <StyledText content={message} customStyle={[styles.mediumText]} />
        <StyledText
          content="Nhập mã gồm 6 chữ số được gửi tới Email của bạn"
          customStyle={[styles.mediumTextBold]}
        />
        <View
          style={{
            marginTop: '10%',
            paddingHorizontal: 32,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0,
          }}>
          <StyledText
            content="FB  -  "
            customStyle={[styles.biggerTextCenter]}
          />
          <View style={styles.wrapperTextInput}>
            <TextInput
              keyboardType="numeric"
              value={code}
              style={styles.textInput}
              onChangeText={value => onInputCode(value)}></TextInput>
          </View>
        </View>

        <StyledButton
          isLoading={loading}
          title="Xác nhận"
          customStyle={[styles.nextButton]}
          onPress={onPress}
        />
        <View
          style={{
            marginTop: '5%',
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <StyledButton
          title="Không nhận được mã?"
          customStyle={[styles.nextButtonGray]}
          onPress={onPressNotGetCode}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    flex: 1,
  },

  subContainer: {
    backgroundColor: Colors.white,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTextInput: {flex: 1},
  textInput: {
    height: 40,
    width: '100%',
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: Colors.black,
  },
  nextButton: {
    backgroundColor: Colors.primaryColor,
    width: '95%',
    height: '12%',
    marginTop: '10%',
  },
  nextButtonGray: {
    backgroundColor: Colors.grey,
    width: '95%',
    height: '12%',
  },
  biggerText: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Arial',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '10%',
  },
  biggerTextCenter: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Arial',
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 5,
    // marginTop: '10%',
  },
  mediumText: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 14,
    fontFamily: 'Arial',
    marginTop: '10%',
  },
  mediumTextBold: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Arial',
    marginTop: '10%',
    fontWeight: 'bold',
  },
});
export default CheckVerifyCode;
