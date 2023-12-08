import React from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {FriendActions} from '../userScreens/FriendActions';
import {Colors} from '../../utils/Colors';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}
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

const ZoomableImage = ({urls, onClose, index = 0}) => {
  // Hàm để lấy đuôi mở rộng của ảnh từ URL
  const getImageExtension = url => {
    return url.split('.').pop();
  };
  const handleSaveImage = async imgUrl => {
    const newImgUri = imgUrl.lastIndexOf('/');
    const timestamp = new Date().getTime();
    const imageName = imgUrl.substring(newImgUri);

    const dirs = RNFetchBlob.fs.dirs;
    const path =
      Platform.OS === 'ios'
        ? `${dirs['MainBundleDir']}/${timestamp}${imageName}`
        : `${dirs.PictureDir}/${timestamp}${imageName}`;

    if (Platform.OS === 'android') {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
      RNFetchBlob.config({
        fileCache: true,
        appendExt: getImageExtension(imgUrl),
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image',
        },
      })
        .fetch('GET', imgUrl)
        .then(res => {
          console.log(res, 'end downloaded');
          ToastAndroid.show(
            'Hình ảnh đã được tải và lưu vào điện thoại',
            ToastAndroid.SHORT,
          );
        })
        .catch(error => {
          console.error('Lỗi khi tải và lưu hình ảnh:', error);
          ToastAndroid.show('Lỗi khi tải và lưu hình ảnh', ToastAndroid.SHORT);
        });
    } else {
      CameraRoll.saveToCameraRoll(imgUrl)
        .then(() => {
          ToastAndroid.show(
            'Hình ảnh đã được lưu vào điện thoại',
            ToastAndroid.SHORT,
          );
        })
        .catch(error => {
          console.error('Lỗi khi lưu hình ảnh vào Camera Roll:', error);
          ToastAndroid.show('Lỗi khi lưu hình ảnh', ToastAndroid.SHORT);
        });
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
