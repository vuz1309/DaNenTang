import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';

const VideoThumnails = ({post}) => {
  const {navigate} = useNavigation();
  const [url, setUrl] = React.useState('');
  React.useEffect(() => {
    createThumbnail({
      url: post.video.url,
      timeStamp: 2,
    })
      .then(response => setUrl(response.path))
      .catch(err => console.log({err}));
  }, [post.video.url]);
  const imgSource = React.useMemo(
    () => (url ? {uri: url} : require('../../assets/images/photo.png')),
    [url],
  );

  const handlePress = () => {
    navigate(APP_ROUTE.WATCH_NIGHT, {post});
  };
  return (
    <TouchableOpacity style={{position: 'relative'}} onPress={handlePress}>
      <>
        <Image
          style={{height: 250}}
          source={imgSource}
          defaultSource={require('../../assets/images/photo.png')}
        />
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 30,
            borderColor: Colors.white,
            position: 'absolute',
            left: '45%',
            top: '45%',
          }}>
          <VectorIcon
            name="play-circle"
            type="Feather"
            size={52}
            color={Colors.white}
          />
        </View>
      </>
    </TouchableOpacity>
  );
};
export default VideoThumnails;
