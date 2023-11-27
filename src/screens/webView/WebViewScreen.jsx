import React from 'react';
import {WebView} from 'react-native-webview';
import {View, Text, TouchableHighlight, Linking} from 'react-native';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';

const WebViewScreen = ({navigation, route}) => {
  const {url} = route.params;
  const isAppLink = link => {
    // Thay đổi logic kiểm tra tùy thuộc vào các mẫu URL của ứng dụng cụ thể
    // Ví dụ: Kiểm tra nếu URL chứa 'myapp://'
    return link.includes('myapp://');
  };

  const openApp = link => {
    // Mở ứng dụng với Linking
    Linking.openURL(link);
  };

  const handleWebViewNavigationStateChange = newNavState => {
    const {url: newUrl} = newNavState;

    // Kiểm tra xem URL mới có phải là liên kết đến ứng dụng không
    if (isAppLink(newUrl)) {
      openApp(newUrl);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.borderGrey,
          borderStyle: 'solid',
          borderBottomWidth: 1,
          paddingVertical: 4,
        }}>
        <TouchableHighlight
          underlayColor={Colors.lightgrey}
          onPress={() => navigation.goBack()}
          style={{padding: 8, borderRadius: 20}}>
          <VectorIcon
            name="close"
            type="AntDesign"
            size={28}
            color={Colors.black}
          />
        </TouchableHighlight>
        <View
          style={{
            flex: 1,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{url}</Text>
        </View>
        <View style={{padding: 8}}>
          <VectorIcon
            name="more-horizontal"
            type="Feather"
            size={28}
            color={Colors.black}
          />
        </View>
      </View>
      <WebView
        onNavigationStateChange={handleWebViewNavigationStateChange}
        source={{uri: url}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default WebViewScreen;
