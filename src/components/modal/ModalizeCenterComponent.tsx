import React, {useEffect, useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import StyledTouchable from '../base/StyledTouchable';
import Metrics from '../../assets/metrics';

interface Props {
  children: any;
  handleDismiss(): void;
  customContainerStyle?: StyleProp<ViewStyle>;
}

const ModalizeCenterComponent = (props: Props) => {
  const {children, handleDismiss, customContainerStyle = {}} = props;
  const [contentHeight, setContentHeight] = useState(0);
  const [lowerBackdropHeight, setLowerBackdropHeight] = useState(0);
  useEffect(() => {
    setLowerBackdropHeight((Metrics.screenHeight - contentHeight) / 2);
  }, [contentHeight]);

  return (
    <View style={[styles.container, customContainerStyle]}>
      <StyledTouchable
        onPress={handleDismiss}
        customStyle={{height: lowerBackdropHeight}}
      />
      <View
        onLayout={event => {
          setContentHeight(event?.nativeEvent?.layout?.height);
        }}>
        {children}
      </View>
      <StyledTouchable
        onPress={handleDismiss}
        customStyle={{height: lowerBackdropHeight}}
      />
    </View>
  );
};

export default ModalizeCenterComponent;

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: '16@s',
  },
});
