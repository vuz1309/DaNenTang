import {Themes} from '../../assets/themes';
import {Colors} from '../../utils/Colors';
import {StyledButton} from '../base';
import {View} from 'react-native';
const ActionsOwner = ({userId}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10,
        marginTop: 10,
      }}>
      <StyledButton
        title={'Thêm vào tin'}
        customStyle={{
          backgroundColor: Colors.primaryColor,
          flex: 2,
        }}
        customStyleText={{
          fontWeight: 'bold',
        }}
        icon={{
          name: 'plus',
          type: 'Entypo',
        }}
      />
      <StyledButton
        title={'Chỉnh sửa'}
        customStyle={{
          backgroundColor: Themes.COLORS.lightGreyBg,
          flex: 1.5,
        }}
        customStyleText={{
          fontWeight: 'bold',
          color: Colors.black,
        }}
        icon={{
          name: 'mode-edit',
          type: 'MaterialIcons',
          color: Colors.black,
        }}
      />
      <StyledButton
        customStyle={{
          backgroundColor: Themes.COLORS.lightGreyBg,
          flex: 0.5,
          gap: 0,
          height: '100%',
        }}
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