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
import {ScrollView, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import { getMarkComments, setMarkComments } from '../api/modules/comment.request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const LIST_COMMENTS = [
  {
    id: '4',
    mark_content: 'hey',
    type_of_mark: '0',
    created: '2023-12-06T07:57:37.219Z',
    poster: {
      id: '163',
      name: 'Nguyễn Tuấn',
      avatar:
        'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
    },
    comments: [],
  },
  {
    id: '1',
    mark_content: 'so god',
    type_of_mark: '1',
    created: '2023-11-25T18:27:10.344Z',
    poster: {
      id: '18',
      name: 'Abcd1234',
      avatar:
        'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
    },
    comments: [
      {
        content: 'so god',
        created: '2023-11-25T18:28:41.104Z',
        poster: {
          id: '18',
          name: 'Abcd1234',
          avatar:
            'https://st.nettruyenus.com/data/comics/34/dieu-dieu-yeu-dau-cuoi-cung-sung-duoc-em-532.jpg',
        },
      },
      {
        content: 'dâfdgdfg',
        created: '2023-11-26T10:23:22.900Z',
        poster: {
          id: '18',
          name: 'Abcd1234',
          avatar:
            'https://st.nettruyenus.com/data/comics/34/dieu-dieu-yeu-dau-cuoi-cung-sung-duoc-em-532.jpg',
        },
      },
      {
        content: 'so good',
        created: '2023-12-01T10:18:37.432Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://st.nettruyenus.com/data/comics/34/dieu-dieu-yeu-dau-cuoi-cung-sung-duoc-em-532.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T10:22:39.360Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T10:34:30.437Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T10:35:12.494Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T10:37:10.928Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T16:46:21.446Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T16:46:52.812Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T16:48:28.940Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T16:48:35.037Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T16:49:25.889Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
      {
        content: 'so sôso good',
        created: '2023-12-01T16:51:54.246Z',
        poster: {
          id: '102',
          name: 'Minh12345',
          avatar:
            'https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg',
        },
      },
    ],
  },
];

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
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <TouchableHighlight style={styles.row}>
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
        <Text>{createdValue} </Text>
        <Text style={styles.reactCommentText} onPress={() => {}}>
          Thích
        </Text>
        <TouchableOpacity
        onPress={() => {onClickReply(id)}}
        >
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
              onClickReply={() => {onClickReply(id)}}
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
  const [comments, setComments] = useState(LIST_COMMENTS);
  const [textComment, setTextComment] = useState('');
  const {item} = route.params;
  const inputRef = useRef(null);
  const onPressReply = (markId) => {
    logger('repling...', false, markId);
    inputRef?.current?.focus();
    setMarkType(2);
    setCurrentMarkId(markId);
  }
  logger('markType: ', false, markType);
 const onPressSendComment = async () => {
  if(markType == 1){
    const response = await setMarkComments({
      id: item.id,
      content: textComment,
      index: "0",
      count: "10",
      type : "1",
    });
  }else if(markType == 2){
    const response = await setMarkComments({
      id: item.id,
      content: textComment,
      index: "0",
      count: "10",
      type : "1",
      mark_id: currentMarkId,
    });
  }

    setTextComment('');
   const fetchMarkComments = async () => {
    try{
      const response = await getMarkComments({
        id: item.id,
        index : 0,
        count : 10,
      });
      setComments(response?.data?.data);
      setCurrentComment(response?.data?.data?.created)
    }catch(err){
      logger('excpetion in Comment Screen!');
    }
   };
   await fetchMarkComments();
    logger('response set mark comment: ', false, response.data.data);
 }
  React.useEffect(() => {
    const fetchMarkComments = async () => {
      try{
        const response = await getMarkComments({
          id: item.id,
          index : 0,
          count : 10,
        });
        setComments(response?.data?.data);
        setCurrentComment(response?.data?.data?.created)
      }catch(err){
        logger('excpetion in Comment Screen!');
      }
    }
    fetchMarkComments();
  },[currentComment])


  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.subWrapper}>
        <View style={styles.header}>
          <VectorIcon
            name="arrow-back"
            type="Ionicons"
            color={Colors.black}
            size={20}
            onPress={() => navigation.navigate(APP_ROUTE.HOME_TAB)}
          />
          <PostBody key={item.id} item={item} />
          {Array.isArray(comments) &&
            comments.map(comment => (
              <Comment
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
        </View>
      </ScrollView>
      <View style={styles.addComment}>
        <TextInput
          onPressOut={() => setMarkType(1)}
          ref={inputRef}
          value={textComment}
          style={styles.inputComment}
          placeholder="Bình luận dưới tên bạn"
          onChangeText={value => setTextComment(value)}
        />
        <VectorIcon
          name="paper-plane"
          type="FontAwesome"
          color={Colors.black}
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
    height: '100%',
    backgroundColor: 'white',
    position: 'relative',
  },
  subWrapper : {
    height: '50%',
    backgroundColor: 'white',
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
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
    backgroundColor: 'lightgray',
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
  },
  reactCommentText: {
    fontWeight: 500,
  },
  replies: {
    marginLeft: '15%',
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  addComment : {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    padding: 5,
    paddingTop: 10,

  },
  inputComment : {
    width: '70%',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  sendButton: {
    marginBottom: 10,
    paddingLeft: 10,
    // backgroundColor: 'pink',
    // padding: 8,
    // borderRadius: 5,
  },

});
export default CommentScreen;
