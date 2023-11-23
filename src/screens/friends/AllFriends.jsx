import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Pressable,
  Touchable,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Themes} from '../../assets/themes';
import {FacebookRootState} from '../../state-management/redux/store';

import {useSelector} from 'react-redux';
import VectorIcon from '../../utils/VectorIcon';

const AllFriendsScreen = ({navigation}) => {
  const userLogged = useSelector(
    /**
     *
     * @param {FacebookRootState} state
     * @returns
     */
    state => state.userInfo.user,
  );
  //   React.useEffect(() => {}, []);

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={styles.header}>
        <View style={{gap: 12, flexDirection: 'row'}}>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            style={{borderRadius: 48}}
            onPress={() => navigation.goBack()}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={24}
              color={Colors.black}
            />
          </TouchableHighlight>
          <Text style={{fontSize: 16, color: Colors.black}}>Bạn bè</Text>
        </View>
        <TouchableHighlight>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
        </TouchableHighlight>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 12,
            marginTop: 12,
          }}>
          <Text style={styles.titleText}>263 bạn bè</Text>
          <TouchableHighlight>
            <Text style={{color: Colors.primaryColor, fontSize: 16}}>
              Sắp xếp
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{paddingBottom: 12}}>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            onPress={() => console.log('press')}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 8,
                }}>
                <View style={{height: 50, width: 50}}>
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 25,
                      borderColor: Colors.borderGrey,
                      borderWidth: 1,
                      borderStyle: 'solid',
                    }}
                    source={require('../../assets/images/avatar_null.jpg')}
                    defaultSource={require('../../assets/images/avatar_null.jpg')}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 20,
                      color: Colors.black,
                    }}>
                    Nguyễn Xuân Thành
                  </Text>
                  <Text style={{color: Colors.grey}}>30 bạn chung</Text>
                </View>
              </View>
              <Pressable onPress={() => console.log('pres')}>
                <VectorIcon
                  name="more-horizontal"
                  type="Feather"
                  size={24}
                  color={Colors.grey}
                />
              </Pressable>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomColor: Colors.borderGrey,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.black,
  },
});

export default AllFriendsScreen;
