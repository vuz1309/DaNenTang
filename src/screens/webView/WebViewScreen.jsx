import React from 'react';
import {WebView} from 'react-native-webview';
import {View, Text, TouchableHighlight} from 'react-native';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';

const WebViewScreen = ({navigation, route}) => {
  const {url} = route.params;
  console.log(url);
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
      <WebView source={{uri: url}} style={{flex: 1}} />
    </View>
  );
};

export default WebViewScreen;
