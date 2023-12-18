import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {Colors} from '../../utils/Colors';

const LoadingOverlay = ({
  isLoading = true,
  color = Colors.primaryColor,
  size = 'large',
  backgroundColor = 'rgba(255,255,255,0.5)',
  style,
}) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor,
          display: isLoading ? 'flex' : 'none',
          zIndex: 10_000,
        },
        style,
      ]}>
      <ActivityIndicator animating={true} size={size} color={color} />
    </View>
  );
};
export default LoadingOverlay;
