import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import Size from '../../assets/size';
import {Themes} from '../../assets/themes';
import {Colors} from '../../utils/Colors';

interface StyledTextProps extends TextProps {
  originValue?: string;
  content?: string;
  customStyle?: StyleProp<TextStyle>;
}

const StyledText = (props: StyledTextProps) => {
  const {style, originValue, content} = props;
  let value: any;
  if (originValue) {
    value = originValue;
  } else {
    value = content || '';
  }

  return (
    <Text style={[styles.text, props.customStyle]} {...props}>
      {value}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.black,
    fontSize: Size.FONTSIZE.normal,
    fontFamily: Themes.fonts.regular,
  },
});

export default memo(StyledText, isEqual);
