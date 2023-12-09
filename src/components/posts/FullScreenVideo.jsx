import {TouchableOpacity, View} from 'react-native';
import PostVideo from './PostVideo';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import Orientation from 'react-native-orientation';
import {useEffect} from 'react';
const FullScreenVideo = ({route, navigation}) => {
  const {url} = route.params;

  useEffect(() => {
    // Mở chế độ xoay ngang màn hình khi mở video full screen
    Orientation.unlockAllOrientations();

    // Cleanup khi đóng video full screen
    return () => {
      Orientation.lockToPortrait(); // Khóa lại hướng màn hình khi đóng video full screen
    };
  }, [url]);
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{position: 'absolute', left: 8, top: 8, elevation: 5}}>
        <VectorIcon
          type="AntDesign"
          icon="close"
          size={26}
          color={Colors.black}
        />
      </TouchableOpacity>
      <PostVideo onExpand={true} videoUrl={url} />
    </View>
  );
};
export default FullScreenVideo;
