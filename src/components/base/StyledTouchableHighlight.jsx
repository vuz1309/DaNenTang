import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
const StyledTouchableHighlight = ({emojiConfig, text, ...rest}) => {
  return (
    <TouchableHighlight
      underlayColor={Colors.lightgrey}
      {...rest}
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        padding: 16,
      }}>
      <>
        <VectorIcon
          name={emojiConfig.name}
          type={emojiConfig.type}
          size={emojiConfig.size}
          color={emojiConfig.color}
        />
        <Text
          style={{
            color: Colors.black,
            fontWeight: '400',
            fontSize: 18,
          }}>
          {text}
        </Text>
      </>
    </TouchableHighlight>
  );
};

export default StyledTouchableHighlight;
