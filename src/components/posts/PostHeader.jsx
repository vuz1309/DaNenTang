import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {StyledTouchable} from '../base';

import {convertTimeToFacebookStyle} from '../../helpers/helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';
const MAX_CAPTION_LENGTH = 50;
const avatarNullImage = require('../../assets/images/avatar_null.jpg');
const PostHeader = ({data}) => {
  const createTime = useMemo(
    () => convertTimeToFacebookStyle(data.created),
    [data.created],
  );
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Hàm kiểm tra độ dài của caption và trả về nội dung hiển thị
  const renderCaption = () => {
    if (data.described.length <= MAX_CAPTION_LENGTH || isExpanded) {
      return <Text style={styles.caption}>{data.described}</Text>;
    } else {
      const truncatedCaption = data.described.slice(0, MAX_CAPTION_LENGTH);
      return (
        <>
          <Text style={styles.caption}>{truncatedCaption}</Text>
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <Text style={{color: Colors.textGrey}}> Xem thêm</Text>
          </TouchableOpacity>
        </>
      );
    }
  };
  console.log(data);
  if (!data) return <Text>Loading...</Text>;
  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.postTopSec}>
        <View style={styles.row}>
          <StyledTouchable
            style={{
              borderWidth: 1,
              borderColor: Colors.borderGrey,
              borderStyle: 'solid',
              borderRadius: 50,
              height: 40,
              width: 40,
            }}>
            {data?.author?.avatar ? (
              <Image
                style={styles.userProfile}
                source={{
                  uri: data?.author?.avatar,
                }}
                defaultSource={avatarNullImage}
              />
            ) : (
              <Image
                style={styles.userProfile}
                source={avatarNullImage}
                defaultSource={avatarNullImage}
              />
            )}
          </StyledTouchable>

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
        <View style={styles.row}>
          <VectorIcon
            name="dots-three-horizontal"
            type="Entypo"
            size={25}
            color={Colors.headerIconGrey}
            style={styles.headerIcons}
          />
          <VectorIcon
            name="close"
            type="Ionicons"
            size={25}
            color={Colors.headerIconGrey}
          />
        </View>
      </View>
      {renderCaption()}
    </View>
  );
};

const styles = StyleSheet.create({
  postHeaderContainer: {
    padding: 16,
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
    fontSize: 15,
    marginTop: 10,
  },
});

export default PostHeader;
