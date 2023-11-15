import { Image, StyleSheet, View, Modal, Text, Pressable, FlatList, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import FacebookLogo from '../assets/images/fblogo.png';
import VectorIcon from '../utils/VectorIcon';
import { Colors } from '../utils/Colors';
import { logger } from '../utils/helper';
import { useState } from 'react';
import SearchModal from './modal/SearchModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import FriendStoryImg1 from '../assets/images/img2.jpeg';
import FriendStoryImg2 from '../assets/images/img3.jpeg';
import FriendStoryImg3 from '../assets/images/img4.jpeg';
import FriendStoryImg4 from '../assets/images/img5.jpeg';
import FriendStoryImg5 from '../assets/images/img6.jpeg';
import FriendStoryImg6 from '../assets/images/img7.jpeg';
import FriendStoryImg7 from '../assets/images/img8.jpeg';


const DATA = [
    {
        userId: '1',
        fullname: 'Hiếu Minh Trịnh',
        avatar: FriendStoryImg1
    },
    {
        userId: '2',
        fullname: 'Vũ Nguyễn',
        avatar: FriendStoryImg2
    },
    {
        userId: '3',
        fullname: 'Quang Trần Minh',
        avatar: FriendStoryImg3
    },
    {
        userId: '4',
        fullname: 'Hiếu Minh Trịnh',
        avatar: FriendStoryImg1
    },
    {
        userId: '5',
        fullname: 'Vũ Nguyễn',
        avatar: FriendStoryImg2
    },
    {
        userId: '6',
        fullname: 'Quang Trần Minh',
        avatar: FriendStoryImg3
    },
    {
        userId: '7',
        fullname: 'Hiếu Minh Trịnh',
        avatar: FriendStoryImg1
    },
    {
        userId: '8',
        fullname: 'Vũ Nguyễn',
        avatar: FriendStoryImg2
    },
    {
        userId: '9',
        fullname: 'Quang Trần Minh',
        avatar: FriendStoryImg3
    },
    {
        userId: '11',
        fullname: 'Hiếu Minh Trịnh',
        avatar: FriendStoryImg1
    },
    {
        userId: '12',
        fullname: 'Vũ Nguyễn',
        avatar: FriendStoryImg2
    },
    {
        userId: '13',
        fullname: 'Quang Trần Minh',
        avatar: FriendStoryImg3
    },

];

const Item = () => {
    const onPress = (item) => {
        logger("pressed on: ", false, item.fullname)
        //TODO: DATA LOGIC HERE

    }
    return (<View
        >{DATA.map(
            item => (
                <View
                key = {item.userId} 
                style={styles.postHeaderContainer}>
                    <View style={styles.postTopSec}>
                        <TouchableOpacity 
                        style={styles.row}
                        onPress = {onPress(item)}>
                            <Image
                                source={item.avatar}
                                style={styles.userProfile}
                            />
                            <View style={styles.userSection}>
                                <Text style={[styles.title]}>{item.fullname}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.row}>
                            <VectorIcon
                                name="dots-three-horizontal"
                                type="Entypo"
                                size={25}
                                color={Colors.headerIconGrey}
                                style={styles.headerIcons}
                            />
                        </View>
                    </View>
                </View>
            )
        )}
        
    </View>)
}
    

const Header = () => {
    const [selectedId, setSelectedId] = useState();
    const [text, onChangeText] = React.useState('Tìm kiếm trên Facebook');
    const [modalVisible, setModalVisible] = useState(false);
    const onPressSearch = () => {
        logger("Opening search modal ...");
        setModalVisible(true);
    }


    return (
        <View style={styles.container}>
                <Image source={FacebookLogo} style={styles.fbLogoStyle} />
                <View style={styles.headerIcons}>
                    <View style={styles.searchBg}>
                        <VectorIcon
                            name="search"
                            type="FontAwesome5"
                            size={19}
                            color={Colors.grey}
                            onPress={onPressSearch}
                        />
                    </View>
                    <View style={styles.searchBg}>
                        <VectorIcon
                            name="messenger"
                            type="Fontisto"
                            size={22}
                            color={Colors.grey}
                        />
                    </View>
                </View>

                {modalVisible ? <Modal
                    animationType='fade'
                    transparent={false}
                    visible={modalVisible}
                    presentationStyle='fullScreen'
                    onRequestClose={() => {
                        AlertMessage('Modal has been closed.');
                        setModalVisible(false);
                    }}
                >
                    <View>
                        <View style={styles.searchHeader}>
                            <View style={styles.marginTopHalf}>
                                <VectorIcon
                                    name="arrow-back"
                                    type="Ionicons"
                                    color={Colors.black}
                                    size={20}
                                    onPress={() => setModalVisible(false)}
                                />
                            </View>
                            <TextInput
                                style={styles.searchInput}
                                value={text}>
                            </TextInput>
                        </View>

                        <View
                            style={{
                                marginTop: '5%',
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />

                        <Text style={styles.biggerText}>
                            Gần đây
                        </Text>

                        <ScrollView>
                            <Item/>
                        </ScrollView>
                       
                    </View>

                </Modal> : logger("not open modal")
                }
            </View>
    );
};

const styles = StyleSheet.create({
    fbLogoStyle: {
        height: 25,
        width: 130,
    },
    searchBg: {
        backgroundColor: Colors.lightgrey,
        height: 35,
        width: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    container: {
        backgroundColor: Colors.white,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    subContainer: {
        backgroundColor: Colors.black,
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    title: {
        fontSize: 22,
        color: 'black'
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    userProfile: {
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    row: {
        flexDirection: 'row',
    },
    userSection: {
        marginLeft: 26,
    },
    postTopSec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postHeaderContainer: {
        padding: 16,
    },
    searchHeader: {
        flexDirection: 'row',
        marginLeft: 10,
        padding: 10,
    },
    searchInput: {
        backgroundColor: '#DDDDDD',
        borderRadius: 18,
        marginLeft: '5%',
        width: '88%',
        height: 40,
        padding: 10,
        paddingLeft: 15
    },
    marginTopHalf: {
        marginTop: '3%'
    },
    biggerText: {
        marginTop: '3%',
        marginLeft: '3%',
        fontSize: 22,
        color: 'black',
        fontWeight: '600'
    }

});

export default Header;
