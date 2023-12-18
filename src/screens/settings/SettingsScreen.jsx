import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import HeaderSearch from '../layouts/HeaderSearch';

import {userInfoActions} from '../../state-management/redux/slices/UserInfoSlice';
import {StyledButton} from '../../components/base';
import {setPushSettingsRequest} from '../../api/modules/pushnoti';
import {store} from '../../state-management/redux/store';

const settingsConfig = {
  birthday: 'Sinh nhật',
  from_friends: 'Bài viết bạn bè',
  led_on: 'Đèn báo',
  like_comment: 'Thích và bình luận',
  notification_on: 'Thông báo đẩy',
  report: 'Báo cáo',
  requested_friend: 'Lời mời kết bạn',
  sound_on: 'Âm thanh',
  suggested_friend: 'Gợi ý kết bạn',
  vibrant_on: 'Vibrant on',
  video: 'Video bạn bè',
};

const SettingsScreen = ({navigation}) => {
  const settings = useSelector(state => state.userInfo.pushSettings);
  const [isLoading, setIsLoading] = React.useState(false);
  const [settingConfig, setSettingConfig] = React.useState(settings);
  const toggleValue = key => {
    setSettingConfig(prev => ({
      ...prev,
      [key]: !Number(prev[key]),
    }));
  };

  const handleSaveSetting = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await setPushSettingsRequest(settingConfig);
      store.dispatch(userInfoActions.savePushSettings(settingConfig));
      ToastAndroid.show('Cập nhật thông báo thành công', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.log('error update settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <HeaderSearch title={'Cài đặt'} onBack={navigation.goBack} />
      <ScrollView style={{flex: 1}}>
        {Object.keys(settingConfig).map(key => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
              paddingHorizontal: 24,
            }}>
            <Text
              style={{
                color: Colors.textColor,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {settingsConfig[key]}
            </Text>
            <Switch
              trackColor={{false: Colors.lightgrey, true: Colors.lightgrey}}
              thumbColor={
                !!Number(settingConfig[key])
                  ? Colors.primaryColor
                  : Colors.white
              }
              ios_backgroundColor={Colors.lightgrey}
              onValueChange={() => toggleValue(key)}
              value={!!Number(settingConfig[key])}
              style={{transform: [{scale: 1.1}]}}
            />
          </View>
        ))}

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <StyledButton
            title="Lưu"
            onPress={handleSaveSetting}
            isLoading={isLoading}
            customStyle={styles.loginButton}
            customStyleText={styles.login}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 16,
    width: '95%',
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default SettingsScreen;
