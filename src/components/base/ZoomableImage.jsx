import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ZoomableImage = ({imageUrl}) => {
  const images = [{url: imageUrl}];

  return (
    <View style={styles.container}>
      <ImageViewer imageUrls={images} enableSwipeDown={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ZoomableImage;
