import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import React from 'react';

import VectorIcon from '../../utils/VectorIcon';
import {StyledButton} from '../../components/base';
import {useSelector} from 'react-redux';
import {formatNumberSplitBy} from '../../helpers/helpers';
import {buyCoin} from '../../api/modules/userProfile.request';

import AlertMessage from '../../components/base/AlertMessage';
import {useNavigation} from '@react-navigation/native';
import HeaderSearch from '../layouts/HeaderSearch';

const BuyCoins = ({}) => {
  const {goBack} = useNavigation();
  const [coin, setCoin] = React.useState('');
  const [code, setCode] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const userLogged = useSelector(state => state.userInfo.user);
  const crrCoins = React.useMemo(
    () => formatNumberSplitBy(Number(userLogged?.coins || '0')),
    [userLogged, [userLogged?.coins]],
  );
  const onBuyCoin = async () => {
    if (loading) return;
    try {
      if (coin > 0 && code !== '') {
        setLoading(true);
        const data = {
          code,
          coins: Number(coin),
        };
        await buyCoin(data);

        setCoin('');
        setCode('');
        goBack();
        // ToastAndroid.show('Mua coins thành công!', ToastAndroid.SHORT);
      } else {
        AlertMessage('Vui lòng nhập đầy đủ thông tin');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <HeaderSearch title={'Coins'} onBack={goBack} haveSearch={false} />
      <View style={styles.modalContent}>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text style={styles.headerText}>Coin hiện tại:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon
              name="coins"
              type="FontAwesome5"
              size={22}
              color={'gold'}
            />
            <TextInput
              placeholderTextColor={Colors.grey}
              value={crrCoins}
              style={{color: Colors.black, fontSize: 20, fontWeight: 'bold'}}
              readonly
            />
          </View>
        </View>
        <View style={styles.input}>
          <Text style={{flex: 0.4, color: Colors.textColor}}>Số coin: </Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            autoFocus={true}
            value={coin}
            keyboardType={'numeric'}
            style={styles.inputBox}
            onChangeText={value => {
              setCoin(value);
            }}
          />
        </View>
        <View style={styles.input}>
          <Text style={{flex: 0.4, color: Colors.textColor}}>Mã Code: </Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            value={code}
            style={styles.inputBox}
            onChangeText={value => setCode(value)}
          />
        </View>
        <StyledButton
          onPress={onBuyCoin}
          title={'Gửi yêu cầu '}
          customStyle={{
            backgroundColor: Colors.primaryColor,
            marginTop: 8,
          }}
          isLoading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    color: Colors.textColor,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  inputBox: {
    borderColor: Colors.lightgray,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 12,
    color: Colors.grey,
  },
});

export default BuyCoins;
