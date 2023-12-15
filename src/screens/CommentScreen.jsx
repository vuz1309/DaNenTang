/* eslint-disable @typescript-eslint/no-unused-vars */
import {forwardRef, useRef, useState} from 'react';
import {Button, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AlertMessage from '../components/base/AlertMessage';
import ModalizeManager from '../components/modal/ModalizeManager';
import {logger} from '../utils/helper';
import React, {ReactElement} from 'react';
import {Colors} from '../utils/Colors';
import VectorIcon from '../utils/VectorIcon';
import {APP_ROUTE, ONBOARDING_ROUTE} from '../navigation/config/routes';
import PostBody from '../components/posts/PostBody';
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {getMarkComments, setMarkComments} from '../api/modules/comment.request';

import PostHeaderComment from '../components/posts/PostHeaderComment';
import PostBodyComment from '../components/posts/PostBodyComment';
import {useNavigation} from '@react-navigation/native';
import {useGetPostById} from '../hooks/useGetPostById';
import Loading from '../components/base/Loading';
import LoadingOverlay from '../components/base/LoadingOverlay';

const Comment = ({
  id,
  type,
  authorId,
  authorName,
  authorAvatar,
  content,
  createTime,
  replies,
  onClickReply,
}) => {
  const inputRef = useRef(null);
  const targetDate = new Date(createTime);
  const currentTime = new Date();
  const timeDiff = Math.abs(targetDate - currentTime);
  const minutesDiff = timeDiff / (1000 * 60);
  var createdValue;
  if (minutesDiff < 60) {
    createdValue = `${Math.floor(minutesDiff)} phút trước`;
  } else if (minutesDiff < 1440) {
    createdValue = `${Math.floor(minutesDiff / 60)} giờ `;
  } else if (minutesDiff < 10080) {
    createdValue = `${Math.floor(minutesDiff / 60 / 24)} ngày `;
  } else if (minutesDiff < 524160) {
    createdValue = `${Math.floor(minutesDiff / 60 / 24 / 7)} tuần `;
  } else {
    createdValue = `${Math.floor(minutesDiff)} phút `;
  }
  const {navigate} = useNavigation();

  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => {
            navigate('UserScreen', {userId: authorId});
          }}
          style={{
            borderWidth: 1,
            borderColor: Colors.borderGrey,
            borderStyle: 'solid',
            borderRadius: 50,
            height: 40,
            width: 40,
            display: 'flex',
            flexDirection: 'row',
          }}
          // style={styles.row}
        >
          <Image
            source={{
              uri: authorAvatar,
            }}
            style={styles.userAvatar}
          />
        </TouchableHighlight>
        <View style={styles.commentSection}>
          <TouchableHighlight
            underlayColor={Colors.lightgray}
            onPress={() => {
              logger('pressed ', false, authorName);
            }}>
            <Text style={[styles.nameText]}>{authorName}</Text>
          </TouchableHighlight>
          <Text style={[styles.contentText]}>{content}</Text>
        </View>
      </View>
      <View style={styles.reactCommentWrapper}>
        <Text style={{color: 'black'}}>{createdValue} </Text>
        <Text style={styles.reactCommentText} onPress={() => {}}>
          Thích
        </Text>
        <TouchableOpacity
          onPress={() => {
            onClickReply(id);
          }}>
          <Text style={styles.reactCommentText}> Phản hồi </Text>
        </TouchableOpacity>
      </View>
      {/* <View > */}
      <ScrollView style={styles.replies}>
        {Array.isArray(replies) &&
          replies.map(reply => (
            <Comment
              content={reply.content}
              authorId={reply.poster.id}
              authorName={reply.poster.name}
              authorAvatar={reply.poster.avatar}
              createTime={reply.created}
              onClickReply={() => {
                onClickReply(id);
              }}
            />
          ))}
      </ScrollView>
      {/* </View> */}
    </View>
  );
};
// markType : 1 - comment, 2 - reply
const CommentScreen = ({route, navigation}) => {
  const [markType, setMarkType] = useState(1);
  const [currentComment, setCurrentComment] = useState('');
  const [currentMarkId, setCurrentMarkId] = useState(null);
  const [comments, setComments] = useState([]);
  const [textComment, setTextComment] = useState('');
  const {item} = route.params;
  const [post, setPost] = React.useState({});
  const {isLoading, call, error} = useGetPostById(item.id);
  const inputRef = useRef(null);
  const onPressReply = markId => {
    logger('repling...', false, markId);
    inputRef?.current?.focus();
    setMarkType(2);
    setCurrentMarkId(markId);
  };
  logger('markType: ', false, markType);
  const onPressSendComment = async () => {
    if (markType == 1) {
      const response = await setMarkComments({
        id: item.id,
        content: textComment,
        index: '0',
        count: '10',
        type: '1',
      });
    } else if (markType == 2) {
      const response = await setMarkComments({
        id: item.id,
        content: textComment,
        index: '0',
        count: '10',
        type: '1',
        mark_id: currentMarkId,
      });
    }

    setTextComment('');
    const fetchMarkComments = async () => {
      try {
        const response = await getMarkComments({
          id: item.id,
          index: 0,
          count: 10,
        });
        setComments(response?.data?.data);
        setCurrentComment(response?.data?.data?.created);
      } catch (err) {
        logger('excpetion in Comment Screen!');
      }
    };
    await fetchMarkComments();
    logger('response set mark comment: ', false, response.data.data);
  };
  React.useEffect(() => {
    const fetchMarkComments = async () => {
      try {
        const response = await getMarkComments({
          id: item.id,
          index: 0,
          count: 10,
        });
        setComments(response?.data?.data);
        setCurrentComment(response?.data?.data?.created);
      } catch (err) {
        logger('excpetion in Comment Screen!');
      }
    };
    fetchMarkComments();
  }, [currentComment]);
  React.useEffect(() => {
    const getPost = async () => {
      const post = await call();
      console.log(post);
      setPost(post.data);
    };
    getPost();
  }, [item.id]);
  if (!post.id) return <LoadingOverlay isLoading={true} />;
  return (
    <View style={styles.wrapper}>
      <PostHeaderComment data={post} />
      <ScrollView style={styles.subWrapper}>
        <PostBodyComment key={post.id} item={post} />
        <View
          style={{
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
            {' '}
            Tất cả bình luận
          </Text>
          <VectorIcon
            name="down"
            type="AntDesign"
            color={Colors.black}
            size={16}
            style={{paddingLeft: 3, paddingTop: 2}}
            onPress={onPressSendComment}
          />
        </View>
        {Array.isArray(comments) &&
          comments.map(comment => (
            <Comment
              key={comment.id}
              id={comment.id}
              type={comment.type_of_mark}
              authorId={comment.poster.id}
              authorName={comment.poster.name}
              authorAvatar={comment.poster.avatar}
              content={comment.mark_content}
              createTime={comment.created}
              replies={comment.comments}
              onClickReply={onPressReply}
            />
          ))}
      </ScrollView>

      <View style={styles.addComment}>
        <VectorIcon
          name="camera"
          type="FontAwesome"
          color={Colors.gray}
          size={20}
          style={{paddingRight: 15, paddingBottom: 6}}
          onPress={onPressSendComment}
        />
        <TextInput
          onPressOut={() => setMarkType(1)}
          ref={inputRef}
          value={textComment}
          style={styles.inputComment}
          placeholder="Bình luận dưới tên bạn"
          placeholderTextColor={Colors.textGrey}
          onChangeText={value => setTextComment(value)}
        />
        <VectorIcon
          name="send"
          type="Feather"
          color={Colors.primaryColor}
          size={20}
          style={styles.sendButton}
          onPress={onPressSendComment}
        />
      </View>
    </View>
  );
};
// }
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  subWrapper: {
    backgroundColor: Colors.white,
    position: 'relative',
    marginBottom: '15%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  commentSection: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    flexDirection: 'column',
    backgroundColor: '#f0f1f4',
    borderRadius: 10,
    width: 'auto',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  nameText: {
    color: 'black',
    fontWeight: 500,
  },
  contentText: {
    color: 'black',
  },
  column: {
    marginLeft: 10,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  reactCommentWrapper: {
    flexDirection: 'row',
    paddingLeft: '15%',
    paddingTop: 5,
    justifyContent: 'space-between',
    width: '60%',
  },
  reactCommentText: {
    color: 'black',
    fontWeight: 500,
  },
  replies: {
    marginLeft: '15%',
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  addComment: {
    backgroundColor: Colors.white,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
    padding: 5,
    paddingTop: 10,
  },
  inputComment: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
  },
  sendButton: {
    padding: 10,
  },
});
export default CommentScreen;
