import {StyledButton, StyledText} from '../../components/base';
import {Colors} from '../../utils/Colors';
import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import VectorIcon from '../../utils/VectorIcon';
import {
  AUTHENTICATE_ROUTE,
  ONBOARDING_ROUTE,
} from '../../navigation/config/routes';
import {logger} from '../../utils/helper';
import {
  getStringAsyncData,
  storeStringAsyncData,
} from '../../utils/authenticate/LocalStorage';
import {validateEmail, validatePassword} from '../../utils/validater';
import AlertMessage from '../../components/base/AlertMessage';

const InputEmail = ({navigation}) => {
  const [email, setEmail] = useState('');

  const onPress = async () => {
    if (!validateEmail(email)) {
      AlertMessage('Email không đúng định dạng');
    } else {
      await storeStringAsyncData('email', email);
      navigation.navigate(ONBOARDING_ROUTE.CREATE_PASSWORD);
    }
  };
  return (
    <View style={styles.container}>
      <VectorIcon
        name="arrow-back"
        type="Ionicons"
        color={Colors.black}
        size={20}
        onPress={() => navigation.navigate(ONBOARDING_ROUTE.INPUT_BIRTH_DATE)}
      />
      <View
        style={{
          marginTop: '5%',
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={[styles.subContainer]}>
        <StyledText
          content="Nhập địa chỉ email của bạn"
          customStyle={[styles.biggerText]}
        />
        <View
          style={{
            marginTop: '10%',
            justifyContent: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <StyledText
            content="Địa chỉ email"
            customStyle={[styles.mediumText]}
          />
          <View style={styles.wrapperTextInput}>
            <TextInput
              value={email}
              style={styles.textInput}
              onChangeText={value => setEmail(value)}></TextInput>
          </View>
        </View>

        <StyledButton
          title="Tiếp"
          customStyle={[styles.nextButton]}
          onPress={onPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
  },
  wrapperTextInput: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    backgroundColor: Colors.white,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
  },
  nextButton: {
    backgroundColor: Colors.primaryColor,
    width: '95%',
    height: '15%',
    marginTop: '10%',
  },
  biggerText: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Arial',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '10%',
  },
  mediumText: {
    color: Colors.gray,
    fontSize: 14,
    fontFamily: 'Arial',
    marginTop: '10%',
  },
});

export default InputEmail;
