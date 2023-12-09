import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {StyledTouchable} from '../base';
import Modal from 'react-native-modal';
import PostFooter from './PostFooter';
import DetailsPost from './DetailsPost';
import {convertTimeToFacebookStyle} from '../../helpers/helpers';
import LoadingOverlay from '../base/LoadingOverlay';
const MAX_CAPTION_LENGTH = 50;
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
        <Image
          style={styles.img}
          source={source}
          defaultSource={avatarNullImage}
        />
        {!isViewed && (
          <StyledTouchable
            onPress={handlePress}
            style={{position: 'absolute', left: '48%', top: '48%'}}>
            <Text style={{color: Colors.white, fontSize: 20}}>Xem</Text>
          </StyledTouchable>
        )}
      </>
    </Pressable>
  );
};

const PostListImage = ({data, onClose, index = 0}) => {
  const [isShowDetails, setDetailsPost] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Hàm kiểm tra độ dài của caption và trả về nội dung hiển thị
  const renderCaption = React.useMemo(() => {
    if (data.described.length <= MAX_CAPTION_LENGTH || isExpanded) {
      return <Text style={styles.caption}>{data.described}</Text>;
    } else {
      const truncatedCaption = data.described.slice(0, MAX_CAPTION_LENGTH);
      return (
        <>
          <Text style={styles.caption}>{truncatedCaption}</Text>
          <StyledTouchable onPress={() => setIsExpanded(true)}>
            <Text style={{color: Colors.textGrey}}> Xem thêm</Text>
          </StyledTouchable>
        </>
      );
    }
  }, [isExpanded]);

  const avatarImg = React.useMemo(() => {
    return data.author.avatar ? (
      <Image
        style={styles.userProfile}
        source={{uri: data.author.avatar}}
        defaultSource={avatarNullImage}
      />
    ) : (
      <Image style={styles.userProfile} source={avatarNullImage} />
    );
  }, [data.author.avatar]);

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
  return (
    <>
      <Modal
        isVisible={true}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
        swipeDirection={'right'}
        animationIn={'slideInRight'}
        onBackButtonPress={onClose}
        onSwipeComplete={onClose}>
        <View style={styles.postHeaderContainer}>
          <StatusBar
            backgroundColor={'rgba(0,0,0,0.2)'}
            barStyle="light-content"
          />
          <ScrollView ref={scrollViewRef}>
            <View>
              <View style={styles.postTopSec}>
                <View style={styles.row}>
                  <StyledTouchable>{avatarImg}</StyledTouchable>

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
              <View>{renderCaption}</View>
              <PostFooter data={data} />
            </View>

            <View style={{backgroundColor: Colors.white}}>
              {data.image.map(({url}, index) => (
                <Img
                  key={url}
                  url={url}
                  onPress={() => setDetailsPost(index + 1)}
                  isBanned={isBanned}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      {!!isShowDetails && (
        <DetailsPost
          item={data}
          firstItem={isShowDetails - 1}
          onClose={() => setDetailsPost(0)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  postHeaderContainer: {
    padding: 0,
    backgroundColor: Colors.white,
    flex: 1,
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
    resizeMode: 'contain',
    marginBottom: 8,
  },
});

export default PostListImage;
