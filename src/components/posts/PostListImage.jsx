import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {StyledTouchable} from '../base';
import Modal from 'react-native-modal';
import PostFooter from './PostFooter';
import DetailsPost from './DetailsPost';

const PostListImage = ({data, onClose}) => {
  const [isShowDetails, setDetailsPost] = React.useState(false);
  return (
    <>
      <Modal
        isVisible={true}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
        swipeDirection={'right'}
        onSwipeComplete={onClose}>
        <View style={styles.postHeaderContainer}>
          <StatusBar
            backgroundColor={'rgba(0,0,0,0.2)'}
            barStyle="dark-content"
          />
          <ScrollView>
            <View style={styles.postTopSec}>
              <View style={styles.row}>
                <StyledTouchable>
                  <Image
                    source={
                      data.profileImg
                        ? data.profileImg
                        : require('../../assets/images/avatar_null.jpg')
                    }
                    style={styles.userProfile}
                  />
                </StyledTouchable>

                <View style={styles.userSection}>
                  <Text style={styles.username}>{data.name}</Text>
                  <View style={styles.row}>
                    <Text style={styles.days}>{data.date}</Text>
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
            <Text style={styles.caption}>{data.caption}</Text>
            <PostFooter data={data} />

            <Pressable onPress={() => setDetailsPost(true)}>
              <Image style={styles.img} source={data.postImg} />
            </Pressable>
            <Pressable onPress={() => setDetailsPost(true)}>
              <Image style={styles.img} source={data.postImg} />
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
      {isShowDetails && (
        <DetailsPost item={data} onClose={() => setDetailsPost(false)} />
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
    height: 250,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default PostListImage;
