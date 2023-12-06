import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Modal,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Colors} from '../utils/Colors';

import VectorIcon from '../utils/VectorIcon';
import FriendStoryImg1 from '../assets/images/img2.jpeg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {APP_ROUTE} from '../navigation/config/routes';

import {addPost, editPost, getPostRequest} from '../api/modules/post.request';
import AlertMessage from '../components/base/AlertMessage';
import {store} from '../state-management/redux/store';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import {useSelector} from 'react-redux';
import {createImageFormData} from '../helpers/helpers';
import LoadingOverlay from '../components/base/LoadingOverlay';

const UploadScreen = ({onClose, title}) => {
  const user = useSelector(state => state.userInfo.user);
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('OK');
  const [isExit, setIsExit] = useState(false);
  const defaultImg = 'https://static.thenounproject.com/png/3752804-200.png';
  const posted = useSelector(state => state.postInfo.posts[0]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsModalOpen(false);
    console.log('heeloo');
    console.log('post', posted);
    if (title === 'edit') {
      setText(posted.described);
      setImages(posted.image);
    }
  }, []);
  const [post, setPost] = useState({
    images: [],
    described: '',
    status: '',
    video: '',
  });

  const openLibrary = () => {
    launchImageLibrary({noData: true}, r => {
      if (r.didCancel) {
        return;
      }
      if (r.errorCode) {
        console.log('error');
      }
      const tmp = r.assets[0];

      if (images.length < 20) {
        const newImgList = [...images, tmp];
        setImages(newImgList);
        return;
      }
      AlertMessage('Tối đa 20 ảnh');
    });
  };
  const removeImg = index => {
    const newImgList = [...images];

    newImgList.splice(index, 1);

    setImages(newImgList);
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Quyền truy cập máy ảnh',
          message: 'Ứng dụng cần truy cập Camera của bạn',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Không có quyền truy cập máy ảnh');
      } else {
        console.log('Quyền truy cập bị từ chối');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCamera = () => {
    requestCameraPermission().then(() => {
      const options = {};
      launchCamera(options).then(r => console.log(r));
    });
  };
  const handleExit = () => {
    if (text == '') {
      onClose();
    } else {
      setIsExit(true);
    }
  };
  const onCreateNewPost = async () => {
    setLoading(true);
    const newPost = {
      image: images.filter(img => img.uri),
      described: text.trim() || '  ',
      status,
      video: null,
      auto_accept: '1',
    };

    const formData = new FormData();
    newPost.image.forEach(item => {
      if (item.uri) {
        formData.append('image', createImageFormData(item));
      }
    });

    formData.append('described', newPost.described);
    formData.append('status', newPost.status);
    newPost.video && formData.append('video', newPost.video);
    formData.append('auto_accept', newPost.auto_accept);

    try {
      if (title === 'upload') {
        const {data} = await addPost(formData);

        ToastAndroid.show('Đăng bài mới thành công: ', ToastAndroid.SHORT);

        const res = await getPostRequest({id: data.data.id});

        store.dispatch(postInfoActions.shiftPost(res.data.data));

        onClose();
      } else {
        const {data} = await editPost({
          ...newPost,
          id: posted.id,
          image_del: '',
          image_sort: '',
        }).then();
        ToastAndroid.show('Cập nhật bài thành công: ', ToastAndroid.SHORT);
        onClose();
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  const isDisabledPost = useMemo(
    () => text.trim() === '' && images.length === 0,
    [text, images],
  );

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <View style={styles.container}>
      {<LoadingOverlay isLoading={loading} />}
      <View style={styles.header}>
        {/*header*/}
        <View style={styles.header1}>
          <TouchableOpacity onPress={handleExit}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={22}
              color={Colors.grey}
            />
          </TouchableOpacity>
          {title === 'upload' ? (
            <Text style={styles.headerText}>Tạo bài viết mới</Text>
          ) : (
            <Text style={styles.headerText}>Chỉnh sửa bài viết</Text>
          )}
        </View>
        <TouchableOpacity disabled={isDisabledPost} onPress={onCreateNewPost}>
          {title === 'upload' ? (
            <Text
              style={[
                styles.headerText,
                isDisabledPost ? {color: 'lightgrey'} : {color: Colors.grey},
              ]}>
              Đăng
            </Text>
          ) : (
            <Text
              style={[
                styles.headerText,
                isDisabledPost ? {color: 'lightgrey'} : {color: Colors.grey},
              ]}>
              Cập nhật
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/*avatar and name*/}
      <View style={styles.avaContainer}>
        <Image style={styles.ava} source={{uri: user.avatar}} />
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {user.username}
          </Text>
          <View style={styles.infoStt}>
            <VectorIcon
              name="globe"
              type="FontAwesome"
              size={22}
              color={'lightgrey'}
            />
            <Text style={styles.stt}>Công khai</Text>
          </View>
        </View>
      </View>

      {/*input box*/}
      <View style={styles.input}>
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={e => setText(e)}
          value={text}
          placeholder={'Bạn đang nghĩ gì?'}
          placeholderTextColor={'lightgrey'}
          fontSize={20}
          textAlignVertical="top"
        />
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 4,
          }}>
          {images.length > 0 &&
            images.slice(0, 2).map((e, index) => {
              return (
                <View style={styles.image}>
                  <ImageBackground
                    key={index}
                    style={{width: '100%', aspectRatio: 1}}
                    source={e}
                  />
                  <TouchableOpacity
                    onPress={() => removeImg(index)}
                    style={styles.removeImgIcon}>
                    <VectorIcon
                      type="AntDesign"
                      name="close"
                      color={Colors.black}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 4,
            marginTop: 4,
          }}>
          {images.length > 2 &&
            images.slice(2, 4).map((e, index) => {
              return (
                <View style={styles.image}>
                  <ImageBackground
                    style={{width: '100%', aspectRatio: 1}}
                    resizeMode="cover"
                    source={e}
                    index={index}
                  />
                  <TouchableOpacity
                    onPress={() => removeImg(index + 2)}
                    style={styles.removeImgIcon}>
                    <VectorIcon type="AntDesign" name="close" size={20} />
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </View>
      {/*footer*/}
      {isModalOpen ? (
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setIsModalOpen(false)}>
            <VectorIcon
              name="minus"
              type="FontAwesome5"
              size={22}
              color={'grey'}
              style={{alignItems: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openLibrary}>
            <View style={styles.option}>
              <Image
                style={styles.logoOption}
                source={require('../assets/images/photo.png')}
              />
              <Text style={styles.headerText}>Ảnh/Video</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera}>
            <View style={styles.option}>
              <Image
                style={styles.logoOption}
                source={require('../assets/images/camera.png')}
              />
              <Text style={styles.headerText}>Mở Camera</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.option}>
            <Image
              style={styles.logoOption}
              source={require('../assets/images/emoji.png')}
            />
            <Text style={styles.headerText}>Cảm xúc/Hành động</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addOption}
          onPress={() => setIsModalOpen(true)}>
          <Text style={styles.headerText}>Thêm vào bài viết</Text>
          <View style={styles.logoSection}>
            <Image
              style={styles.logoOption}
              source={require('../assets/images/photo.png')}
            />
            <Image
              style={styles.logoOption}
              source={require('../assets/images/camera.png')}
            />
            <Image
              style={styles.logoOption}
              source={require('../assets/images/emoji.png')}
            />
          </View>
        </TouchableOpacity>
      )}

      <Modal animationType="slide" transparent={true} visible={isExit}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 20,
            }}>
            <View style={{paddingBottom: 10}}>
              <Text style={styles.headerText}>
                Bạn muốn hoàn thành bài viết của mình sau?
              </Text>
            </View>
            <View style={styles.option}>
              <VectorIcon
                name="bookmark"
                type="Feather"
                size={22}
                color={'grey'}
                style={{alignItems: 'center'}}
              />
              <Text
                style={{fontSize: 18, marginBottom: 10, fontWeight: 'bold'}}>
                Lưu làm bản nháp
              </Text>
            </View>
            <TouchableOpacity onPress={() => onClose()}>
              <View style={styles.option}>
                <VectorIcon
                  name="trash-2"
                  type="Feather"
                  size={22}
                  color={'grey'}
                  style={{alignItems: 'center'}}
                />
                <Text
                  style={{fontSize: 18, marginBottom: 10, fontWeight: 'bold'}}>
                  Bỏ bài viết
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsExit(false)}>
              <View style={styles.option}>
                <VectorIcon
                  name="check"
                  type="Feather"
                  size={22}
                  color={'#2873d7'}
                  style={{alignItems: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: 'bold',
                    color: '#2873d7',
                  }}>
                  Tiếp tục chỉnh sửa
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'relative',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  header1: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avaContainer: {
    padding: 8,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  ava: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  infoStt: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5,
  },
  stt: {
    fontSize: 15,
  },
  input: {
    padding: 10,
  },
  addOption: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: 'lightgrey',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  logoOption: {
    width: 24,
    height: 24,
  },
  logoSection: {
    flexDirection: 'row',
    gap: 10,
  },
  modal: {
    backgroundColor: 'white',
    marginTop: 'auto',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: 'lightgrey',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    padding: 10,
  },
  option: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    resizeMode: 'cover',

    position: 'relative',
  },
  imageList: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  removeImgIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 222,
    padding: 4,
    backgroundColor: Colors.lightgrey,
    borderRadius: 20,
  },
});

export default UploadScreen;
