import React from 'react';
import {View, StyleSheet} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ZoomableImage = ({urls, onClose, index}) => {
  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={urls}
        enableSwipeDown={true}
        onSwipeDown={onClose}
        index={index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ZoomableImage;
