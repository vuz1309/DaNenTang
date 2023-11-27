import {TouchableHighlight, View, Text} from 'react-native';
import {Themes} from '../../assets/themes';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';

export const FriendActions = ({text, icon, action}) => {
  return (
    <TouchableHighlight
      underlayColor={Themes.COLORS.lightGreyBg}
      onPress={action}
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        paddingVertical: 16,
      }}>
      <>
        <View
          style={{
            flexBasis: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: Colors.lightgrey,
            }}>
            <VectorIcon
              name={icon}
              type="FontAwesome5"
              size={24}
              color={Colors.black}
            />
          </View>
        </View>
        <Text
          style={{
            color: Colors.black,
            fontWeight: '700',
            fontSize: 20,
          }}>
          {text}
        </Text>
      </>
    </TouchableHighlight>
  );
};
