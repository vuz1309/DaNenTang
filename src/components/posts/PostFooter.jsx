import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';
import Like from '../../assets/images/like.jpeg';
import Heart from '../../assets/images/heart.jpeg';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {feelPost as feelPostApi} from '../../api/modules/comment.request';
import {store} from '../../state-management/redux/store';
import {postInfoActions} from '../../state-management/redux/slices/HomeListPost';

import {SUCCESS_CODE} from '../../utils/constants';
import {Themes} from '../../assets/themes';

import ListReactions from '../comments/ListReactions';

const ScreenHeight = Dimensions.get('window').height;

export const feelConfigs = {
  '-1': {
    icon: 'like2',
    color: null,
    text: 'Thích',
  },
  0: {
    icon: 'dislike1',
    color: Themes.COLORS.red,
    text: 'Yêu',
    img: Heart,
  },
  1: {
    icon: 'like1',
    color: Colors.primaryColor,
    text: 'Thích',
    img: Like,
  },
};

/**
 *
 * @param {object} props
 * @returns
 */
const PostFooter = ({data, textStyles = {color: Colors.grey}}) => {
  const [reactionModal, setReactionModal] = useState(false);
  const [feelPost, setFeelPost] = useState(data.is_felt);

  const [showModalReactions, setShowModalReactions] = useState(false);

  const handleClickLike = async (type = '1') => {
    if (type == feelPost) return;
    const updateData = {...data};
    setFeelPost(type);
    if (type == '-1') {
      updateData.feel = (Number(updateData.feel) - 1).toString();
      updateData.is_felt = type;

      // handle un feel api(TODO)

      store.dispatch(postInfoActions.updatePost(updateData));
      return;
    }

    const id = data.id;

    try {
      const {data} = await feelPostApi({
        id,
        type,
      });
      console.log('like reponse', data);
      if (data.code == SUCCESS_CODE) {
        updateData.feel = (
          Number(data.data.kudos) + Number(data.data.disappointed)
        ).toString();
        updateData.is_felt = type;

        store.dispatch(postInfoActions.updatePost(updateData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReactionClick = () => {
    if (Number(data.comment_mark) > 0) {
      // open modal comment
    } else {
      // open modal list comment
      setShowModalReactions(true);
    }
  };

  return (
    <>
      <View style={{marginTop: 8}}>
        <TouchableHighlight
          underlayColor={Colors.lightgrey}
          onPress={handleReactionClick}
          style={styles.footerReactionSec}>
          <>
            {Number(data.feel) > 0 && (
              <View style={{...styles.row, backgroundColor: 'transparent'}}>
                <Image source={Like} style={styles.reactionIcon} />
                <Image source={Heart} style={styles.reactionIcon} />

                <Text style={{...styles.reactionCount, ...textStyles}}>
                  {data.feel}
                </Text>
              </View>
            )}
            {Number(data.comment_mark) > 0 && (
              <Text
                style={{
                  ...styles.reactionCount,
                  ...textStyles,
                  position: 'absolute',
                  right: 16,
                }}>
                {data.comment_mark} Bình luận
              </Text>
            )}
          </>
        </TouchableHighlight>
        <View style={styles.userActionSec}>
          {reactionModal && (
            <View style={styles.reactionModalContainer}>
              <TouchableOpacity
                style={{transform: [{scale: 1.5}]}}
                onPress={() => {
                  handleClickLike('1');
                  setReactionModal(false);
                }}>
                <View>
                  <Image source={Like} style={styles.reactionIcon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{transform: [{scale: 1.5}]}}
                onPress={() => {
                  handleClickLike('0');
                  setReactionModal(false);
                }}>
                <View>
                  <Image source={Heart} style={styles.reactionIcon} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {
            <Pressable
              onPress={() => setReactionModal(false)}
              style={{
                position: 'absolute',
                width: '100%',
                height: ScreenHeight,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',

                zIndex: 1,
                display: reactionModal ? 'flex' : 'none',
                backgroundColor: Colors.white,
              }}>
              <Text>Nhấn vào đây để đóng</Text>
            </Pressable>
          }

          <TouchableOpacity
            onPress={() => handleClickLike(feelPost == '-1' ? '1' : '-1')}
            onLongPress={() => setReactionModal(true)}>
            <View style={styles.row}>
              {feelConfigs[feelPost].img ? (
                <View
                  style={{
                    borderRadius: 20,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: Colors.white,
                    overflow: 'hidden',
                    height: 24,
                    width: 24,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    source={feelConfigs[feelPost].img}
                  />
                </View>
              ) : (
                <VectorIcon
                  name={feelConfigs[feelPost].icon}
                  type="AntDesign"
                  size={25}
                  color={feelConfigs[feelPost].color || textStyles.color}
                />
              )}
              <Text
                style={{
                  ...styles.reactionCount,
                  ...textStyles,
                  color: feelConfigs[feelPost].color || textStyles.color,
                }}>
                {feelConfigs[feelPost].text}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.row}>
            <VectorIcon
              name="chatbox-outline"
              type="Ionicons"
              size={25}
              color={textStyles.color}
            />
            <Text style={{...styles.reactionCount, ...textStyles}}>
              Bình luận
            </Text>
          </View>

          <View style={styles.row}>
            <VectorIcon
              name="arrow-redo-outline"
              type="Ionicons"
              size={25}
              color={textStyles.color}
            />
            <Text style={{...styles.reactionCount, ...textStyles}}>
              Chia sẻ
            </Text>
          </View>
        </View>
      </View>

      {showModalReactions && (
        <ListReactions
          onClose={() => setShowModalReactions(false)}
          postId={data.id}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  reactionIcon: {
    height: 20,
    width: 20,
    marginRight: -4,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reactionCount: {
    color: Colors.grey,
    fontSize: 14,
    paddingLeft: 5,
  },
  footerReactionSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
    padding: 14,
    paddingTop: 0,
  },
  userActionSec: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reactionModalContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -30,
    left: 0,
    zIndex: 15,
  },
});

export default PostFooter;
