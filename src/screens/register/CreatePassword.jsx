import {StyledButton, StyledText} from '../../components/base';
import {Colors} from '../../utils/Colors';
import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import VectorIcon from '../../utils/VectorIcon';
import {ONBOARDING_ROUTE} from '../../navigation/config/routes';
import {
  getStringAsyncData,
  storeStringAsyncData,
} from '../../utils/authenticate/LocalStorage';
import {registerRequest} from '../../api/modules/authenticate';
import {useLogin} from '../../utils/authenticate/AuthenticateService';
import AlertMessage from '../../components/base/AlertMessage';
import {validatePassword} from '../../utils/validater';
import LoadingOverlay from '../../components/base/LoadingOverlay';
const CreatePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {requestLogin, loading, error} = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const onPress = async () => {
    setIsLoading(true);
    if (!validatePassword(password)) {
      AlertMessage('Mật khẩu không đúng định dạng');
      return;
    }
    await storeStringAsyncData('password', password);
    const email = await getStringAsyncData('email');
    const dataRegister = {
      email,
      password,
      uuid: 'default',
    };
    try {
      await registerRequest(dataRegister);
      requestLogin({email, password});
    } catch (ex) {
      console.log(ex);
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <LoadingOverlay isLoading={isLoading} />
      <VectorIcon
        name="arrow-back"
        type="Ionicons"
        color={Colors.black}
        size={20}
        onPress={() => navigation.navigate(ONBOARDING_ROUTE.INPUT_EMAIL)}
      />
      <View
        style={{
          marginTop: '5%',
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={[styles.subContainer]}>
        <StyledText content="Tạo mật khẩu" customStyle={[styles.biggerText]} />
        <View style={styles.wrapperTextInput}>
          <TextInput
            label="Mật khẩu"
            outlineColor="black"
            activeOutlineColor="#326A81"
            autoCapitalize="none"
            returnKeyType="go"
            autoFocus={true}
            mode="outlined"
            selectionColor="#326A81"
            blurOnSubmit={false}
            secureTextEntry={!showPassword}
            value={password}
            placeholder="Mật khẩu"
            style={styles.textInput}
            onChangeText={value => setPassword(value)}
            // right={
            //   <TextInput.Icon
            //     name="eye"
            //     onPress={() => setHidePass(!hidePass)}
            //   />
            // }
          />
        </View>
        <StyledButton
          isLoading={loading}
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
    marginTop: '10%',
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
    margin: 10,
    width: '90%',
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    color: Colors.textColor,
  },
  nextButton: {
    backgroundColor: Colors.primaryColor,
    width: '95%',
    height: '17%',
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
  eyeButton: {
    marginLeft: 10,
  },
});

export default CreatePassword;
