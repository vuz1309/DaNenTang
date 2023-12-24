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
import React, {useMemo, useState} from 'react';
import Like from '../../assets/images/like.jpeg';
import Heart from '../../assets/images/heart.jpeg';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import {
  delFeelPost,
  feelPost as feelPostApi,
} from '../../api/modules/comment.request';
import {store} from '../../state-management/redux/store';
import {postInfoActions} from '../../state-management/redux/slices/HomeListPost';

import {Themes} from '../../assets/themes';

import ListReactions from '../comments/ListReactions';
import {APP_ROUTE} from '../../navigation/config/routes';
import {logger} from '../../utils/helper';
import {useNavigation} from '@react-navigation/native';
import {formatNumberSplitBy} from '../../helpers/helpers';
import Enum from '../../utils/Enum';
import DialogConfirm from '../base/dialog/DialogConfirm';

const ScreenHeight = Dimensions.get('window').height;

export const feelConfigs = {
  [Enum.Feel.UN_FEEL]: {
    icon: 'like2',
    color: null,
    text: 'Thích',
  },
  [Enum.Feel.LIKE]: {
    icon: 'dislike1',
    color: Themes.COLORS.red,
    text: 'Yêu',
    img: Heart,
  },
  [Enum.Feel.DISLIKE]: {
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
  const {navigate} = useNavigation();
  const [reactionModal, setReactionModal] = useState(false);
  const [feelPost, setFeelPost] = useState(data.is_felt);
  const [numOfFeels, setNumOfFeels] = useState(Number(data.feel));
  const [isShowDialogCoins, setIsShowDialogCoins] = React.useState(false);
  const feelText = useMemo(() => {
    if (feelPost === Enum.Feel.UN_FEEL) return numOfFeels;
    else if (numOfFeels > 1)
      return `Bạn và ${formatNumberSplitBy(numOfFeels - 1)} người khác`;
    return 'Bạn';
  }, [numOfFeels, feelPost]);

  const handleDelFeel = async id => {
    try {
      const {data} = await delFeelPost({id});
      // console.log('del feel:', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleFeel = async (id, type) => {
    if (Number(store.getState().userInfo.user.coins) < 1) {
      setIsShowDialogCoins(true);
      return;
    }
    try {
      const {data} = await feelPostApi({
        id,
        type,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickLike = async (type = Enum.Feel.DISLIKE) => {
    if (type == feelPost) return;

    const id = data.id;
    setFeelPost(type);
    const res =
      type == Enum.Feel.UN_FEEL
        ? await handleDelFeel(id)
        : await handleFeel(id, type);

    const totalFeels = Number(res.data.kudos) + Number(res.data.disappointed);
    setNumOfFeels(totalFeels);
    store.dispatch(
      postInfoActions.updatePost({
        ...data,
        is_felt: type,
        feel: totalFeels.toString(),
      }),
    );
  };
  const handleClickLikeNums = () => {
    navigate(APP_ROUTE.LIST_REACTERS, {postId: data.id});
  };
  const handleClickCommentNums = () => {
    navigate(APP_ROUTE.COMMENT_PAGE, {item: {id: data.id}});
  };

  return (
    <View>
      <View underlayColor={Colors.lightgrey} style={styles.footerReactionSec}>
        {numOfFeels > 0 && (
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            style={{padding: 8, flex: 1}}
            onPress={handleClickLikeNums}>
            <View
              style={{
                ...styles.row,
                backgroundColor: 'transparent',
              }}>
              <Image source={Like} style={styles.reactionIcon} />
              <Image source={Heart} style={styles.reactionIcon} />

              <Text style={{...styles.reactionCount, ...textStyles}}>
                {feelText}
              </Text>
            </View>
          </TouchableHighlight>
        )}
        {Number(data.comment_mark) > 0 && (
          <TouchableHighlight
            style={{padding: 8, flex: 1}}
            underlayColor={Colors.lightgrey}
            onPress={handleClickCommentNums}>
            <Text
              style={{
                ...styles.reactionCount,
                ...textStyles,
                textAlign: 'right',
              }}>
              {data.comment_mark} Bình luận
            </Text>
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.userActionSec}>
        {reactionModal && (
          <View style={styles.reactionModalContainer}>
            <TouchableOpacity
              style={{transform: [{scale: 1.5}]}}
              onPress={() => {
                handleClickLike(Enum.Feel.DISLIKE);
                setReactionModal(false);
              }}>
              <View>
                <Image source={Like} style={styles.reactionIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{transform: [{scale: 1.5}]}}
              onPress={() => {
                handleClickLike(Enum.Feel.LIKE);
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
            style={[
              styles.closeReactions,
              {display: reactionModal ? 'flex' : 'none'},
            ]}>
            <Text style={{color: Colors.textGrey}}>Nhấn vào đây để đóng</Text>
          </Pressable>
        }

        <TouchableOpacity
          onPress={() =>
            handleClickLike(
              feelPost == Enum.Feel.UN_FEEL
                ? Enum.Feel.DISLIKE
                : Enum.Feel.UN_FEEL,
            )
          }
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

        <TouchableOpacity
          onPress={() => {
            navigate(APP_ROUTE.COMMENT_PAGE, {item: data});
          }}>
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
        </TouchableOpacity>

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
      <DialogConfirm
        isVisible={isShowDialogCoins}
        closeBtn={{text: 'Không', onPress: () => setIsShowDialogCoins(false)}}
        title={'Thiếu coins'}
        content={`Cần ít nhất ${1} coins để thả cảm xúc, bạn có muốn mua thêm coins?`}
        mainBtn={{
          text: 'Mua',
          onPress: () => {
            setIsShowDialogCoins(false);
            navigate(APP_ROUTE.BUY_COINS);
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reactionIcon: {
    height: 20,
    width: 20,
    marginRight: -4,
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
    paddingHorizontal: 14,
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
  closeReactions: {
    position: 'absolute',
    width: '100%',
    height: ScreenHeight,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',

    zIndex: 1,

    backgroundColor: Colors.white,
  },
});

export default React.memo(
  PostFooter,
  (prev, next) => JSON.stringify(prev.data) === JSON.stringify(next.data),
);
