import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import React from 'react';
import {set} from 'lodash';
import VectorIcon from '../../utils/VectorIcon';
import {StyledButton} from '../../components/base';
import {useSelector} from 'react-redux';
import {formatNumberSplitBy} from '../../helpers/helpers';
import {buyCoin} from '../../api/modules/userProfile.request';
import {store} from '../../state-management/redux/store';
import UserInfoSlice, {
  userInfoActions,
} from '../../state-management/redux/slices/UserInfoSlice';
import AlertMessage from '../../components/base/AlertMessage';
import LoadingOverlay from '../../components/base/LoadingOverlay';

const BuyCoins = ({closeModal}) => {
  const [coin, setCoin] = React.useState(0);
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
          code: code,
          coins: coin,
        };
        const rq = await buyCoin(data);
        store.dispatch(userInfoActions.updateCoin(rq.data.data.coins));
        setCoin(0);
        setCode('');
        ToastAndroid.show('Mua coins thành công!', ToastAndroid.SHORT);
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
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
          <VectorIcon
            name="close"
            type="AntDesign"
            size={24}
            color={Colors.grey}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mua thêm coin</Text>
        <View style={styles.input}>
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
        <View style={styles.input}>
          <Text style={{flex: 0.4, color: Colors.textColor}}>Số coin: </Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            value={coin.toString()}
            keyboardType={'numeric'}
            style={styles.inputBox}
            onChangeText={value => {
              setCoin(Number(value));
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
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
