import {Image,StyleSheet, Text, View,Pressable,Animated} from 'react-native';
import React, {useEffect, useState,useRef} from 'react';
import {Colors} from '../../utils/Colors';
import tempImage from '../../assets/images/img1.jpeg';
import VectorIcon from '../../utils/VectorIcon';

const NotificationAddition = ({noti,DeleteNotification,CloseAddition})=>{

    const animatedValueOfTopOffset = useRef(new Animated.Value(700)).current;
    const animatedValueOfOpacity= useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.timing(animatedValueOfTopOffset,{
            toValue:400,
            duration:100,
            useNativeDriver:false,
        }).start();
    },[animatedValueOfTopOffset])
    useEffect(()=>{
        Animated.timing(animatedValueOfOpacity,{
            toValue:0.3,
            duration:100,
            useNativeDriver:false,
        }).start();
    },[animatedValueOfOpacity])
    return (
        
        <View style = {styles.container}>
            <Animated.View style={[styles.background,{opacity:animatedValueOfOpacity}]}>
                <Pressable onPress ={CloseAddition} style={{width:'100%',height:'100%'}}  ></Pressable>
            </Animated.View>
        <Animated.View style ={[styles.main,{top:animatedValueOfTopOffset}]}>
                <VectorIcon style={styles.pullIcon}
                name="horizontal-rule"
                type="Octicons"
                size={40}
               />

                <Image source ={tempImage} style={styles.image}></Image>
                <Text style={styles.title}>{noti.title}</Text>
                <Pressable style={styles.option} onPress={DeleteNotification}>
                    <VectorIcon
                     name="clipboard-remove"
                     type="MaterialCommunityIcons"
                     size={25}
                     color={Colors.black}
                     style={styles.icon}/>
                    <Text style={styles.text}>Remove this notification</Text>
                </Pressable>
                <Pressable style={styles.option}>
                <VectorIcon
                     name="bell-remove"
                     type="MaterialCommunityIcons"
                     size={25}
                     color={Colors.black}
                     style={styles.icon}/>
                    <Text style={styles.text}>Turn offf notifications about this post</Text>
                </Pressable>
                <Pressable style={styles.option}>
                <VectorIcon
                     name="bell-remove"
                     type="MaterialCommunityIcons"
                     size={25}
                     color={Colors.black}
                     style={styles.icon}/>
                    <Text style={styles.text}>Report issue to Notifications Team</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        width:'100%',
        height:'100%',
    },  
    title:{
        margin:5,
        textAlign:'center',
    },
    pullIcon:{
        margin:-10,
        opacity:0.6,
    },
    icon:{
        width:35,
        height:35,
        padding:4,
        backgroundColor:"#bbb",
        borderRadius:50,
    },
    text:{
        padding:5,
        paddingLeft:15,
        textAlign:'left',
        fontSize:18,
        fontWeight:600,
        color:"#111",
    },
    option:{
        flexDirection:'row',
        width:'100%',
        margin:10,
    },
    main:{
        position:'absolute',
        alignItems:'center',
        //top:'60%',
        width:'100%',
        height:'100%',
        backgroundColor:'#FFFFFF',
        borderRadius:20,
        paddingLeft:10,
        paddingRight:10,
    },
    image:{
        height: 60,
        width: 60,
        borderRadius: 50,
    },
    background:{
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor:'#000000',
       // opacity:0.3,
    }
})

export default NotificationAddition;