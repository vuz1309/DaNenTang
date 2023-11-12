import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect,useState } from 'react';
import {Colors} from '../utils/Colors';
import Notification from '../components/noti/Notification';

const NotificationScreen = () => {

    const tempNoti = [
{
    type:1,
    object_id:123,
    notification_id:12233,
    created: 12/11/2023,
    avatar:"asdad",
    group:0,
    read:0,
},{
    type:2,
    object_id:1222,
    notification_id:66,
    created: 11/11/2023,
    avatar:"as4d",
    group:0,
    read:1,
},{
    type:3,
    object_id:1243,
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
    avatar:"as4",
    group:0,
    read:1,
}
    ];
    const [notiList,setNotiList]= useState([...tempNoti]);
    return (
        <View style={styles.container}>
            {
                notiList.map((item,key)=>{
                    return <Notification index={key}/>
                })
            }
        </View>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        color: Colors.primaryColor,
        fontWeight: '500',
    },
});

export default NotificationScreen;
