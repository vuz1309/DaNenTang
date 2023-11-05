import {StyledButton, StyledText} from "../../components/base";
import {Colors} from "../../utils/Colors"
import {StyleSheet, TextInput, View, Pressable, Platform} from 'react-native';
import React, {useState} from 'react';
import VectorIcon from "../../utils/VectorIcon";
import {AUTHENTICATE_ROUTE, ONBOARDING_ROUTE} from "../../navigation/config/routes";
import {logger} from "../../utils/helper";
import {getStringAsyncData, storeStringAsyncData} from "../../utils/authenticate/LocalStorage";
import DateTimePicker from '@react-native-community/datetimepicker';

const InputBirthDate = ({navigation}) => {
    const [dateOfBirth, setDateOfBirth] = useState("Chọn ngày sinh của bạn");
    const [date, setDate] = useState(new Date());
    const [isVisible, setIsVisible] = useState(false);
    const onPress = async () => {
        await storeStringAsyncData('dateOfBirth', dateOfBirth);
        const dateOfBirthStr = await getStringAsyncData('dateOfBirth');
        logger(dateOfBirthStr);
        navigation.navigate(ONBOARDING_ROUTE.INPUT_EMAIL)

    }
    const toggleDatepicker = () => {
        setIsVisible(!isVisible);
    };
    const onChange = ({type}, selectedDate) => {
        if(type == "set"){
            const currentDate = selectedDate;
            setDate(currentDate);

            if(Platform.OS === "android"){
                toggleDatepicker();
                setDateOfBirth(currentDate.toDateString());
            }
        }else{
            toggleDatepicker();
        }
    }
    const handleCancel = () =>{
        setIsVisible(false);
    }
    return (
        <View style={styles.container}>
            <VectorIcon
                name="arrow-back"
                type="Ionicons"
                color={Colors.black}
                size={20}
                onPress={() => navigation.navigate(ONBOARDING_ROUTE.INPUT_NAME)}
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
                    content="Sinh nhật của bạn khi nào?"
                    customStyle={[styles.biggerText]}
                />
                    
                {!isVisible && (
                    <Pressable
                    onPress = {toggleDatepicker}>
                        <TextInput
                        style = {styles.textInput}
                        placeHolder = "Sun July 14 2002"
                        value = {dateOfBirth}
                        onChangeText = {setDateOfBirth}
                        placeholderTextColor={11182744}
                        editable={false}
                        />
                    </Pressable>
                )}
                

               {isVisible && (
                <DateTimePicker
                mode = "date"
                display = "spinner"
                value = {date}
                onChange = {onChange}
                />
               )}
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
            width: '95%',
            height: 40,
            borderWidth: 0.5,
            borderColor: 'gray',
            paddingHorizontal: 8,
        },
        nextButton: {
            backgroundColor: Colors.primaryColor,
            width: '70%',
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

export default InputBirthDate;