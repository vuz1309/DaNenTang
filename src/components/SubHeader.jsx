import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import VectorIcon from '../utils/VectorIcon';
import {Themes} from '../assets/themes';
import {checkCoinsNotEnough, formatNumberSplitBy} from '../helpers/helpers';
import DialogConfirm from './base/dialog/DialogConfirm';
import {APP_ROUTE} from '../navigation/config/routes';
import Enum from '../utils/Enum';
import {emotionList} from './modal/EmotionList';
import ImageView from './base/images/ImageView';
import {MIN_COINS} from '../utils/constants';
const SubHeader = ({}) => {
  const navigation = useNavigation();
  const userLogged = useSelector(state => state.userInfo.user);
  const [isShowDialogCoins, setIsShowDialogCoins] = React.useState(false);

  const coins = React.useMemo(
    () => formatNumberSplitBy(Number(userLogged?.coins || '0')),
    [userLogged, [userLogged?.coins]],
  );
  const buyCoin = () => {
    navigation.navigate(APP_ROUTE.BUY_COINS);
  };
  const handleClickUpPost = () => {
    if (checkCoinsNotEnough()) {
      setIsShowDialogCoins(true);
    } else {
      navigation.navigate(APP_ROUTE.UPLOAD, {
        mode: Enum.PostMode.Create,
        postData: {
          image: [],
          status: `${emotionList[0].name} ${emotionList[0].emo}`,
          described: '',
          id: '0',
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(APP_ROUTE.USER_SCREEN, {userId: userLogged.id})
        }>
        <ImageView uri={userLogged?.avatar} imageStyles={styles.profileStyle} />
      </TouchableOpacity>
      <View style={styles.inputBox}>
        <TouchableOpacity onPress={handleClickUpPost}>
          <Text style={styles.inputStyle}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={buyCoin}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <VectorIcon
          name="coins"
          type="FontAwesome5"
          color={Themes.COLORS.yellow}
          size={20}
        />

        <Text style={{fontWeight: '700', color: Colors.black}}>{coins}</Text>
      </TouchableOpacity>

      <DialogConfirm
        isVisible={isShowDialogCoins}
        closeBtn={{text: 'Không', onPress: () => setIsShowDialogCoins(false)}}
        title={'Thiếu coins'}
        content={`Cần ít nhất ${MIN_COINS} coins để tiếp tục, bạn có muốn mua thêm coins?`}
        mainBtn={{
          text: 'Mua',
          onPress: () => {
            setIsShowDialogCoins(false);
            buyCoin();
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    padding: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  profileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 30,
    paddingHorizontal: 20,
    flex: 1,
    paddingVertical: 8,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey,
  },
});

export default SubHeader;
