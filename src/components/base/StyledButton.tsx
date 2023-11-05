import Size from '../../assets/size';
import {Themes} from '../../assets/themes';
import React, {FunctionComponent} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {StyledText, StyledTouchable} from '.';

interface StyledButtonProps {
  title?: string;
  customStyle?: StyleProp<ViewStyle>;
  customStyleText?: StyleProp<TextStyle>;

  onPress(params?: any): void;

  onLongPress?(): void;

  disabled?: boolean;
}

const StyledButton: FunctionComponent<StyledButtonProps> = (
  props: StyledButtonProps,
) => {
  const {
    title,
    customStyle,
    onPress,
    customStyleText,
    onLongPress,
    disabled = false,
  } = props;
  return (
    <StyledTouchable
      customStyle={[styles.container, customStyle]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}>
      <StyledText
        content={title}
        customStyle={[styles.label, customStyleText]}
      />
    </StyledTouchable>
  );
};

const styles = ScaledSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Themes.COLORS.secondary,
  },
  label: {
    color: Themes.COLORS.white,
    fontWeight: '600',
    fontSize: Size.FONTSIZE.normal,
  },
});

export default StyledButton;
