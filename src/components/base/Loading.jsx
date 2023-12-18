import {Colors} from '../../utils/Colors';

const {ActivityIndicator, View} = require('react-native');

const Loading = ({color = Colors.primaryColor, size = 'large'}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator animating={true} size={size} color={color} />
    </View>
  );
};

export default Loading;
