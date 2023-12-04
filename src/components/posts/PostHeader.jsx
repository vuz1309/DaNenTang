import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useMemo} from 'react';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {StyledTouchable} from '../base';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import {convertTimeToFacebookStyle} from '../../helpers/helpers';
import AlertMessage from '../base/AlertMessage';
import {APP_ROUTE} from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import PostDescription from './PostDescription';
import {store} from '../../state-management/redux/store';
import {postInfoActions} from '../../state-management/redux/slices/HomeListPost';
import {deletePostRequest} from '../../api/modules/post';
import UploadScreen from "../../screens/UploadScreen";
const avatarNullImage = require('../../assets/images/avatar_null.jpg');
const PostHeader = ({data}) => {
  const {navigate} = useNavigation();
  const createTime = useMemo(
    () => convertTimeToFacebookStyle(data.created),
    [data.created],
  );
  const [isShowModalReport, setShowModalReport] = React.useState(false);
  const toggleModalReport = () => {
    setShowModalReport(!isShowModalReport);
  };
  const [isEditPost, setEditPost] = React.useState(false);
  const toggleEditModal = () => {
    setEditPost(!isEditPost);
  }
  const [isModalVisible, setModalVisible] = React.useState(false);
  const handleCopyToClipboard = () => {
    Clipboard.setString(data.described);
    AlertMessage('Copy thành công.');
  };
  const toggleModalDelPost = () => {
    if (Number(data.can_edit) > 0) setModalVisible(!isModalVisible);
    else {
      store.dispatch(
        postInfoActions.removePost({
          postId: data.id,
        }),
      );
    }
  };

  const removePost = async () => {
    const postId = data.id;
    // toggleModalDelPost();
    setModalVisible(false);
    try {
      const data = await deletePostRequest({id: postId});
      console.log('remove post:', data);
      store.dispatch(
        postInfoActions.removePost({
          postId,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return <Text>Loading...</Text>;
  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.postTopSec}>
        <View
          style={[
            styles.row,
            {
              flex: 1,
              paddingRight: 24,
            },
          ]}>
          <StyledTouchable
            onPress={() => navigate('UserScreen', {userId: data.author.id})}
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
            <Text
              onPress={() => navigate('UserScreen', {userId: data.author.id})}
              style={styles.username}>
              {data.author.name}
              <Text style={{fontWeight: '400', fontSize: 16}}>
                {' '}
                Đang cảm thấy {data.state}
              </Text>
            </Text>
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
        <View style={{...styles.row, gap: 8}}>
          <StyledTouchable onPress={toggleModalReport}>
            <VectorIcon
              name="dots-three-horizontal"
              type="Entypo"
              size={25}
              color={Colors.headerIconGrey}
            />
          </StyledTouchable>
          {
            <StyledTouchable onPress={toggleModalDelPost}>
              <VectorIcon
                name="close"
                type="Ionicons"
                size={25}
                color={Colors.headerIconGrey}
              />
            </StyledTouchable>
          }
        </View>
      </View>
      <TouchableHighlight
        underlayColor={Colors.lightgrey}
        style={{marginTop: 8}}
        onLongPress={handleCopyToClipboard}>
        <PostDescription described={data.described} />
      </TouchableHighlight>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.7}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={100}
        animationOutTiming={100}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={100}
        onBackdropPress={toggleModalDelPost}
        style={styles.modal}>
        <View
          style={[
            styles.modalContent,
            {
              padding: 24,
              borderRadius: 4,
            },
          ]}>
          <Text
            style={{fontSize: 20, fontWeight: '700', color: Colors.textColor}}>
            Xóa bài viết?
          </Text>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: 12,
              color: Colors.textColor,
            }}>
            Bạn có thể chỉnh sửa bài viết này nếu cần thay đổi.
          </Text>
          <View
            style={{justifyContent: 'flex-end', flexDirection: 'row', gap: 12}}>
            <Text
              onPress={removePost}
              style={{
                fontSize: 18,
                color: Colors.primaryColor,
                fontWeight: '500',
              }}>
              Xóa
            </Text>
            <Text
              style={{fontSize: 18, color: Colors.black, fontWeight: '500'}}>
              Chỉnh sửa
            </Text>
            <StyledTouchable onPress={toggleModalDelPost}>
              <Text
                style={{fontSize: 18, color: Colors.black, fontWeight: '500'}}>
                Hủy
              </Text>
            </StyledTouchable>
          </View>
        </View>
      </Modal>
      {isShowModalReport && (
        <Modal
          isVisible={true}
          onBackdropPress={toggleModalReport}
          animationOut={undefined}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
            padding: 0,
          }}>
          <View style={styles.modalContent}>
            <TouchableHighlight
              onPress={() => navigate(APP_ROUTE.REPORT, {postId: data.id})}
              underlayColor={Colors.lightgrey}
              style={{
                alignItems: 'center',
                padding: 16,
                flexDirection: 'row',
                gap: 12,
              }}>
              <>
                <View>
                  <VectorIcon
                    name="report"
                    type="Octicons"
                    size={24}
                    color={Colors.headerIconGrey}
                  />
                </View>
                <Text style={{color: Colors.textColor, fontSize: 20}}>
                  Báo cáo bài viết
                </Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => console.log('edit post')}
              underlayColor={Colors.lightgrey}
              style={{
                alignItems: 'center',
                padding: 16,
                flexDirection: 'row',
                gap: 12,
                display: Number(data.can_edit) > 0 ? 'flex' : 'none',
              }}>
              <>
                <View>
                  <VectorIcon
                    name="edit"
                    type="AntDesign"
                    size={24}
                    color={Colors.headerIconGrey}
                  />
                </View>
                <Text style={{color: Colors.textColor, fontSize: 20}}>
                  Chỉnh sửa bài viết
                </Text>
              </>
            </TouchableHighlight>
          </View>
        </Modal>
      )}
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
    fontSize: 18,
    color: Colors.textColor,
    marginBottom: 2,
    fontWeight: '600',
  },
  userSection: {
    marginLeft: 12,
    flex: 1,
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
    marginRight: 10,
  },
  caption: {
    color: Colors.grey,
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    color: Colors.black,

    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  link: {
    color: Colors.primaryColor,
    textDecorationLine: 'none',
  },
  logo: {
    width: 50,
    height: 50,
  },
  htmlStyles: {
    p: {
      fontSize: 14,
      color: Colors.textColor,
    },
  },
});

export default PostHeader;
