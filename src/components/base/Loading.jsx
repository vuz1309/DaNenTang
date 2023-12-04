import {Colors} from '../../utils/Colors';

const {ActivityIndicator, View} = require('react-native');

const Loading = ({color = Colors.primaryColor}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loading;
