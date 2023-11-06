import {StyledButton, StyledText} from "../../components/base";
import {Colors} from "../../utils/Colors"
import {StyleSheet, TextInput, View,} from 'react-native';
import React, {useState} from 'react';
import VectorIcon from "../../utils/VectorIcon";
import {AUTHENTICATE_ROUTE, ONBOARDING_ROUTE} from "../../navigation/config/routes";
import {logger} from "../../utils/helper";
import {getStringAsyncData, storeStringAsyncData} from "../../utils/authenticate/LocalStorage";


const InputEmail = ({navigation}) => {
    const [email, setEmail] = useState('')

    const onPress = async () => {
        await storeStringAsyncData('email', email);
        const emailStr = await getStringAsyncData('email');
        logger(emailStr);
        navigation.navigate(ONBOARDING_ROUTE.CREATE_PASSWORD);
    }
    return (
        <View style={styles.container}>
            <VectorIcon
                name="arrow-back"
                type="Ionicons"
                color={Colors.black}
                size={20}
                onPress={() => navigation.navigate(ONBOARDING_ROUTE.INPUT_BIRTH_DATE)}
            />
            <View
                style={{
                    marginTop: '5%',
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <View style={[styles.subContainer]}>
                <StyledText
                    content="Nhập địa chỉ email của bạn"
                    customStyle={[styles.biggerText]}
                />
                <View style={styles.wrapperTextInput}>
                    <TextInput
                        value={email}
                        placeholder="Email"
                        style={styles.textInput}
                        onChangeText={value => setEmail(value)}></TextInput>
                    
                </View>
                <StyledButton
                    title="Tiếp"
                    customStyle={[styles.nextButton]}
                    onPress={onPress}
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
            marginTop: '10%',
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
            width: '90%',
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
        biggerText: {
            color: Colors.black,
            fontSize: 18,
            fontFamily: "Arial",
            textAlign: "center",
            fontWeight: "bold",
            width: '60%',
            marginTop: '10%'
        },
    }
)

export default InputEmail;