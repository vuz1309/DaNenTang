import {TouchableHighlight, View, Text} from 'react-native';
import {Themes} from '../../assets/themes';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import React from 'react';

export const FriendActions = React.memo(
  ({
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
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: Colors.lightgrey,
              }}>
              <VectorIcon name={icon} type={iconType} size={20} color={color} />
            </View>
          </View>
          <Text
            style={{
              color,
              fontWeight,
              fontSize: 18,
            }}>
            {text}
          </Text>
        </>
      </TouchableHighlight>
    );
  },
  (prev, next) => prev.text === next.text,
);
