import {Image, Text, View} from 'react-native';
import Loading from '../base/Loading';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';

const LoadingPosting = ({}) => {
  const userLogged = useSelector(state => state.userInfo.user);

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderWidth: 4,
        borderColor: Colors.lightgrey,
        borderStyle: 'solid',
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          gap: 4,
        }}>
        <Image
          style={{width: 40, height: 40, resizeMode: 'cover'}}
          source={
            userLogged.avatar
              ? {uri: userLogged.avatar}
              : require('../../assets/images/avatar_null.jpg')
          }
        />
        <Text style={{color: Colors.black, fontSize: 18}}>Đang đăng</Text>
      </View>
      <View>
        <Loading />
      </View>
    </View>
  );
};

export default LoadingPosting;
