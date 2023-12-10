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
import React, {useMemo, useState} from 'react';
import {Colors} from '../utils/Colors';

import VectorIcon from '../utils/VectorIcon';
import FriendStoryImg1 from '../assets/images/img2.jpeg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {APP_ROUTE} from '../navigation/config/routes';

import {addPost, editPost, getPostRequest} from '../api/modules/post.request';
import AlertMessage from '../components/base/AlertMessage';
import {store} from '../state-management/redux/store';
import HomeListPost, {
    postInfoActions,
} from '../state-management/redux/slices/HomeListPost';
import {useSelector} from 'react-redux';
import {createImageFormData} from '../helpers/helpers';
import LoadingOverlay from '../components/base/LoadingOverlay';
import Enum from '../utils/Enum';
import {BE_URL} from '../api/config';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {openLibraryDevice} from '../utils/helper';
import StyledTouchableHighlight from "../components/base/StyledTouchableHighlight";
import EmotionList from "../components/modal/EmotionList";

const UploadScreen = ({
                          onClose,
                          mode = Enum.PostMode.Create,
                          postData = {image: [], status: 'OK', described: '', id: '0'},
                      }) => {
    const user = useSelector(state => state.userInfo.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState(postData.described);
    const [images, setImages] = useState(postData.image);
    const [status, setStatus] = useState(postData.status);
    const [isExit, setIsExit] = useState(false);
    const [imageDel, setImageDel] = useState([]);

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

    const openLibrary = async () => {
        const imgs = (
            await openLibraryDevice({
                noData: true,
                selectionLimit: 20 - images.length,
            })
        ).assets;

        if (images.length < 20) {
            const newImgList = [...images, ...imgs];
            setImages(newImgList);
            return;
        }
        AlertMessage('Tối đa 20 ảnh');
    };
    const removeImg = index => {
        const newImgList = [...images];
        if (newImgList[index].uri.includes(BE_URL)) {
            setImageDel(prev => [...prev, newImgList[index]]);
        }
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
        if (text === '' && images.length === 0) {
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
                } else formData.append(key, data[key]);
            }
        }
        return formData;
    };
    const createPostRequest = async item => {
        try {
            setLoading(true);
            store.dispatch(postInfoActions.startPosting());
            const formData = buildFormData(item);
            onClose();
            const {data} = await addPost(formData);

            const res = await getPostRequest({id: data.data.id});
            ToastAndroid.show('Đăng bài mới thành công: ', ToastAndroid.SHORT);
            store.dispatch(postInfoActions.endPosting(res.data.data));
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
            console.log('post updated:', data);
            const res = await getPostRequest({id: data.data.id});
            console.log('update post: ', res);
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
            status: status,
            video: null,
            auto_accept: '1',
        };

        if (mode === Enum.PostMode.Create) {
            createPostRequest(newPost);
            return;
        }

        const imgDelStr = imageDel.map(item => item.id).join(',');

        const editPost = {
            ...newPost,
            id: postData.id,
            image_del: imgDelStr,
            image_sort: null,
        };
        editPostRequest(editPost);
    };

    const isDisabledPost = useMemo(
        () => text.trim() === '' && images.length === 0,
        [text, images],
    );
    const [isAddEmo, setIsAddEmo] = React.useState(false);
    const toggleOpenEmo = () => {
        setIsAddEmo(!isAddEmo)
    }
    const handleSetStatus = (emo) => {
        setStatus(emo.name + " " + emo.emo);
        toggleOpenEmo();
        setIsModalOpen(false)
    }
    return (
        <View style={styles.container}>
            {<LoadingOverlay isLoading={loading}/>}
            <View style={styles.header}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddEmo}
                    onBackdropPress={toggleOpenEmo}>
                    <EmotionList close={toggleOpenEmo} setStatus={handleSetStatus}></EmotionList>
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
                <Image style={styles.ava} source={{uri: user.avatar}}/>
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
                    multiline
                    numberOfLines={4}
                    onChangeText={e => setText(e)}
                    value={text}
                    placeholder={'Bạn đang nghĩ gì?'}
                    placeholderTextColor={Colors.textGrey}
                    fontSize={20}
                    style={{color: Colors.black, fontSize: 18}}
                    textAlignVertical="top"
                />
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 4,
                    }}>
                    {images.length > 0 &&
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
                        })}
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
        width:100
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
});

export default UploadScreen;
