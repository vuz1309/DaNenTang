import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderSearch from '../../screens/layouts/HeaderSearch';
import AlertMessage from '../../components/base/AlertMessage';
import {Colors} from '../../utils/Colors';
import Loading from '../../components/base/Loading';
import {ToastAndroid} from 'react-native';
import VectorIcon from '../../utils/VectorIcon';
import DialogConfirm from '../base/dialog/DialogConfirm';
import { copyToClipboard } from '../../utils/helper';
import { setBlockRequest } from '../../api/modules/block.request';
import { APP_ROUTE } from '../../navigation/config/routes';
const ProfileSetting = ({route}) => {
  const {goBack} = useNavigation();
  const {navigate}= useNavigation();
  // const userLogged = useSelector(
  //   /**
  //    *
  //    * @param {FacebookRootState} state
  //    * @returns
  //    */
  //   state => state.userInfo.user,
  // );

  useEffect(()=>{

    SetLink(route.params.user.link)
  })

  const [showBlocKModal,SetShowBlockModal]=useState(false);
  const [link,SetLink]= useState("https://facebook.com")
  const CloseCf=()=>{
    SetShowBlockModal(false);
  };
  const GoToSearch = ()=>{
    navigate(APP_ROUTE.SEARCH,{userId:route.params.user.id});
  }
  const Block = async () => {
    try {
    console.log({user_id:route.params.user.id})
        const data = await setBlockRequest({user_id:route.params.user.id})
      ToastAndroid.show('Chặn '+`${route.params.user.username}`+' thành công', ToastAndroid.SHORT);
      navigate(APP_ROUTE.HOME_TAB);
    } catch (err) {
      AlertMessage('Có lỗi xảy ra');
      console.log({err});
    }finally{
    SetShowBlockModal(false);
    }

  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
        <View style={{backgroundColor:Colors.white}}>

      <HeaderSearch title={'Cài đặt trang cá nhân'} onBack={goBack} haveSearch={false}/>
        </View>

        <View style={styles.list}>

            <Pressable style={styles.option}>
            <VectorIcon
                name="warning"
                type="AntDesign"
                size={35}
                color={Colors.black}
                />
            <Text style={styles.textOption}>Báo cáo trang cá nhân</Text>
            </Pressable>
{console.log({name:route.params.user.userName})}
            <Pressable style={styles.option}>
            <VectorIcon
                name="hearto"
                type="AntDesign"
                size={35}
                color={Colors.black}
                />
            <Text style={styles.textOption}>Giúp đỡ {route.params.user.username}</Text>
            </Pressable>
            <Pressable style={styles.option}
            onPress={()=>SetShowBlockModal(true)}
            >
            <VectorIcon
                name="deleteuser"
                type="AntDesign"
                size={35}
                color={Colors.black}
                />
            <Text style={styles.textOption}>Chặn</Text>
            </Pressable>
            <Pressable style={styles.option}
            onPress={GoToSearch}>
            <VectorIcon
                name="search1"
                type="AntDesign"
                size={35}
                color={Colors.black}
                />
            <Text style={styles.textOption}>Tìm kiếm</Text>
            </Pressable>
            <Pressable style={styles.option}>
            <VectorIcon
                name="adduser"
                type="AntDesign"
                size={35}
                color={Colors.black}
                />
            <Text style={styles.textOption}>Mời bạn</Text>
            </Pressable>
        </View>

        <View style={{backgroundColor:Colors.white,paddingLeft:5}}>
            <View>
                <Text
                style={{
                    color:Colors.black,
                    fontSize:25,
                    fontWeight:600
                }}>Liên kết đến trang cá nhân của {route.params.user.username}</Text>

                <Text
                style={{
                    color:Colors.darkBackground,
                    fontSize:15,
                    borderBottomColor:Colors.borderGrey,
                    borderBottomWidth:1,
                }}>Liên kết riêng của {route.params.user.username} trên facebook</Text>

                <Text
                style={{
                    color:Colors.darkBackground,
                    fontSize:15,
                    padding:5,
                    fontWeight:600,
                }}>{link}</Text>
                <Pressable style={styles.copyBtn}
                    onPress={()=>copyToClipboard(link)}
                >
                    <Text
                    style={{
                        color:Colors.darkBackground,
                        fontWeight:500,
                    }}>SAO CHÉP LIÊN KẾT</Text>
                </Pressable>
            </View>
        </View>
        <View style={{position:"absolute"}}>

    <DialogConfirm
        mainBtn={{text: 'Chặn', onPress: Block}}
       
        closeBtn={{
          text: 'Hủy',
          onPress: CloseCf,
        }}
        isVisible={showBlocKModal}
        title={'Xác nhận chặn '+`${route.params.user.username}`+'?'}
        content={'Bạn có chắc chắn muốn chặn người dùng này không.'}
        />
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    borderBottomColor: Colors.borderGrey,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  list:{
    backgroundColor:Colors.white,
    marginTop:10,
    marginBottom:20,
  },
  option:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:Colors.borderGrey,
    paddingLeft:5,
  },
  textOption:{
    textAlign:'right',
    paddingTop:15,
    paddingBottom:10,
    paddingLeft:20,
    height:'100%',
    color:Colors.black
  },
  titleText: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.black,
  },
  copyBtn:{
    borderWidth:1,
    borderRadius:20,
    alignSelf:'flex-start'  ,
    padding:5,
    marginBottom:10,

  }
});

export default ProfileSetting;
