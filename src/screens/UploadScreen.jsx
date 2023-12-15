import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Colors} from '../utils/Colors';

import VectorIcon from '../utils/VectorIcon';
import {launchCamera} from 'react-native-image-picker';

import {addPost, editPost, getPostRequest} from '../api/modules/post.request';
import AlertMessage from '../components/base/AlertMessage';
import {store} from '../state-management/redux/store';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import {useSelector} from 'react-redux';
import {createImageFormData} from '../helpers/helpers';
import LoadingOverlay from '../components/base/LoadingOverlay';
import Enum from '../utils/Enum';
import {BE_URL} from '../api/config';
import {openLibraryDevice, requestCameraPermission} from '../utils/helper';
import EmotionList from '../components/modal/EmotionList';
import Video from 'react-native-video';

const UploadScreen = ({
  onClose,
  mode = Enum.PostMode.Create,
  postData = {image: [], status: 'OK', described: '', id: '0', video: {}},
}) => {
  const user = useSelector(state => state.userInfo.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState(postData.described);
  const [images, setImages] = useState(postData.image);
  const [video, setVideo] = useState(postData.video);
  const [status, setStatus] = useState(postData.status);
  const [isExit, setIsExit] = useState(false);
  const [imageDel, setImageDel] = useState([]);

  const [isAddEmo, setIsAddEmo] = React.useState(false);

  const maxOriginalIndex = React.useMemo(
    () => postData.image.length,
    [postData.image.length],
  );

  const isDisabledPost = useMemo(
    () => text.trim() === '' && images.length === 0,
    [text, images],
  );
  const title = useMemo(
    () =>
      mode === Enum.PostMode.Create ? 'Tạo mới bài viết' : 'Cập nhật bài viết',
    [mode],
  );
  const btnText = useMemo(
    () => (mode === Enum.PostMode.Create ? 'Đăng' : 'Cập nhật'),
    [mode],
  );
  const [loading, setLoading] = useState(false);
  const toggleOpenEmo = () => {
    setIsAddEmo(!isAddEmo);
  };
  const openLibrary = async () => {
    const imgs = (
      await openLibraryDevice({
        mediaType: 'mixed',
        noData: true,
        selectionLimit: 20 - images.length,
      })
    ).assets;

    if (imgs[0].type === 'image/jpeg') {
      if (images.length < 20) {
        const newImgList = [...imgs, ...images];
        setImages(newImgList);
        return;
      }
      AlertMessage('Tối đa 20 ảnh');
    }
    if (imgs[0].type === 'video/mp4') {
      //   console.log(imgs[0]);
      setVideo(imgs[0]);
    }
  };
  const removeImg = index => {
    const newImgList = [...images];
    if (images[index].uri.includes(BE_URL)) {
      setImageDel(prev => [...prev, images[index]]);
    }
    newImgList.splice(index, 1);

    setImages(newImgList);
  };

  const openCamera = async () => {
    await requestCameraPermission();

    const options = {};
    launchCamera(options).then(r => console.log(r));
  };
  const handleExit = () => {
    if (isDisabledPost) {
      onClose();
    } else if (mode === Enum.PostMode.Edit) {
      onClose();
    } else {
      setIsExit(true);
    }
  };
  const buildFormData = data => {
    const formData = new FormData();

    for (const key in data) {
      if (key === 'image') {
        data.image.forEach(item => {
          if (item.uri) {
            formData.append('image', createImageFormData(item));
          }
        });
      } else if (data[key]) {
        if (key === 'video') {
          // formData.delete('image')
          formData.append('video', createImageFormData(data[key]));
        } else formData.append(key, data[key]);
      }
    }
    console.log('formdata:', formData);
    return formData;
  };
  const createPostRequest = async item => {
    try {
      setLoading(true);
      store.dispatch(postInfoActions.startPosting());
      const formData = buildFormData(item);
      onClose();
      const res1 = await addPost(formData);

      const {data} = res1;
      const res = await getPostRequest({id: data.data.id});

      store.dispatch(postInfoActions.endPosting(res.data.data));
      ToastAndroid.show('Đăng bài mới thành công: ', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      store.dispatch(postInfoActions.endPosting({}));
    } finally {
      setLoading(false);
    }
  };
  const editPostRequest = async item => {
    try {
      setLoading(true);

      const imgs = item.image.filter(img => !img.uri.includes(BE_URL));
      const formData = buildFormData({...item, image: imgs, id: postData.id});

      const {data} = await editPost(formData);

      const res = await getPostRequest({id: data.data.id});

      store.dispatch(postInfoActions.updatePost(res.data.data));

      ToastAndroid.show('Cập nhật thành công: ', ToastAndroid.SHORT);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onCreateNewPost = () => {
    setLoading(true);

    const newPost = {
      image: images.filter(img => img.uri),
      described: text.trim() || '  ',
      status: status || 'Hihi',
      video,
      auto_accept: '1',
    };
    if (video?.uri) {
      delete newPost.image;
    }

    if (mode === Enum.PostMode.Create) {
      createPostRequest(newPost);
      return;
    }

    const imgsDelStr = imageDel.map(item => item.id).join(',');

    let startNewImgIndex = maxOriginalIndex;
    const newImgSort = images.map(imgSource => {
      if (imgSource.uri.includes(BE_URL)) {
        return imgSource.originalIndex;
      } else {
        startNewImgIndex++;
        return `${startNewImgIndex}`;
      }
    });
    const imgDelSorterStr = newImgSort.join(', ');
    const editPost = {
      ...newPost,
      id: postData.id,
      image_del: imgsDelStr || null,
      image_sort: imgDelSorterStr || null,
    };
    editPostRequest(editPost);
  };

  const handleSetStatus = emo => {
    setStatus(emo.name + ' ' + emo.emo);
    toggleOpenEmo();
    setIsModalOpen(false);
  };
  const handleUnRemoveImgDel = (imgDel, index) => {
    const imgDels = [...imageDel];
    imgDels.splice(index, 1);
    setImageDel(imgDels);
    setImages([imgDel, ...images]);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          {transform: [{scale: 1.5}], zIndex: loading ? 10000 : 0},
          StyleSheet.absoluteFill,
        ]}>
        {<LoadingOverlay isLoading={loading} />}
      </View>
      <View style={styles.header}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddEmo}
          onBackdropPress={toggleOpenEmo}>
          <EmotionList
            close={toggleOpenEmo}
            setStatus={handleSetStatus}></EmotionList>
        </Modal>
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

          <Text style={styles.headerText}>{title}</Text>
        </View>
        <TouchableOpacity disabled={isDisabledPost} onPress={onCreateNewPost}>
          <Text
            style={[
              styles.headerText,
              isDisabledPost ? {color: 'lightgrey'} : {color: Colors.grey},
            ]}>
            {btnText}
          </Text>
        </TouchableOpacity>
      </View>

      {/*avatar and name*/}
      <View style={styles.avaContainer}>
        <Image style={styles.ava} source={{uri: user.avatar}} />
        <View>
          <Text
            style={{fontWeight: 'bold', fontSize: 20, color: Colors.textColor}}>
            {user.username}
            <Text style={{fontWeight: '400', fontSize: 15}}>
              {' '}
              cảm thấy {status}
            </Text>
          </Text>
          <View style={styles.infoStt}>
            <VectorIcon
              name="globe"
              type="FontAwesome"
              size={20}
              color={'lightgrey'}
            />
            <Text style={styles.stt}>Công khai</Text>
          </View>
        </View>
      </View>

      {/*input box*/}
      <View style={styles.input}>
        <TextInput
          autoFocus
          multiline
          numberOfLines={3}
          onChangeText={e => setText(e)}
          value={text}
          placeholder={'Bạn đang nghĩ gì?'}
          placeholderTextColor={Colors.textGrey}
          fontSize={20}
          style={{color: Colors.black, fontSize: 18}}
          textAlignVertical="top"
        />
      </View>
      {imageDel.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            marginBottom: 8,
            paddingHorizontal: 8,
            flexWrap: 'wrap',
          }}>
          <Text
            style={{color: Colors.textColor, fontSize: 18, fontWeight: 'bold'}}>
            Khôi phục:
          </Text>
          <View style={{flexDirection: 'row', gap: 8}}>
            {imageDel.map((img, index) => (
              <TouchableOpacity
                key={img.uri}
                onPress={() => handleUnRemoveImgDel(img, index)}
                style={{
                  borderWidth: 1,
                  borderColor: Colors.borderGrey,
                  borderStyle: 'solid',
                }}>
                <Image
                  style={{height: 48, width: 48, resizeMode: 'cover'}}
                  source={img}
                  defaultSource={require('../assets/images/avatar_null.jpg')}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginBottom: 100}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
          }}>
          {!!video?.uri ? (
            <Video
              source={video}
              style={styles.video}
              controls={true}
              resizeMode="contain"
            />
          ) : (
            images.length > 0 &&
            images.map((e, index) => {
              return (
                <View key={index} style={styles.image}>
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
            })
          )}
        </View>
      </ScrollView>
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
          <TouchableOpacity onPress={toggleOpenEmo}>
            <View style={styles.option}>
              <Image
                style={styles.logoOption}
                source={require('../assets/images/emoji.png')}
              />
              <Text style={styles.headerText}>Cảm xúc/Hành động</Text>
            </View>
          </TouchableOpacity>
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
                Bạn muốn hoàn thành bài viết sau?
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
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  color: Colors.textColor,
                }}>
                Lưu làm bản nháp
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <View style={styles.option}>
                <VectorIcon
                  name="trash-2"
                  type="Feather"
                  size={22}
                  color={'grey'}
                  style={{alignItems: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: 'bold',
                    color: Colors.textColor,
                  }}>
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
                  color={Colors.primaryColor}
                  style={{alignItems: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: 'bold',
                    color: Colors.primaryColor,
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
    color: Colors.textGrey,
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
    width: 100,
  },
  stt: {
    fontSize: 14,
    color: Colors.textGrey,
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
    width: '49%',
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
  video: {
    flex: 1,
    width: '100%',
    height: 250, // Adjust the height as needed
  },
});

export default UploadScreen;
