import {View, StyleSheet} from 'react-native';
import Loading from './Loading';
import {Colors} from '../../utils/Colors';

const LoadingOverlay = ({isLoading}) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
          display: isLoading ? 'flex' : 'none',
        },
      ]}>
      <Loading color={Colors.primaryColor} />
    </View>
  );
};
export default LoadingOverlay;
