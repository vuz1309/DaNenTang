import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

import VectorIcon from '../../utils/VectorIcon';
import AddFriendRequest from '../../components/friends/AddFriendRequest';
import {
  getSuggestionFriend,
  setRequestFriend,
} from '../../api/modules/friends.request';
import AlertMessage from '../../components/base/AlertMessage';
import {useScrollHanler} from '../../hooks/useScrollHandler';
import Loading from '../../components/base/Loading';
import HeaderSearch from '../layouts/HeaderSearch';

const SuggestionScreen = ({navigation}) => {
  const [allSuggestions, setSuggestions] = React.useState([]);
  const [params, setParams] = React.useState({
    index: '0',
    count: '20',
  });

  const getAll = async () => {
    try {
      const {data} = await getSuggestionFriend(params);
      if (params.index == '0') setSuggestions(data.data);
      else {
        const newItems = data.data.filter(
          it => !allSuggestions.find(sugg => sugg.id == it.id),
        );
        setSuggestions(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadMore(false);
    }
  };
  const setRequestApi = async user_id => {
    try {
      const {data} = await setRequestFriend({user_id});
      console.log(data);
    } catch (error) {
      console.log('request: ', error);
    }
  };

  const reload = () => {
    if (refreshing) return;
    setParams({
      index: '0',
      count: '20',
    });
  };
  const loadMore = () => {
    if (isLoadMore) return;
    setIsLoadMore(true);
    setParams(prev => ({
      count: '20',
      index: (Number(prev.index) + 1).toString(),
    }));
  };

  const {handleScroll, isLoadMore, setIsLoadMore, refreshing} = useScrollHanler(
    reload,
    loadMore,
  );
  React.useEffect(() => {
    getAll();
  }, [params]);

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <HeaderSearch title={'Gợi ý'} onBack={navigation.goBack} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={reload}
          />
        }>
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
        {isLoadMore && <Loading color={Colors.primaryColor} />}
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
