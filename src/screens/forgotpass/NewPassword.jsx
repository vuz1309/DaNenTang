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
import { resetPassword } from '../../api/modules/authenticate';
import AlertMessage from '../../components/base/AlertMessage';
import DialogConfirm from '../../components/base/dialog/DialogConfirm';
const NewPassword = ({Return,RequestNewPass})=>{


    const validateInput = () => {
        return (
          pass !== '' && confirmPass !== '' &&  pass === confirmPass
        );
      };

      const SendNewPassword = async () => {
        try {
          if (validateInput()) {
            setLoading(true);
            const data = await RequestNewPass(pass);
              ToastAndroid.show('Đổi mật khẩu thành công!', ToastAndroid.SHORT);
            
          } else {
            AlertMessage('Vui lòng điền chính xác thông tin');
          }
        } catch (err) {
          console.log(err);
          AlertMessage(err.msg);
        }finally{
          setLoading(false);
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
    const [toggleCf,SetToggleCf]=useState(false);
    const HandleForgotPassword=async ()=>{
        try{
           const res = await getVerifyCodeRequest({email});
           console.log({res})
           const verifyCode = res.data.data.verify_code;
           SetCode(verifyCode);
        }catch{

        }
    }
    const CloseCf=()=>{
      SetToggleCf(false);
    }
return (<View
style={styles.container}>
    <View>
        <Pressable onPress={Return}>
        <VectorIcon
            name="arrowleft"
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
              onPress={()=>SetToggleCf(true)}><Text
              style={styles.findTxtBtn}>Xác nhận</Text></Pressable>
        </View>
   
    </View>
    {loading?<Loading/>:null}
    <View style={{position:"absolute"}}>

    <DialogConfirm
        mainBtn={{text: 'Xác nhận', onPress: SendNewPassword}}
       
        closeBtn={{
          text: 'Hủy',
          onPress: CloseCf,
        }}
        isVisible={toggleCf}
        title={'Xác nhận thay đổi mật khẩu?'}
        content={'Bạn có chắc chắn muốn đổi mật khẩu không.'}
        />
        </View>
</View>)
}

const styles = StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:Colors.white,
    },
    findButton:{
        marginTop:30,
        borderWidth:1,
        borderRadius:50,
        alignItems:'center',
        padding:10,
        backgroundColor: Colors.primaryColor,

       
    },
    findTxtBtn:{
        color:Colors.white,
        fontWeight:450,
        fontSize:16,
    }
})

export default NewPassword;