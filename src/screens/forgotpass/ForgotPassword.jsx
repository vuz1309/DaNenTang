import {View, Text, StyleSheet, Pressable, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/base/Loading';
import {AUTHENTICATE_ROUTE} from '../../navigation/config/routes';
import VectorIcon from '../../utils/VectorIcon';
import {TextInput} from 'react-native-gesture-handler';
import {getVerifyCodeRequest} from '../../api/modules/onboarding';
import NewPassword from './NewPassword';
import {resetPassword} from '../../api/modules/authenticate';

const ForgotPassword = ({route}) => {
  const {goBack, navigate} = useNavigation();
  const [email, setEmail] = useState('');
  const [showModal, SetShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [code, SetCode] = useState('');
  const HandleForgotPassword = async () => {
    try {
      setLoading(true);
      const res = await getVerifyCodeRequest({email});
      console.log({res});
      const verifyCode = res.data.data.verify_code;
      SetCode(verifyCode);
      SetShowModal(true);
    } catch {
      ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  const RequestNewPass = async password => {
    try {
      console.log({password});
      const data = {email, code, password};
      console.log({data});
      const res = await resetPassword({
        email,
        code,
        password,
      });
      ToastAndroid.show(
        'Đổi mật khẩu thành công. Vui lòng đăng nhập lại',
        ToastAndroid.SHORT,
      );
      navigate(AUTHENTICATE_ROUTE.LOGIN);
    } catch {
      ToastAndroid.show('Có lỗi xảy ra. Vui lòng thử lại', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={goBack}>
          <VectorIcon
            name="arrowleft"
            type="AntDesign"
            size={35}
            color={Colors.black}
          />
        </Pressable>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: Colors.black,
            }}>
            Tìm tài khoản của bạn
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: Colors.black,
            }}>
            Nhập email của bạn.
          </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.textGrey}
            autoFocus={true}
            value={email}
            onChangeText={value => setEmail(value)}
            style={{
              marginTop: 25,
              borderWidth: 1,
              borderColor: Colors.borderGrey,
              padding: 10,
              height: 50,
              borderRadius: 12,
              color: Colors.black,
              width: '100%',
            }}
          />
          <Pressable style={styles.findButton} onPress={HandleForgotPassword}>
            <Text style={styles.findTxtBtn}>Tìm tài khoản</Text>
          </Pressable>
        </View>
      </View>
      {isLoading ? <Loading /> : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}
        style={{flex: 1}}>
        <NewPassword
          Return={() => SetShowModal(false)}
          RequestNewPass={RequestNewPass}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  findButton: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.primaryColor,
  },
  findTxtBtn: {
    color: Colors.white,
    fontWeight: 450,
    fontSize: 16,
  },
});

export default ForgotPassword;
