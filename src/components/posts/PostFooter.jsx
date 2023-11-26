import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import Like from '../../assets/images/like.jpeg';
import Shock from '../../assets/images/shock.jpeg';
import Heart from '../../assets/images/heart.jpeg';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {feelPost} from '../../api/modules/comment.request';
import {store} from '../../state-management/redux/store';
import {postInfoActions} from '../../state-management/redux/slices/HomeListPost';
import {SUCCESS_CODE} from '../../utils/constants';

/**
 *
 * @param {object} props
 * @returns
 */
const PostFooter = ({data, textStyles = {color: Colors.grey}}) => {
  const [reactionModal, setReactionModal] = useState(false);
  const [isLikePost, setIsLikePost] = useState(!!Number(data.is_felt));
  const iconLikeName = useMemo(
    () => (isLikePost ? 'like1' : 'like2'),
    [isLikePost],
  );
  const likeColor = useMemo(
    () => (isLikePost ? Colors.primaryColor : textStyles.color),
    [isLikePost],
  );

  const handleClickLike = async () => {
    const id = data.id;
    setIsLikePost(!isLikePost);
    const updateData = {...data};

    try {
      const type = isLikePost ? '0' : '1';
      const {data} = await feelPost({
        id,
        type,
      });
      if (data.code == SUCCESS_CODE) {
        updateData.feel = Number(updateData.feel) + (isLikePost ? -1 : 1);
        updateData.is_felt = type;

        store.dispatch(postInfoActions.updatePost(updateData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.postFotterContainer}>
      <View style={styles.footerReactionSec}>
        {Number(data.feel) > 0 && (
          <View style={{...styles.row, backgroundColor: 'transparent'}}>
            <Image source={Like} style={styles.reactionIcon} />
            {/* <Image source={Shock} style={styles.reactionIcon} />
          <Image source={Heart} style={styles.reactionIcon} /> */}

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
      </View>
      <View style={styles.userActionSec}>
        {/* {reactionModal && (
          <View style={styles.reactionModalContainer}>
            <TouchableOpacity onPress={() => setReactionModal(false)}>
              <View>
                <Image source={Like} style={styles.reactionIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Image source={Shock} style={styles.reactionIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Image source={Heart} style={styles.reactionIcon} />
              </View>
            </TouchableOpacity>
          </View>
        )} */}

        <TouchableOpacity
          onPress={handleClickLike}
          onLongPress={() => setReactionModal(true)}>
          <View style={styles.row}>
            <VectorIcon
              name={iconLikeName}
              type="AntDesign"
              size={25}
              color={likeColor}
            />
            <Text
              style={{
                ...styles.reactionCount,
                ...textStyles,
                color: likeColor,
              }}>
              Thích
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
          <Text style={{...styles.reactionCount, ...textStyles}}>Chia sẻ</Text>
        </View>
      </View>
    </View>
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
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -30,
    left: 0,
    zIndex: 5,
  },
});

export default PostFooter;
