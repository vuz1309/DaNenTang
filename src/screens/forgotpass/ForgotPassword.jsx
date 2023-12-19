import {View, Text, StyleSheet, RefreshControl, FlatList, Pressable} from 'react-native';
import React,{useState} from 'react';
import {Colors} from '../../utils/Colors';

import {useSelector} from 'react-redux';
import {getAllFriends} from '../../api/modules/friends.request';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/base/Loading';
import FriendCard from '../../components/friends/FriendCard';
import HeaderSearch from '../layouts/HeaderSearch';
import {useLoadOnScroll} from '../../hooks/useLoadOnScroll';
import {APP_ROUTE} from '../../navigation/config/routes';
import VectorIcon from '../../utils/VectorIcon';
import { TextInput } from 'react-native-gesture-handler';
import { getVerifyCodeRequest } from '../../api/modules/onboarding';
import NewPassword from './NewPassword';

const ForgotPassword = ({route})=>{

    const {goBack} = useNavigation();
    const [email,setEmail] = useState("");

    const HandleForgotPassword=async ()=>{
        try{
           const res = await getVerifyCodeRequest({email});
           console.log({res})
           const verifyCode = res.data.data.verify_code;
           console.log({verifyCode})
        }catch{

        }
    }

return (<View
style={styles.container}>
    <View>
        <Pressable onPress={goBack}>
        <VectorIcon
            name="questioncircle"
            type="AntDesign"
            size={35}
            color={Colors.black}
          />
            </Pressable>
        <View>
            <Text
            style={{
                fontSize:24,
                fontWeight:700,
                color:Colors.black,
            }}>Tìm tài khoản của bạn</Text>
            <Text
            style={{
                fontSize:15,
                fontWeight:400,
                color:Colors.black,
            }}>Nhập email của bạn.</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.textGrey}
                autoFocus={true}
                value={email}
                onChangeText={value => setEmail(value)}
                style={{
                    marginTop:25,
                  borderWidth: 1,
                  borderColor: Colors.borderGrey,
                  padding: 10,
                  height:50,
                  borderRadius: 12,
                  color: Colors.black,
                  width:'100%',
                }}
              />
              <Pressable style={styles.findButton}
              onPress={HandleForgotPassword}><Text
              style={styles.findTxtBtn}>Tìm tài khoản</Text></Pressable>
        </View>
    <NewPassword/>
    </View>
</View>)
}

const styles = StyleSheet.create({
    container:{
        padding:15,
    },
    findButton:{
        marginTop:30,
        borderWidth:1,
        borderRadius:50,
        alignItems:'center',
        padding:10,
        backgroundColor:Colors.blue,
       
    },
    findTxtBtn:{
        color:Colors.white,
        fontWeight:450,
        fontSize:16,
    }
})

export default ForgotPassword;