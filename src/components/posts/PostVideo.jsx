import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Video from 'react-native-video';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {StyledTouchable} from '../base';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const PostVideo = ({videoUrl, onExpand, autoPlay = false}) => {
  const {navigate, goBack} = useNavigation();
  const videoRef = useRef(null);
  const hideControlRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isShowControl, setIsShowControl] = useState(true);

  const [config, setConfig] = useState({
    paused: !autoPlay,
    muted: false,
    currentTime: 1,
    totalTime: 1,
  });
  const expandIcon = React.useMemo(
    () => (onExpand ? 'expand-arrows-alt' : 'expand-alt'),
    [onExpand],
  );
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
      <Video
        ref={videoRef}
        source={{uri: videoUrl}}
        style={styles.video}
        controls={false}
        resizeMode="contain"
        onEnd={handleEndVideo}
        paused={config.paused}
        muted={config.muted}
        onLoad={onVideoLoad}
        onProgress={onVideoProgress}
      />

      <Pressable onPress={handleClickBackdrop} style={styles.overlay}>
        <>
          {
            <StyledTouchable
              onPress={playPauseHandler}
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 30,
                borderColor: Colors.white,
                position: 'absolute',
                left: '45%',
                top: '45%',
                display: isShowPauseIcon ? 'flex' : 'none',
              }}>
              <VectorIcon
                name={iconControl}
                type="Feather"
                size={52}
                color={Colors.white}
              />
            </StyledTouchable>
          }
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
            <View style={{flexDirection: 'row', gap: 8}}>
              <StyledTouchable
                onPress={() =>
                  setConfig(prev => ({...prev, muted: !prev.muted}))
                }
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
              <StyledTouchable
                onPress={() => {
                  if (onExpand) {
                    goBack();
                  } else {
                    navigate(APP_ROUTE.FULL_VIDEO, {url: videoUrl});
                  }
                }}
                style={{
                  elevation: 4,
                }}>
                <VectorIcon
                  name={expandIcon}
                  type="FontAwesome5"
                  color={Colors.white}
                  size={24}
                />
              </StyledTouchable>
            </View>
          </View>
          <Slider
            style={{
              height: 4,
              backgroundColor: Colors.white,
              zIndex: 1000,
              width: '100%',
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
