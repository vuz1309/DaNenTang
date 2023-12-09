import {StyleSheet, Text, View, RefreshControl, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {Colors} from "../../utils/Colors";
import React from "react";
import {set} from "lodash";
import VectorIcon from "../../utils/VectorIcon";
import {StyledButton} from "../../components/base";
import {useSelector} from "react-redux";
import {formatNumberSplitBy} from "../../helpers/helpers";
import {buyCoin} from "../../api/modules/userProfile.request";
import {store} from "../../state-management/redux/store";
import UserInfoSlice, {userInfoActions} from "../../state-management/redux/slices/UserInfoSlice";
import AlertMessage from "../../components/base/AlertMessage";


const BuyCoins = ({closeModal}) => {
    const [coin, setCoin]= React.useState(0);
    const [code, setCode]= React.useState("");
    const regex =  /^[0-9]\d*$/;
    const [loading, setLoading] = React.useState(false);
    const userLogged = useSelector(state => state.userInfo.user);
    const crrCoins = React.useMemo(
        () => formatNumberSplitBy(Number(userLogged?.coins || '0')),
        [userLogged, [userLogged?.coins]],
    );
    const onBuyCoin= async ()=> {
        try{
            if(coin >0 && code !== '') {
                setLoading(true);
                const data = {
                    code: code,
                    coins: coin
                }
                const rq = await buyCoin(data);
                store.dispatch(userInfoActions.updateCoin(rq.data.data.coins))
                setCoin(0);
                setCode('');
                setLoading(false);
            }
            else{
                AlertMessage('Vui lòng nhập đầy đủ thông tin');
            }
        }catch (err){
            console.log(err)
        }
    }

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                    <VectorIcon
                        name="close"
                        type="AntDesign"
                        size={22}
                        color={Colors.grey}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Mua thêm coin</Text>
                <View style={styles.input}>
                    <VectorIcon
                        name="coins"
                        type="FontAwesome5"
                        size={22}
                        color={'gold'}
                    />
                    <TextInput
                        placeholderTextColor={Colors.grey}
                        value={crrCoins}
                        readonly
                    />
                </View>
                <View style={styles.input}>
                    <Text>Số coin: {" "}</Text>
                    <TextInput
                        placeholderTextColor={Colors.grey}
                        value={coin}
                        keyboardType={"numeric"}
                        style={styles.inputBox}
                        onChangeText={value => {
                            setCoin(value)
                        }}
                    />
                </View>
                <View style={styles.input}>
                    <Text>Mã Code: {" "}</Text>
                    <TextInput
                        placeholderTextColor={Colors.grey}
                        value={code}
                        style={styles.inputBox}
                        onChangeText={value => setCode(value)}
                    />
                </View>
                <StyledButton
                    onPress={()=>onBuyCoin()}
                    title={'Gửi yêu cầu '}
                    customStyle={{
                        backgroundColor:Colors.primaryColor
                    }}
                    isLoading={loading}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position:'relative'
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center',
        color: Colors.textColor,
    },
    closeIcon:{
        position:'absolute',
        top:10,
        right:10
    },
    input:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        paddingVertical:10,
    },
    inputBox: {
        borderColor: Colors.lightgray,
        borderWidth:1,
        padding: 10,
        flex:1,
        borderRadius: 12,
        color: Colors.grey,
    },
});

export default BuyCoins;
