import Size from '../../assets/size';
import {Themes} from '../../assets/themes';
import React, {FunctionComponent} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {StyledText, StyledTouchable} from '.';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';

interface Icon {
  name: string;
  type: string;
  size: number;
  color: string;
}

interface StyledButtonProps {
  title?: string;
  customStyle?: StyleProp<ViewStyle>;
  customStyleText?: StyleProp<TextStyle>;

  onPress(params?: any): void;

  onLongPress?(): void;

  disabled?: boolean;

  icon?: Icon;
  isLoading?: boolean;
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
    icon,
    isLoading = false,
  } = props;
  return (
    <StyledTouchable
      customStyle={[styles.container, customStyle]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}>
      {isLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.white} />
        </View>
      ) : (
        <>
          <VectorIcon
            name={icon?.name}
            type={icon?.type}
            size={icon?.size || 25}
            color={icon?.color || Colors.white}
          />
          <StyledText
            content={title}
            customStyle={[styles.label, customStyleText]}
          />
        </>
      )}
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
    flexDirection: 'row',
    gap: 5,
  },
  label: {
    color: Themes.COLORS.white,
    fontWeight: '600',
    fontSize: Size.FONTSIZE.normal,
  },
});

export default StyledButton;
