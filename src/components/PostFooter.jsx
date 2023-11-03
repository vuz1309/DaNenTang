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
import React, {useState} from 'react';
import Like from '../assets/images/like.jpeg';
import Shock from '../assets/images/shock.jpeg';
import Heart from '../assets/images/heart.jpeg';
import {Colors} from '../utils/Colors';
import VectorIcon from '../utils/VectorIcon';

const PostFooter = ({data}) => {
  const [reactionModal, setReactionModal] = useState(false);
  const [isLikePost, setIsLikePost] = useState(data);
  return (
    <View style={styles.postFotterContainer}>
      <View style={styles.footerReactionSec}>
        <View style={styles.row}>
          <Image source={Like} style={styles.reactionIcon} />
          <Image source={Shock} style={styles.reactionIcon} />
          <Image source={Heart} style={styles.reactionIcon} />

          <Text style={styles.reactionCount}> {data.reactionCount}</Text>
        </View>
        <Text style={styles.reactionCount}>{data.comments} Bình luận</Text>
      </View>
      <View style={styles.userActionSec}>
        {reactionModal && (
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
        )}

        <TouchableOpacity
          onPress={() => Alert.alert('like')}
          onLongPress={() => setReactionModal(true)}>
          <View style={styles.row}>
            <VectorIcon
              name="like1"
              type="AntDesign"
              size={25}
              color={Colors.primaryColor}
            />
            <Text style={{...styles.reactionCount, color: Colors.primaryColor}}>
              Thích
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <VectorIcon
            name="chatbox-outline"
            type="Ionicons"
            size={25}
            color={Colors.grey}
          />
          <Text style={styles.reactionCount}>Bình luận</Text>
        </View>

        <View style={styles.row}>
          <VectorIcon
            name="arrow-redo-outline"
            type="Ionicons"
            size={25}
            color={Colors.grey}
          />
          <Text style={styles.reactionCount}>Chia sẻ</Text>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postFotterContainer: {
    padding: 16,
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
    paddingBottom: 15,
  },
  userActionSec: {
    marginTop: 15,
    marginBottom: 5,
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
