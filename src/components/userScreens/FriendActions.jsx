import {TouchableHighlight, View, Text} from 'react-native';
import {Themes} from '../../assets/themes';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';

export const FriendActions = ({
  text,
  icon,
  action,
  color = Colors.black,
  backgroundColor = Colors.white,
  fontWeight = '500',
  iconType = 'FontAwesome5',
}) => {
  return (
    <TouchableHighlight
      underlayColor={Themes.COLORS.lightGreyBg}
      onPress={action}
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor,
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
            <VectorIcon name={icon} type={iconType} size={24} color={color} />
          </View>
        </View>
        <Text
          style={{
            color,
            fontWeight,
            fontSize: 20,
          }}>
          {text}
        </Text>
      </>
    </TouchableHighlight>
  );
};
