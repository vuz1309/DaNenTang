import React, {useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Video from 'react-native-video';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {StyledTouchable} from '../base';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import LoadingOverlay from '../base/LoadingOverlay';
import VideoThumnails from './VideoThumnails';

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const PostVideo = ({videoUrl, isFullScreen = false, autoPlay = false}) => {
  const {navigate, goBack} = useNavigation();
  const [isInitial, setInitial] = useState(!autoPlay);
  const videoRef = useRef(null);
  const hideControlRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isShowControl, setIsShowControl] = useState(false);

  const [config, setConfig] = useState({
    paused: true,
    muted: false,
    currentTime: 0,
    totalTime: 1,
  });
  const expandIcon = React.useMemo(
    () => (isFullScreen ? 'expand-arrows-alt' : 'expand-alt'),
    [isFullScreen],
  );
  const isShowPauseIcon = React.useMemo(() => {
    return !loading && (isShowControl || config.paused);
  }, [isShowControl, config.paused, loading]);

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

  const onVideoLoadStart = () => {
    setLoading(true);
  };
  const onVideoLoad = data => {
    console.log('init:', isInitial);
    if (data?.duration && data.duration > 0) {
      setConfig(prev => ({
        ...prev,
        totalTime: data.duration,
        paused: isInitial ? false : !autoPlay,
      }));
      setLoading(false);
    }
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
    setInitial(false);
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

  const onSliderSlidingComplete = value => {
    videoRef.current.seek(value);
    setConfig(prev => ({
      ...prev,
      currentTime: value,
      paused: false,
    }));
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay isLoading={loading} />
      {isInitial ? (
        <View style={styles.video}>
          <VideoThumnails uri={videoUrl} />
        </View>
      ) : (
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
          onLoadStart={onVideoLoadStart}
          onProgress={onVideoProgress}
        />
      )}
      <Pressable onPress={handleClickBackdrop} style={styles.overlay}>
        <>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: 'center',
                justifyContent: 'center',
                display: isShowPauseIcon ? 'flex' : 'none',
                backgroundColor: Colors.transparent,
              },
            ]}>
            <StyledTouchable
              onPress={playPauseHandler}
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 50,
                borderColor: Colors.white,
              }}>
              <VectorIcon
                name={iconControl}
                type="Feather"
                size={52}
                color={Colors.white}
              />
            </StyledTouchable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              width: '100%',
              transform: [{translateY: -10}],
            }}>
            <Text
              style={{
                ...styles.timer,
                display: isShowControl ? 'flex' : 'none',
              }}>
              {formatTime(config.currentTime)} / {totalTime}
            </Text>
            <View style={{flexDirection: 'row', gap: 8}}>
              <StyledTouchable
                onPress={() =>
                  setConfig(prev => ({...prev, muted: !prev.muted}))
                }
                style={{
                  elevation: 4,
                  display: isShowControl ? 'flex' : 'none',
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
                  if (isFullScreen) {
                    goBack();
                  } else {
                    navigate(APP_ROUTE.FULL_VIDEO, {url: videoUrl});
                  }
                }}
                style={{
                  elevation: 4,
                  display: isShowControl ? 'flex' : 'none',
                }}>
                <VectorIcon
                  name={expandIcon}
                  type="FontAwesome5"
                  color={Colors.white}
                  size={20}
                />
              </StyledTouchable>
            </View>
          </View>
          <Slider
            style={{
              height: 4,
              backgroundColor: 'transparent',
              zIndex: 1000,
              width: '100%',
              borderRadius: 12,
              padding: 0,
              margin: 0,
            }}
            thumbTintColor={Colors.primaryColor}
            minimumTrackTintColor={Colors.primaryColor}
            maximumTrackTintColor={Colors.white}
            minimumValue={0}
            maximumValue={config.totalTime}
            value={config.currentTime}
            onSlidingComplete={onSliderSlidingComplete}
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
export default React.memo(
  PostVideo,
  (prev, next) => prev.videoUrl === next.videoUrl,
);
