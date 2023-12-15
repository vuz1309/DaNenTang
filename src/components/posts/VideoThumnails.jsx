import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';

const VideoThumnails = ({uri}) => {
  const [url, setUrl] = React.useState('');
  React.useEffect(() => {
    createThumbnail({
      url: uri,
      timeStamp: 2,
    })
      .then(response => setUrl(response.path))
      .catch(err => console.log({err}));
  }, [uri]);
  const imgSource = React.useMemo(
    () => (url ? {uri: url} : require('../../assets/images/defaultVideo.jpg')),
    [url],
  );

  return (
    <View style={{position: 'relative'}}>
      <>
        <Image
          style={{height: 250, resizeMode: 'cover'}}
          source={imgSource}
          defaultSource={require('../../assets/images/defaultVideo.jpg')}
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 30,
              borderColor: Colors.white,
            }}>
            <VectorIcon
              name="play-circle"
              type="Feather"
              size={52}
              color={Colors.white}
            />
          </View>
        </View>
      </>
    </View>
  );
};
export default VideoThumnails;
