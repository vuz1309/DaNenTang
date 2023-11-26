import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect,useState } from 'react';
import {Colors} from '../utils/Colors';
import Notification from '../components/noti/Notification';
import { ScrollView } from 'react-native-gesture-handler';

const NotificationScreen = () => {

    const tempNoti = [
{
    type:1,
    object_id:123,
    notification_id:12233,
    title:"Hoang da them mot anh vao trang ca nhan cua anh ay",
    created: 12/11/2023,
    avatar:"asdad",
    group:0,
    read:0,
},{
    type:2,
    object_id:1222,
    notification_id:66,
    title:"Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay",
    created: 11/11/2023,
    avatar:"as4d",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    notification_id:412233,
    title:"Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay",

    created: 14/11/2023,
    avatar:"as4",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    notification_id:412233,
    title:"Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay",

    created: 14/11/2023,
    avatar:"as4",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    title:"Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay",
    notification_id:412233,
    created: 14/11/2023,
    avatar:"as4",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    notification_id:412233,
    created: 14/11/2023,
    title:"Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay",

    avatar:"as4",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    notification_id:412233,
    title:"Ngo da them mot anh vao trang ca nhan cua anh ay",
    created: 14/11/2023,
    avatar:"as4",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    notification_id:412233,
    title:"Ngo da them mot anh vao trang ca nhan cua anh ay",
    created: 14/11/2023,
    avatar:"as4",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    notification_id:412233,
    title:"Ngo da them mot anh vao trang ca nhan cua anh ay",
    created: 14/11/2023,
    avatar:"as4",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
    notification_id:412233,
    title:"Ngo da them mot anh vao trang ca nhan cua anh ay",
    created: 14/11/2023,
    avatar:"as4",
    group:0,
    read:1,
}
    ];
    const [notiList,setNotiList]= useState([...tempNoti]);
    return (
        <ScrollView>

        <View style={styles.container}>
            <View styles={styles.titleContainer}>
                <Text style={styles.title}>Notifications</Text>
            </View>
            {
                notiList.map((item,key)=>{
                    return <Notification index={key} noti={item} onPress = {()=>HandleReadNoti(item)}/>
                })
            }
        </View>
            </ScrollView>
    );  
};


const HandleReadNoti =(noti)=>{
    const tempNoti = notiList.map((item)=>{
        item.object_id==noti.object_id?{...noti,title:"READED",read:1}:item;
    })
    setNotiList(tempNoti);
    console.log("TEMP");
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        color: Colors.black,
        fontWeight: '900',
        textAlign:'left',
        marginTop:10,
        marginLeft:20,
        marginBottom:40,
    },
    titleContainer:{
        marginBottom:100,
    }
});

export default NotificationScreen;
