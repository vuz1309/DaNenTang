import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../utils/Colors';
import {UserContext} from '../../App';

const ProfileScreen = () => {
    const {logout} = useContext(UserContext);
    const onLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                <Text style={styles.logout}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        color: Colors.primaryColor,
        fontWeight: '500',
        marginTop: 30,
    },
    logout: {
        fontSize: 15,
        color: Colors.white,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: Colors.primaryColor,
        padding: 12,
        borderRadius: 20,
        width: '90%',
        alignItems: 'center',
        marginBottom: 30,
    },
});

export default ProfileScreen;
