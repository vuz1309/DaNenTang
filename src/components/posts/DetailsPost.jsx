import {View, StyleSheet, Text, Modal, TouchableOpacity} from 'react-native';

import React from 'react';
import {Colors} from '../../utils/Colors';

import PostFooter from './PostFooter';
import VectorIcon from '../../utils/VectorIcon';
import PostDescription from './PostDescription';
import ZoomableImage from '../base/ZoomableImage';
import LoadingOverlay from '../base/LoadingOverlay';

const DetailsPost = ({item, onClose, firstItem = 0}) => {
  if (!item) return <LoadingOverlay />;
  return (
    <Modal isModalVisible={true} onRequestClose={onClose}>
      <View
        style={{
          ...styles.postContainer,
          backgroundColor: Colors.black,
        }}>
        <View
          style={{
            flexDirection: 'row-reverse',
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 12,
          }}>
          <TouchableOpacity style={{padding: 16}} onPress={onClose}>
            <VectorIcon
              name="close"
              type="AntDesign"
              size={24}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        <ZoomableImage
          urls={item.image.map(i => ({url: i.url}))}
          onClose={onClose}
          index={firstItem}
        />
        {
          <View style={styles.postInfo}>
            <View style={{paddingHorizontal: 14}}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                {item.author.name}
              </Text>

              <PostDescription
                described={item.described}
                color={Colors.white}
              />
              <Text style={{color: Colors.white, marginTop: 12}}>
                {item.author.created}
              </Text>
            </View>
            <PostFooter
              data={item}
              textStyles={{color: Colors.white, fontWeight: '500'}}
            />
          </View>
        }
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingTop: 16,
  },
});

export default DetailsPost;
