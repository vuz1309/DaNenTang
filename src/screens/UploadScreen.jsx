import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInputBase,
    TextInput,
    Animated,
    Easing, Modal, Dimensions, FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/Colors';
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import VectorIcon from "../utils/VectorIcon";
import Post1 from "../assets/images/post1.jpeg";
import FriendStoryImg1 from "../assets/images/img2.jpeg";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import {useNavigation} from "@react-navigation/native";
import {values} from "@babel/runtime/regenerator";
import {valueOf} from "jest";
import {options} from "axios";

const UploadScreen = ({navigation, data}) => {
    const [text, setText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalY, setModalY] = useState(new Animated.Value(200));
    const windowHeight = Dimensions.get('window').height;
    const handleOpenModal = () => {
        setIsModalOpen(true);
        Animated.timing(modalY, {
            toValue: 20,
            duration: 200,
            easing: Easing.ease(1),
        }).start();
    }
    const Images = [
        {id: '1', source: require('../assets/images/post1.jpeg')},
        {id: '2', source: require('../assets/images/post2.jpeg')},
        {id: '3', source: require('../assets/images/post5.jpeg')},
        {id: '4', source: require('../assets/images/post4.jpeg')},
    ];
    useEffect(() => {
        setIsModalOpen(false);
    }, []);
    const mock = {
        id: 1,
        name: 'Quang Tran',
        profileImg: FriendStoryImg1,
        storyImg: FriendStoryImg1,
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        Animated.timing(modalY, {
            toValue: 200,
            duration: 200,
            easing: Easing.ease(1),
        }).start();
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                {/*header*/}
                <View style={styles.header1}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MainScreen')}
                    >
                        <VectorIcon
                            name="arrowleft"
                            type="AntDesign"
                            size={22}
                            color={Colors.grey}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Create post</Text>
                </View>
                <View>
                    <Text
                        style={[
                            styles.headerText,
                            text == "" ? {color: 'lightgrey'} : {color: Colors.grey}
                        ]}
                    >Upload</Text>
                </View>
            </View>

            {/*avatar and name*/}
            <View style={styles.avaContainer}>
                <Image
                    style={styles.ava}
                    source={mock.profileImg}
                />
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{mock.name}</Text>
                    <View style={styles.infoStt}>
                        <VectorIcon
                            name="globe"
                            type="FontAwesome"
                            size={22}
                            color={"lightgrey"}
                        />
                        <Text style={styles.stt}>Public</Text>
                    </View>
                </View>
            </View>

            {/*input box*/}
            <View style={styles.input}>
                <TextInput
                    multiline
                    numberOfLines={4}
                    onChangeText={(e) => setText(e)}
                    value={text}
                    placeholder={"What's on your mind?"}
                    placeholderTextColor={"lightgrey"}
                    fontSize={20}
                    textAlignVertical="top"
                />
            </View>

            {/*image section*/}
            <FlatList
                data={Images}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Image source={item.source} style={styles.image} resizeMode="contain"/>
                )}
            />
            {/*footer*/}
            {isModalOpen ?
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
                    <View style={styles.option}>
                        <Image style={styles.logoOption} source={require('../assets/images/photo.png')}/>
                        <Text style={styles.headerText}>Photo/Video</Text>
                    </View>
                    <View style={styles.option}>
                        <Image style={styles.logoOption} source={require('../assets/images/emoji.png')}/>
                        <Text style={styles.headerText}>Feeling/activity</Text>
                    </View>
                </View>
                :
                <TouchableOpacity style={styles.addOption} onPress={() => setIsModalOpen(true)}>
                    <Text style={styles.headerText}>Add to your post</Text>
                    <View style={styles.logoSection}>
                        <Image style={styles.logoOption} source={require('../assets/images/photo.png')}/>
                        <Image style={styles.logoOption} source={require('../assets/images/emoji.png')}/>
                    </View>
                </TouchableOpacity>

            }


        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    header1: {
        flexDirection: 'row',
        gap: 10,
        alignItems: "center"
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
        gap: 5
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
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
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
        padding: 10
    },
    option: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
    },
    image: {
        width: '50%', // Chiều rộng 50% để có 2 cột
        aspectRatio: 1, // Giữ tỷ lệ khung hình
        margin:3,
        objectFit:"cover",
    },



});

export default UploadScreen;
