import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useMemo} from 'react';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {StyledTouchable} from '../base';

import PostFooter from './PostFooter';
import {convertTimeToFacebookStyle} from '../../helpers/helpers';
import LoadingOverlay from '../base/LoadingOverlay';
import PostDescription from './PostDescription';
import {APP_ROUTE} from '../../navigation/config/routes';
import ImageView from '../base/images/ImageView';
const avatarNullImage = require('../../assets/images/avatar_null.jpg');

const Img = ({url, isBanned = false, onPress}) => {
  const [isViewed, setIsViewed] = useState(!isBanned);
  const handlePress = () => {
    if (isViewed) {
      onPress();
    } else setIsViewed(true);
  };
  const source = React.useMemo(
    () => (isViewed ? {uri: url} : require('../../assets/images/banned.jpg')),
    [isViewed],
  );
  return (
    <Pressable
      style={{
        borderBottomWidth: 8,
        borderBottomColor: Colors.background,
        borderStyle: 'solid',
        position: 'relative',
      }}
      key={url}
      onPress={handlePress}>
      <>
        {/* <Image
          style={styles.img}
          source={source}
          defaultSource={avatarNullImage}
        /> */}
        <ImageView uri={source.uri} imageStyles={styles.img} />
        {
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: 'center',
                justifyContent: 'center',
                display: isViewed ? 'none' : 'flex',
              },
            ]}>
            <StyledTouchable
              onPress={handlePress}
              style={{padding: 8, backgroundColor: 'rgba(0,0,0,0.2)'}}>
              <Text style={{color: Colors.white, fontSize: 20}}>Xem</Text>
            </StyledTouchable>
          </View>
        }
      </>
    </Pressable>
  );
};

const PostListImage = ({navigation, route}) => {
  const {data, index} = route.params;

  // const avatarImg = React.useMemo(() => {
  //   return data.author.avatar ? (
  //     <Image
  //       style={styles.userProfile}
  //       source={{uri: data.author.avatar}}
  //       defaultSource={avatarNullImage}
  //     />
  //   ) : (
  //     <Image style={styles.userProfile} source={avatarNullImage} />
  //   );
  // }, [data.author.avatar]);

  const createTime = React.useMemo(
    () => convertTimeToFacebookStyle(data.created),
    [data.created],
  );
  const scrollViewRef = useRef(null);

  const scrollToIndex = index => {
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: index * 300,
      animated: true,
    });
  };
  React.useEffect(() => {
    scrollToIndex(index);
  }, []);
  const isBanned = React.useMemo(() => !!Number(data.banned));

  if (!data) return <LoadingOverlay isLoading={true} />;

  const onDragEnd = navigation.goBack;
  const scrollX = useRef(new Animated.Value(0));
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // Check if the user is dragging horizontally
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        },
        onPanResponderMove: Animated.event(
          [
            null,
            {dx: scrollX.current}, // Update the animated value with the gesture state
          ],
          {useNativeDriver: false}, // Ensure native driver is disabled
        ),
        onPanResponderRelease: (evt, gestureState) => {
          // Check if the drag distance is enough to trigger the action
          if (gestureState.dx > 100) {
            // Replace 100 with your desired drag distance threshold
            // Call your onDragEnd function here
            onDragEnd();
          }
          // Reset the animated value
          Animated.spring(scrollX.current, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        },
      }),
    [onDragEnd],
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.postHeaderContainer,
        {
          transform: [
            {
              translateX: scrollX.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1], // You can customize the output range as needed
              }),
            },
          ],
        },
      ]}>
      <View style={styles.postHeaderContainer}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0.2)'}
          barStyle="light-content"
        />
        <ScrollView ref={scrollViewRef}>
          <View>
            <View style={styles.postTopSec}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(APP_ROUTE.USER_SCREEN, {
                      userId: data?.author?.id,
                    })
                  }>
                  <ImageView
                    imageStyles={styles.userProfile}
                    uri={data?.author?.avatar}
                  />
                </TouchableOpacity>

                <View style={styles.userSection}>
                  <Text style={styles.username}>{data.author.name}</Text>
                  <View style={styles.row}>
                    <Text style={styles.days}>{createTime}</Text>
                    <Text style={styles.dot}>•</Text>
                    <VectorIcon
                      name="user-friends"
                      type="FontAwesome5"
                      size={13}
                      color={Colors.headerIconGrey}
                      style={styles.userIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
              <PostDescription described={data.described} />
            </View>
            <PostFooter data={data} />
          </View>

          <View style={{backgroundColor: Colors.white}}>
            {data.image.map(({url}, index) => (
              <Img
                key={url}
                url={url}
                onPress={() =>
                  navigation.navigate(APP_ROUTE.POST_DETAILS, {
                    firstItem: index,
                    item: data,
                  })
                }
                isBanned={isBanned}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  postHeaderContainer: {
    padding: 0,
    backgroundColor: Colors.white,
    flex: 1,
    width: '100%',
  },
  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  row: {
    flexDirection: 'row',
  },
  postTopSec: {
    padding: 14,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 16,
    color: Colors.textColor,
    marginBottom: 2,
  },
  userSection: {
    marginLeft: 12,
  },
  days: {
    fontSize: 14,
    color: Colors.textGrey,
  },
  dot: {
    fontSize: 14,
    color: Colors.textGrey,
    paddingHorizontal: 8,
  },
  userIcon: {
    marginTop: 3,
  },
  headerIcons: {
    marginRight: 20,
  },
  caption: {
    color: Colors.grey,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderStyle: 'solid',
    paddingVertical: 8,
    fontSize: 15,
    marginTop: 10,
  },
  img: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default PostListImage;
