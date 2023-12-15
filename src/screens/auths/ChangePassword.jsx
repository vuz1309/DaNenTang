import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import React from 'react';
import VectorIcon from '../../utils/VectorIcon';
import {StyledButton} from '../../components/base';
import {useSelector} from 'react-redux';
import {store} from '../../state-management/redux/store';
import AlertMessage from '../../components/base/AlertMessage';
import {changePassword} from '../../api/modules/authenticate';
import {SUCCESS_CODE} from '../../utils/constants';
import {userSavedInfoActions} from '../../state-management/redux/slices/UserSavedSlice';

const ChangePassword = ({closeModal}) => {
  const [oldPass, setOldPass] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [cfPass, setCfPass] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const userLogged = useSelector(state => state.userInfo.user);

  const validateInput = () => {
    return (
      oldPass !== '' && newPass !== '' && cfPass !== '' && newPass === cfPass
    );
  };

  const onChangePassword = async () => {
    try {
      if (validateInput()) {
        setLoading(true);

        const {data} = await changePassword({
          password: oldPass,
          new_password: newPass,
        });
        console.log('update password', data);
        if (data.code == SUCCESS_CODE) {
          closeModal();
          store.dispatch(
            userSavedInfoActions.updateUserSaved({
              password: newPass,
              id: userLogged.id,
            }),
          );
          ToastAndroid.show('Đổi mật khẩu thành công!', ToastAndroid.SHORT);
        }
      } else {
        AlertMessage('Vui lòng điền chính xác thông tin');
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      AlertMessage(err.msg);
    }
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
          <VectorIcon
            name="close"
            type="AntDesign"
            size={22}
            color={Colors.grey}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đổi mật khẩu</Text>
        <View style={styles.input}>
          <Text style={{flex: 0.5, color: Colors.textColor}}>
            Mật khẩu cũ:{' '}
          </Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            value={oldPass}
            style={styles.inputBox}
            onChangeText={value => setOldPass(value)}
          />
        </View>
        <View style={styles.input}>
          <Text style={{flex: 0.5, color: Colors.textColor}}>
            Mật khẩu mới:{' '}
          </Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            value={newPass}
            style={styles.inputBox}
            onChangeText={value => setNewPass(value)}
          />
        </View>
        <View style={styles.input}>
          <Text style={{flex: 0.5, color: Colors.textColor}}>
            Xác nhận mật khẩu mới:{' '}
          </Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            value={cfPass}
            style={styles.inputBox}
            onChangeText={value => setCfPass(value)}
          />
        </View>
        <StyledButton
          onPress={onChangePassword}
          title={'Gửi yêu cầu '}
          customStyle={{
            backgroundColor: Colors.primaryColor,
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
    position: 'relative',
  },
  modalContent: {
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

export default ChangePassword;
