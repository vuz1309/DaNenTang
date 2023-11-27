import {Colors} from '../../utils/Colors';

const {ActivityIndicator, View} = require('react-native');

const Loading = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

export default Loading;
