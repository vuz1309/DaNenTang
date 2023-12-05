import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Easing,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/Colors';

import VectorIcon from '../utils/VectorIcon';
import FriendStoryImg1 from '../assets/images/img2.jpeg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {APP_ROUTE} from '../navigation/config/routes';

import {addPost} from '../api/modules/post.request';

const UploadScreen = ({navigation, route}) => {
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('Hyped');
  const [isExit, setIsExit] = useState(false);
  const [crrIndex, setCrrIndex] = useState(0);
  const defaultImg = 'https://static.thenounproject.com/png/3752804-200.png';
  useEffect(() => {
    setIsModalOpen(false);
  }, []);
  const mock = {
    id: 1,
    name: 'Quang Tran',
    profileImg: FriendStoryImg1,
    storyImg: FriendStoryImg1,
  };
  const [post, setPost] = useState({
    images: [],
    described: '',
    status: '',
    video: '',
  });
  const openLibrary = () => {
    let options = {};
    launchImageLibrary(options, r => {
      let tmp = r.assets[0].uri;
      console.log(tmp);
      let newImgList = [];
      if (images.length < 4) {
        newImgList = [...images, tmp];
        setImages(newImgList);
        console.log('after add ', images);
      } else {
        console.log('Number of images exceeded');
      }
    })
      .then(r => console.log('succeed added'))
      .catch(reject => {
        console.log('closed');
      });
  };
  const removeImg = index => {
    let newImgList = [...images];
    newImgList[index] = '';
    setImages(newImgList);
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCamera = () => {
    requestCameraPermission().then(() => {
      let options = {};
      launchCamera(options).then(r => console.log(r));
    });
  };
  const handleExit = () => {
    if (text == '') {
      navigation.navigate(APP_ROUTE.HOME_TAB);
    } else {
      setIsExit(true);
    }
  };
  const onCreateNewPost = async () => {
    const newPost = {
      image: images.filter(e => e.uri !== ''),
      described: text,
      status,
      video: null,
      auto_accept: '1',
    };
    setPost(newPost);

    // Tham khảo đoạn thêm image kiểu này nếu có lỗi với kiểu đang làm (CHAT GPT)
    // formData.append('image', {
    //     uri: newPost.image[0],
    //     type: 'image/jpeg', // Thay đổi loại tệp tùy thuộc vào định dạng của hình ảnh bạn đang sử dụng
    //     name: 'photo.jpg',
    //   });

    const formData = new FormData();
    formData.append('image', newPost.image);
    formData.append('described', newPost.described);
    formData.append('status', newPost.status);
    formData.append('video', newPost.video);
    formData.append('auto_accept', newPost.auto_accept);

    try {
      const {data} = await addPost(newPost);
      console.log(data);
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerText}>Tạo bài viết mới</Text>
        </View>
        <TouchableOpacity disabled={text == ''} onPress={onCreateNewPost}>
          <Text
            style={[
              styles.headerText,
              text == '' ? {color: 'lightgrey'} : {color: Colors.grey},
            ]}>
            Đăng
          </Text>
        </TouchableOpacity>
      </View>

      {/*avatar and name*/}
      <View style={styles.avaContainer}>
        <Image style={styles.ava} source={mock.profileImg} />
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{mock.name}</Text>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {images.map((e, index) => {
            if (index === 0 || index === 1)
              return (
                <Image
                  style={styles.image}
                  source={{uri: e !== '' ? e : defaultImg}}
                  index={index}
                />
              );
          })}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {images.map((e, index) => {
            if (index === 2 || index === 3)
              return (
                <Image
                  style={styles.image}
                  source={{uri: e !== '' ? e : defaultImg}}
                  index={index}
                />
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
            <TouchableOpacity
              onPress={() => navigation.navigate(APP_ROUTE.HOME_TAB)}>
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
    margin: 3,
    objectFit: 'cover',
  },
  imageList: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
});

export default UploadScreen;
