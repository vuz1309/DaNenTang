import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {StyledTouchable} from '../base';
import Slider from '@react-native-community/slider';

const ScreenWidth = Dimensions.get('window').width;
const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
const PostVideo = ({videoUrl}) => {
  const videoRef = useRef(null);
  const hideControlRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isShowControl, setIsShowControl] = useState(true);

  const [config, setConfig] = useState({
    paused: true,
    muted: false,
    currentTime: 1,
    totalTime: 1,
  });
  const isShowPauseIcon = React.useMemo(() => {
    return isShowControl || config.paused;
  }, [isShowControl, config.paused]);
  const iconControl = React.useMemo(() => {
    return config.paused ? 'play-circle' : 'pause-circle';
  }, [config.paused]);
  const iconMute = React.useMemo(() => {
    return config.muted ? 'mute' : 'unmute';
  }, [config.muted]);
  const totalTime = React.useMemo(
    () => formatTime(config.totalTime),
    [config.totalTime],
  );
  const onVideoLoad = data => {
    if (data?.duration && data.duration > 0)
      setConfig(prev => ({...prev, totalTime: data.duration}));
    if (videoRef.current) {
      videoRef.current.seek(1); // Chuyển đến thời điểm 1 giây để có hình ảnh đầu tiên
    }
  };
  const onSliderValueChange = value => {
    videoRef.current.seek(value);
    setConfig(prev => ({
      ...prev,
      currentTime: value,
      paused: false,
    }));
  };
  const onVideoProgress = data => {
    setConfig(prev => ({...prev, currentTime: data.currentTime}));
    if (!thumbnail && data.currentTime >= 1) {
      setThumbnail(videoUrl);
    }
  };
  const handleEndVideo = () => {
    setConfig(prev => ({...prev, currentTime: 0, paused: true}));
  };
  const playPauseHandler = () => {
    if (config.paused) {
      hideControlRef.current = null;
      setIsShowControl(false);
    }
    setConfig(prev => ({
      ...prev,
      paused: !prev.paused,
    }));
  };
  const handleClickBackdrop = () => {
    if (hideControlRef.current) {
      clearTimeout(hideControlRef.current);
    } else {
      hideControlRef.current = setTimeout(() => {
        setIsShowControl(false);
        hideControlRef.current = null;
      }, 1000);
    }

    setIsShowControl(!isShowControl);
  };
  return (
    <View style={styles.container}>
      {thumbnail ? (
        <Image source={{uri: thumbnail}} style={styles.thumbnail} />
      ) : null}
      <Video
        ref={videoRef}
        source={{uri: videoUrl}}
        style={styles.video}
        controls={false}
        resizeMode="cover"
        onEnd={handleEndVideo}
        paused={config.paused}
        muted={config.muted}
        onLoad={onVideoLoad}
        onProgress={onVideoProgress}
      />

      <Pressable onPress={handleClickBackdrop} style={styles.overlay}>
        <>
          {isShowPauseIcon && (
            <StyledTouchable
              onPress={playPauseHandler}
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 30,
                borderColor: Colors.white,
                position: 'absolute',
                left: '43%',
                top: '43%',
              }}>
              <VectorIcon
                name={iconControl}
                type="Feather"
                size={52}
                color={Colors.white}
              />
            </StyledTouchable>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              width: '100%',
              transform: [{translateY: -10}],
            }}>
            <Text style={{...styles.timer}}>
              {formatTime(config.currentTime)} / {totalTime}
            </Text>
            <StyledTouchable
              onPress={() => setConfig(prev => ({...prev, muted: !prev.muted}))}
              style={{
                elevation: 4,
              }}>
              <VectorIcon
                name={iconMute}
                type="Octicons"
                color={Colors.white}
                size={24}
              />
            </StyledTouchable>
          </View>
          <Slider
            style={{
              height: 4,
              backgroundColor: Colors.white,
              zIndex: 1000,
              width: ScreenWidth,
              borderRadius: 12,
            }}
            thumbTintColor={Colors.primaryColor}
            minimumTrackTintColor={Colors.primaryColor}
            maximumTrackTintColor={Colors.grey}
            minimumValue={0}
            maximumValue={config.totalTime}
            value={config.currentTime}
            onValueChange={onSliderValueChange}
          />
        </>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  timer: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,

    elevation: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    flex: 1,
    width: '100%',
    height: 250, // Adjust the height as needed
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default PostVideo;
