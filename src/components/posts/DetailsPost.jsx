import {View, StyleSheet, Text, Image, Dimensions, Modal} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {logger} from '../../utils/helper';

import PostFooter from './PostFooter';
import Carousel from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');
/**
 *
 * @param {object} props
 * @param {boolean} props.isModalVisible
 * @param {Function} props.onClose
 * @param {object} props.item
 * @returns
 */
const DetailsPost = ({item, onClose, isModalVisible}) => {
  const [opacity, setOpacity] = useState(1);
  const handleSwipeMove = () => {
    setOpacity(1);
    onClose();
  };

  const handleSwipeEnd = () => {
    setOpacity(1);
  };
  const arr = [...new Array(3).fill(null)].map((_, index) => ({id: index + 1}));

  return (
    <Modal
      isVisible={isModalVisible}
      onRequestClose={onClose}
      onSwipeComplete={handleSwipeMove}
      style={{
        flex: 1,
        margin: 0,
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        backgroundColor: Colors.black,
        justifyContent: 'flex-end',
        position: 'absolute',
        left: 0,
        top: 0,
        width,
        height: '100%',
      }}
      onSwipeMove={() => setOpacity(0.2)}
      onSwipeCancel={handleSwipeEnd}
      swipeDirection={['up', 'down']}>
      <View
        style={{
          ...styles.postContainer,
          backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        }}>
        <Carousel
          data={arr}
          renderItem={() => (
            <Image
              style={{height: '100%', width: '100%'}}
              resizeMode="contain"
              source={item.postImg}
            />
          )}
          sliderWidth={width}
          itemWidth={width}
        />
        {opacity == 1 && (
          <View style={styles.postInfo}>
            <View style={{paddingHorizontal: 14}}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Bùi Anh Mĩ
              </Text>
              <Text style={{color: Colors.white, fontWeight: '500'}}>
                Thôi cố mà năm nay ra trường đúng hạn nhé.
              </Text>
              <Text style={{color: Colors.white, marginTop: 12}}>
                28 phút trước
              </Text>
            </View>
            <PostFooter
              data={item}
              textStyles={{color: Colors.white, fontWeight: '500'}}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
  },
  postInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    color: Colors.white,
    elevation: 200,
  },
});

export default DetailsPost;
