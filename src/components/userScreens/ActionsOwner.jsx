import {useNavigation} from '@react-navigation/native';
import {Themes} from '../../assets/themes';
import {Colors} from '../../utils/Colors';
import {StyledButton} from '../base';
import {View} from 'react-native';
import {APP_ROUTE} from '../../navigation/config/routes';
import {store} from '../../state-management/redux/store';
const ActionsOwner = ({action}) => {
  const {navigate} = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10,
        marginTop: 10,
      }}>
      {/* <StyledButton
        title={'Thêm vào tin'}
        customStyle={{
          backgroundColor: Colors.primaryColor,
          flex: 2,
        }}
        customStyleText={{
          fontWeight: 'bold',
          fontSize: 18,
        }}
        icon={{
          name: 'plus',
          type: 'Entypo',
        }}
      /> */}
      <StyledButton
        title={'Chỉnh sửa'}
        customStyle={{
          backgroundColor: Themes.COLORS.lightGreyBg,
          flex: 2,
        }}
        customStyleText={{
          fontWeight: 'bold',
          fontSize: 18,
          color: Colors.black,
        }}
        icon={{
          name: 'mode-edit',
          type: 'MaterialIcons',
          color: Colors.black,
        }}
        onPress={() => action()}
      />
      <StyledButton
        customStyle={{
          backgroundColor: Themes.COLORS.lightGreyBg,
          flex: 0.5,
          gap: 0,
          height: '100%',
        }}
        onPress={() =>
          navigate(APP_ROUTE.PROFILE_SETTING, {
            user: store.getState().userInfo.user,
          })
        }
        icon={{
          name: 'dots-three-horizontal',
          type: 'Entypo',
          size: 20,
          color: Colors.black,
        }}
      />
    </View>
  );
};

export default ActionsOwner;
