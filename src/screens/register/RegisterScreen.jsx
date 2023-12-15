import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {
  AUTHENTICATE_ROUTE,
  ONBOARDING_ROUTE,
} from '../../navigation/config/routes';
import register from '../../assets/images/register.jpg';
import {StyledButton, StyledText} from '../../components/base';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <VectorIcon
        name="arrow-back"
        type="Ionicons"
        color={Colors.black}
        size={20}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          marginTop: '5%',
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.subContainer}>
        <Image source={register} style={styles.image} />
        <StyledText
          customStyle={[styles.biggerText]}
          content="Tham gia Facebook"
        />
        <StyledText
          customStyle={[styles.smallerText]}
          content="Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng"
        />
        <StyledButton
          title="Tiếp"
          customStyle={[styles.nextButton]}
          onPress={() => {
            navigation.navigate(ONBOARDING_ROUTE.INPUT_NAME);
          }}
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
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '40%',
  },
  biggerText: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Arial',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '60%',
    marginTop: '10%',
  },
  smallerText: {
    fontSize: 14,
    fontFamily: 'Arial',
    textAlign: 'center',
    width: '75%',
    marginTop: '10%',
  },
  nextButton: {
    backgroundColor: Colors.primaryColor,
    width: '95%',
    height: 48,
    marginTop: '10%',
  },
  nextText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '500',
  },
});

export default RegisterScreen;
