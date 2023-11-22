import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import VectorIcon from "../utils/VectorIcon";
import {Colors} from "../utils/Colors";
import {StyledButton} from "../components/base";
import {Themes} from "../assets/themes";
import {useNavigation} from "@react-navigation/native";
import {APP_ROUTE} from "../navigation/config/routes";
import Post from "../components/Post";
import {PostData} from "../data/PostData";
import SubHeader from "../components/SubHeader";
import Post1 from "../assets/images/post1.jpeg";
import FriendStoryImg1 from "../assets/images/img2.jpeg";

const UserScreen = () => {
    const navigation= useNavigation();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.navigate(APP_ROUTE.HOME_TAB)}>
                    <VectorIcon
                        name="less-than"
                        type="FontAwesome5"
                        size={22}
                        color={Colors.grey}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Username
                </Text>
                <TouchableOpacity>
                    <VectorIcon
                        name="share"
                        type="FontAwesome5"
                        size={22}
                        color={Colors.grey}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.avaContainer}>
                <Image
                    style={styles.background}
                    source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2021/4/23/silly-gojo-satoru-header-1619150236247730687967.jpg'}}
                />
                <Image
                    style={styles.ava}
                    source={{uri: "https://butwhytho.net/wp-content/uploads/2023/09/Gojo-Jujutsu-Kaisen-But-Why-Tho-2.jpg"}}
                />
            </View>
            <View style={styles.info}>
                <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 25}}>Username</Text>
                <View style={styles.infoButton}>
                    <StyledButton
                        title={"Thêm vào tin"}
                        customStyle={{
                            backgroundColor:Themes.COLORS.dodgerBlue,
                            flex:2,
                        }}
                        customStyleText={{
                            fontWeight:'bold'
                        }}
                        icon={{
                            name:'plus',
                            type:'Entypo'
                        }}
                    ></StyledButton>
                    <StyledButton
                        title={"Chỉnh sửa"}
                        customStyle={{
                            backgroundColor:Themes.COLORS.logan,
                            flex:1.5
                        }}
                        customStyleText={{
                            fontWeight:'bold'
                        }}
                        icon={{
                            name:'mode-edit',
                            type:'MaterialIcons'
                        }}
                    ></StyledButton>
                    <StyledButton
                        customStyle={{
                            backgroundColor:Themes.COLORS.logan,
                            flex:0.5,
                            gap:0,
                        }}
                        icon={{
                            name:'dots-three-horizontal',
                            type:'Entypo'
                        }}
                    ></StyledButton>
                </View>
            </View>


            <View>
                <Post data={PostData}></Post>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        position: 'relative',
        flex: 1,
    },
    header: {
        flexDirection: "row",
        padding: 10,
        paddingTop:20,
        justifyContent: 'space-between',
        backgroundColor:Colors.white
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: "center"
    },
    avaContainer: {
        flexDirection: 'column',
        height:200,
        zIndex:1000,
        backgroundColor:Colors.white
    },
    ava: {
        width: 180,
        height: 180,
        position: "absolute",
        borderRadius: 90,
        zIndex: 1000,
        top: 80,
        borderColor: 'white',
        borderWidth: 10,
        backgroundColor:Colors.white

    },
    background: {
        width: "100%",
        height: '100%',
    },
    infoContainer: {
        width: "100%",
        alignItems: 'center',
    },
    info: {
        padding:20,
        paddingTop:60,
        backgroundColor:Colors.white
    },
    infoButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        gap:10,
        marginTop:10,
    }
});

export default UserScreen;