import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Themes} from '../../assets/themes';
import Post4 from '../../assets/images/post4.jpeg';
const nullAvatar = require('../../assets/images/avatar_null.jpg');
const AddFriendRequest = ({
  mainText = 'Chấp nhận',
  subText = 'Xóa',
  onClickMain,
  onClickSub,
  data,
  isShowTime = false,
  textOnAccept = '',
  textOnReject = '',
}) => {
  const [text, setText] = React.useState('');

  if (!data)
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );

  return (
    <TouchableHighlight
      underlayColor={Colors.lightgrey}
      onPress={() => console.log('clickFriendCard')}>
      <View
        style={{
          ...styles.requestItemWrapper,
          padding: 12,
          position: 'relative',
        }}>
        {isShowTime && <Text style={styles.time}>2 năm</Text>}
        <View style={styles.avatar}>
          {data.avatar.trim() ? (
            <Image
              style={styles.avatarImg}
              source={{
                uri: data.avatar.trim(),
              }}
              defaultSource={nullAvatar}
            />
          ) : (
            <Image
              style={styles.avatarImg}
              source={nullAvatar}
              defaultSource={nullAvatar}
            />
          )}
        </View>
        <View>
          <Text style={styles.userName}>
            {data.username || '(Chưa có tên)'}
          </Text>
          {Number(data.same_friends) > 0 && (
            <View style={{flexDirection: 'row', marginTop: 4}}>
              {/* <View style={styles.commonUserAvatar}>
                <Image style={styles.commonUserAvatarImg} source={Post4} />
              </View>
              <View style={{...styles.commonUserAvatar, marginLeft: -8}}>
                <Image style={styles.commonUserAvatarImg} source={Post4} />
              </View> */}
              <Text style={styles.numOfCommonUser}>
                {data.same_friends} bạn chung
              </Text>
            </View>
          )}
          <View
            style={{
              ...styles.requestItemWrapper,
              marginTop: 8,
            }}>
            {!text ? (
              <>
                <TouchableHighlight
                  underlayColor={Colors.primaryColor}
                  onPress={() => {
                    onClickMain();
                    setText(textOnAccept);
                  }}
                  style={{
                    ...styles.buttonCtl,
                    backgroundColor: Colors.primaryColor,
                  }}>
                  <Text style={styles.acceptText}>{mainText}</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={Colors.lightgrey}
                  onPress={() => {
                    onClickSub();
                    setText(textOnReject);
                  }}
                  style={{
                    ...styles.buttonCtl,
                    backgroundColor: Colors.lightgrey,
                  }}>
                  <Text style={styles.removeText}>{subText}</Text>
                </TouchableHighlight>
              </>
            ) : (
              <Text style={{color: Colors.textGrey}}>{text}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: '700',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 12,
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderBottomColor: Colors.borderGrey,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  buttonWrapper: {
    backgroundColor: Colors.lightgrey,
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 12,
  },
  requestTitle: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  requestText: {
    fontWeight: '500',
    color: Colors.black,
    fontSize: 20,
  },
  numOfRequests: {
    color: Themes.COLORS.red,
  },
  viewAllBtn: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontWeight: '500',
  },
  requestItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    height: 80,
    width: 80,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  commonUserAvatar: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
  },
  commonUserAvatarImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  buttonCtl: {
    padding: 8,
    borderRadius: 8,
    width: '41%',
  },
  acceptText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  removeText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  time: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  numOfCommonUser: {
    marginLeft: 8,
    color: Colors.grey,
  },
});
export default AddFriendRequest;
