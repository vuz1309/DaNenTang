/* eslint-disable @typescript-eslint/no-unused-vars */
import {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {logger} from '../utils/helper';
import React from 'react';
import {Colors} from '../utils/Colors';
import VectorIcon from '../utils/VectorIcon';
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {getMarkComments, setMarkComments} from '../api/modules/comment.request';

import {useNavigation} from '@react-navigation/native';
import {useGetPostById} from '../hooks/useGetPostById';
import LoadingOverlay from '../components/base/LoadingOverlay';
import {convertTimeToFacebookStyle} from '../helpers/helpers';
import PostDisplay from '../components/posts/PostDisplay';
import HeaderCenter from '../components/base/headers/HeaderCenter';
import {store} from '../state-management/redux/store';

const Comment = ({
  id,
  authorId,
  authorName,
  authorAvatar,
  content,
  createTime,
  replies,
  onClickReply,
}) => {
  const createdValue = React.useMemo(() =>
    convertTimeToFacebookStyle(createTime),
  );

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
          count: 20,
        });
        setComments(response?.data?.data);
        setCurrentComment(response?.data?.data?.created);
      } catch (err) {
        logger('excpetion in Comment Screen!');
      }
    };
    await fetchMarkComments();
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
      if (error) {
        navigation.goBack();
      }
      setPost(post.data);
    };
    getPost();
  }, [item.id]);
  if (!post.id) return <LoadingOverlay isLoading={true} />;
  return (
    <View style={styles.wrapper}>
      <HeaderCenter text={post.author.name} goBack={navigation.goBack} />
      <View style={{height: 1, backgroundColor: Colors.borderGrey}} />
      <ScrollView style={styles.subWrapper}>
        <PostDisplay item={post} />
        <View style={{height: 1, backgroundColor: Colors.borderGrey}} />
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
        <View
          style={{height: 40, width: 40, borderRadius: 30, overflow: 'hidden'}}>
          <Image
            style={{resizeMode: 'cover', height: '100%', width: '100%'}}
            source={
              store.getState().userInfo.user.avatar
                ? {uri: store.getState().userInfo.user.avatar}
                : require('../assets/images/avatar_null.jpg')
            }
          />
        </View>
        <TextInput
          onPressOut={() => setMarkType(1)}
          ref={inputRef}
          value={textComment}
          style={styles.inputComment}
          placeholder="Bình luận dưới tên bạn"
          placeholderTextColor={Colors.textGrey}
          onChangeText={value => setTextComment(value)}
        />
        <TouchableHighlight
          underlayColor={Colors.lightgrey}
          style={{padding: 8}}
          onPress={onPressSendComment}>
          <VectorIcon
            name="send"
            type="Feather"
            color={Colors.primaryColor}
            size={26}
          />
        </TouchableHighlight>
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

    flexDirection: 'row',

    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 4,
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
});
export default CommentScreen;
