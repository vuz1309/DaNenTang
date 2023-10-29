import { StyledText, StyledButton } from "../../components/base";
import { Colors } from "../../utils/Colors"
import {
    TextInput, StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Button,
  } from 'react-native';
import React, { useContext, useState } from 'react';
import VectorIcon from "../../utils/VectorIcon";
import { AUTHENTICATE_ROUTE } from "../../navigation/config/routes";
import { logger } from "../../utils/helper";
import { userInfoActions } from "../../state-management/redux/slices/UserInfoSlice";
import { storeStringAsyncData, getStringAsyncData } from "../../utils/authenticate/LocalStorage";


const InputName = ({navigation}) => {
    const [familyName, setFamilyName] = useState('')
    const [name, setName] = useState('')

    const onPress = async () => {
        const fullname = familyName + ' ' + name;
        await storeStringAsyncData('fullname', fullname);
        const fullnameStr =  await getStringAsyncData('fullname');
        logger(fullnameStr);
    }
    return (
        <View style = {styles.container}>
            <VectorIcon
                name="arrow-back"
                type="Ionicons"
                color={Colors.black}
                size={20}
                onPress={() => navigation.navigate(AUTHENTICATE_ROUTE.REGISTER)}
            />
             <View
                style={{
                    marginTop : '5%',
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <View style ={[styles.subContainer]}>
                <StyledText 
                content="Bạn tên gì?" 
                customStyle = {[styles.biggerText]}
                />
                <View style =  {styles.wrapperTextInput}>
                    <TextInput 
                    value = {familyName} 
                    placeholder="Họ" 
                    style={styles.textInput}
                    onChangeText={value => setFamilyName(value)}></TextInput>
                    <TextInput 
                    value = {name} 
                    placeholder="Tên" 
                    style={styles.textInput}
                    onChangeText={value => setName(value)}></TextInput>
                </View>
                <StyledButton
                    title="Tiếp"
                    customStyle={[styles.nextButton]}
                    onPress = {onPress}
                />
            </View>
        </View>

    )
}
const styles = StyleSheet.create(
    {   
        container: {
            backgroundColor: Colors.white,
            padding: 16
        },
        wrapperTextInput: {
            marginTop : '10%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        subContainer: {
            backgroundColor: Colors.white,
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textInput: {
            margin: 10,
            width: '45%',
            height: 40,
            borderWidth: 0.5,
            borderColor: 'gray',
            paddingHorizontal: 8,
        },
        nextButton: {
            backgroundColor: Colors.primaryColor,
            width: '95%',
            height: '17%',
            marginTop: '10%',
        },
        biggerText : {
            color: Colors.black,
            fontSize : 18,
            fontFamily: "Arial",
            textAlign: "center",
            fontWeight: "bold",
            width: '60%',
            marginTop : '10%'
        },
    }
)

export default InputName;