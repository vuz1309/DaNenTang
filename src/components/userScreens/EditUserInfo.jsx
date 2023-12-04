import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import VectorIcon from "../../utils/VectorIcon";
import {Colors} from "../../utils/Colors";
import nullImage from "../../assets/images/avatar_null.jpg";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {setUserInfo} from "../../api/modules/userProfile.request";
import AlertMessage from "../base/AlertMessage";
import {store} from "../../state-management/redux/store";
import {userInfoActions} from "../../state-management/redux/slices/UserInfoSlice";
import {launchImageLibrary} from "react-native-image-picker";
import {use} from "i18next";

const HeaderOption = ({name, action}) => {
    return (
        <View style={styles.headerOption}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
            }}>{name}</Text>
            <TouchableOpacity onPress={() => action()}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: Colors.primaryColor
                }}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    )
}
const EditUserInfo = ({userInfo, closeModal}) => {
    const [userData, setUserData] = React.useState({
            username: userInfo.username,
            description: userInfo.description,
            avatar: userInfo.avatar,
            address: userInfo.address,
            city: userInfo.city,
            country: userInfo.country,
            cover_image: userInfo.cover_image,
            link: userInfo.link
        }
    )
    const [isModalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const keyboardVerticalOffset = Platform.OS === 'android' ? 100 : 0;
    const openLibrary = (title) => {
        let options = {};
        launchImageLibrary(options, r => {
            let tmp = r.assets[0].uri;
            console.log(tmp);
            if (title === 'avatar') setUserData((prevState) => ({
                ...prevState,
                avatar: tmp,
            }))
            else setUserData((prevState) => ({
                ...prevState,
                cover_image: tmp,
            }))
        })
            .then(r => console.log('succeed added:'))
            .catch(reject => {
                console.log('closed');
            });
    };
    React.useEffect(() => {
        console.log(userData);
    }, [userData])
    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('description', userData.description);
            formData.append('avatar', userData.avatar);
            formData.append('address', userData.address);
            formData.append('city', userData.city);
            formData.append('country', userData.country);
            formData.append('cover_image', userData.cover_image);
            formData.append('link', userData.link);
            const rq = await setUserInfo(formData).then((res) => {
                console.log(res);
                AlertMessage("Đã cập nhật thông tin");
                closeModal();
            });
            console.log(rq)

        } catch (err) {
            console.log(err)
        }
    }
    React.useEffect(() => {
        console.log(userData);
    }, [userData])
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='position'
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View style={styles.header}>
                <View style={styles.backButton}>
                    <TouchableOpacity onPress={() => closeModal()}>
                        <VectorIcon
                            name="arrowleft"
                            type="AntDesign"
                            size={22}
                            color={Colors.grey}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Chỉnh sửa thông tin</Text>
            </View>
            <View style={styles.editOption}>
                <HeaderOption name={'Ảnh nền'} action={() => handleEdit()}/>
                <View style={{
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => openLibrary('avatar')}>
                        {userData.avatar ? (
                            <Image
                                style={styles.ava}
                                source={{
                                    uri: userData.avatar,
                                }}
                            />
                        ) : (
                            <Image style={styles.ava} source={nullImage}/>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.editOption}>
                <HeaderOption name={'Ảnh đại diện'} action={() => handleEdit()}/>
                <View style={{
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => openLibrary('cover_image')}>
                        {userData.cover_image ? (
                            <Image
                                style={styles.background}
                                source={{
                                    uri: userData.cover_image,
                                }}
                            />
                        ) : (
                            <Image style={styles.background} source={nullImage}/>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.editOption}>
                <HeaderOption name={'Thông tin'} action={() => handleEdit()}/>
                <View style={styles.infoOption}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                    }}>Username:{" "}</Text>
                    <TextInput
                        placeholder="Name"
                        inputMode="text"
                        value={userData.username}
                        placeholderTextColor={Colors.borderGrey}
                        onChangeText={value => setUserData(prevState => ({
                            ...prevState,
                            username: value,
                        }))}
                        style={styles.inputBox}
                    />
                </View>
            </View>

        </KeyboardAvoidingView>

    );
};

export default EditUserInfo;
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
    editOption: {
        paddingBottom: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
    headerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,


    },
    ava: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    background: {
        width: '100%',
        height: 200,
        resizeMode: "contain"
    },
    infoOption: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.borderGrey,
        padding: 10,
        borderRadius: 12,
        width: '80%',
        color: Colors.black,
    },


});
