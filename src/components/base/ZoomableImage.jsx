import React from 'react';
import {View, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {FriendActions} from '../userScreens/FriendActions';
import {Colors} from '../../utils/Colors';
import RNFS from 'react-native-fs';
const MenuImage = ({cancel, saveToLocal}) => {
  return (
    <TouchableOpacity onPress={cancel} style={{zIndex: 9, flex: 1}}>
      <View>
        <FriendActions
          action={saveToLocal}
          text={`Lưu vào điện thoại`}
          icon={'download'}
          backgroundColor={Colors.white}
          iconType="AntDesign"
        />

        <FriendActions
          action={cancel}
          text={`Hủy`}
          backgroundColor={Colors.white}
          iconType="AntDesign"
          icon={'close'}
        />
      </View>
    </TouchableOpacity>
  );
};

const ZoomableImage = ({urls, onClose, index}) => {
  // Hàm để lấy đuôi mở rộng của ảnh từ URL
  const getImageExtension = url => {
    return url.split('.').pop();
  };
  const handleSaveImage = async imageUrl => {
    try {
      console.log(imageUrl);
      const timestamp = new Date().getTime();
      const fileName = `image_${timestamp}.${getImageExtension(imageUrl)}`;
      const response = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: `${RNFS.PicturesDirectoryPath}/${fileName}`,
      }).promise;

      if (response.statusCode === 200) {
        ToastAndroid.show(
          'Hình ảnh đã được tải và lưu vào điện thoại',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('Lỗi khi tải và lưu hình ảnh', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Lỗi khi tải và lưu hình ảnh:', error);
      ToastAndroid.show('Lỗi khi tải và lưu hình ảnh', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={urls}
        enableSwipeDown={true}
        onSwipeDown={onClose}
        menus={MenuImage}
        onSave={handleSaveImage}
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
