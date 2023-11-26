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
import AddFriendRequest from '../../components/friends/AddFriendRequest';
import {
  getSuggestionFriend,
  setRequestFriend,
} from '../../api/modules/friends.request';
import AlertMessage from '../../components/base/AlertMessage';

const SuggestionScreen = ({navigation}) => {
  const userLogged = useSelector(
    /**
     *
     * @param {FacebookRootState} state
     * @returns
     */
    state => state.userInfo.user,
  );
  const [allSuggestions, setSuggestions] = React.useState([]);
  const [params, setParams] = React.useState({
    index: '0',
    count: '20',
  });

  const getAll = async () => {
    try {
      const {data} = await getSuggestionFriend(params);
      setSuggestions(data.data);
      console.log(data);
    } catch (error) {
      AlertMessage('Vui lòng kiểm tra lại mạng!');
    }
  };
  const setRequestApi = async user_id => {
    try {
      const {data} = await setRequestFriend({user_id});
      console.log(data);
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.status !== 400) AlertMessage('Vui lòng kiểm tra lại mạng!');
    }
  };
  React.useEffect(() => {
    getAll();
  }, []);

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
          <Text style={{fontSize: 16, color: Colors.black}}>Gợi ý</Text>
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
          <Text style={styles.titleText}>Những người bạn có thể biết</Text>
        </View>
        <View style={{paddingBottom: 12}}>
          {allSuggestions.map(user => (
            <AddFriendRequest
              key={user.id}
              mainText="Thêm bạn bè"
              subText="Gỡ"
              onClickMain={() => setRequestApi(user.id)}
              onClickSub={() => {}}
              data={user}
              textOnReject="Đã gỡ gợi ý"
              textOnAccept="Đã gửi yêu cầu"
            />
          ))}
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

export default SuggestionScreen;
