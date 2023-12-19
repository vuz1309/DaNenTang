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

const NewPassword = ({route})=>{


    const validateInput = () => {
        return (
          pass !== '' && confirmPass !== '' &&  newPass === confirmPass
        );
      };

      const SendNewPassword = async () => {
        try {
          if (validateInput()) {
            setLoading(true);
            const {data} = await changePassword({
              password: oldPass,
              new_password: newPass,
            });
            console.log('update password', data);
            if (data.code == SUCCESS_CODE) {
              closeModal();
              store.dispatch(
                userSavedInfoActions.updateUserSaved({
                  password: newPass,
                  id: userLogged.id,
                }),
              );
              ToastAndroid.show('Đổi mật khẩu thành công!', ToastAndroid.SHORT);
            }
          } else {
            AlertMessage('Vui lòng điền chính xác thông tin');
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
          AlertMessage(err.msg);
        }
      };
    const {goBack} = useNavigation();
    const [email,setEmail] = useState("");
  const [loading, setLoading] = React.useState(false);
    const [code,SetCode]=useState(0);
    const [pass,setPass] = useState("");
    const [see,setSee]=useState(false);
    const [see2,setSee2]=useState(false);
    const [confirmPass,setConfirmPass]=useState("");
    const HandleForgotPassword=async ()=>{
        try{
           const res = await getVerifyCodeRequest({email});
           console.log({res})
           const verifyCode = res.data.data.verify_code;
           SetCode(verifyCode);
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
            }}>Nhập mật khẩu mới</Text>
            <View>

            <TextInput
                secureTextEntry={!see}
                placeholder="Mật khẩu mới"
                placeholderTextColor={Colors.textGrey}
                autoFocus={true}
                value={pass}
                onChangeText={value => setPass(value)}
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
            <Pressable 
            onPress={()=>setSee(!see)}
            style={
            {
                position:'absolute',
                width:'100%'
            }
            }>
              <VectorIcon
                name={see?"eye":"eye-with-line"}
                type="Entypo"
                size={22}
                color={Colors.black}

                style={{
                    position:'absolute',
                    marginTop:38,
                    left:'88%'
                }}

                />
                </Pressable>
                </View>
                <View>

              <TextInput
                secureTextEntry={!see2}
                placeholder="Nhập lại mật khẩu mới"
                placeholderTextColor={Colors.textGrey}
                autoFocus={true}
                value={confirmPass}
                onChangeText={value => setConfirmPass(value)}
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
                 <Pressable 
            onPress={()=>setSee2(!see2)}
            style={
            {
                position:'absolute',
                width:'100%'
            }
            }>
              <VectorIcon
                name={see2?"eye":"eye-with-line"}
                type="Entypo"
                size={22}
                color={Colors.black}

                style={{
                    position:'absolute',
                    marginTop:38,
                    left:'88%'
                }}

                />
                </Pressable>
                </View>
              <Pressable style={styles.findButton}
              onPress={HandleForgotPassword}><Text
              style={styles.findTxtBtn}>Tìm tài khoản</Text></Pressable>
        </View>
   
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

export default NewPassword;