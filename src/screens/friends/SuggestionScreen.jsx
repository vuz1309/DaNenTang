import {View, Text, StyleSheet, RefreshControl, FlatList} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

import AddFriendRequest from '../../components/friends/AddFriendRequest';
import {
  getSuggestionFriend,
  setRequestFriend,
} from '../../api/modules/friends.request';
import Loading from '../../components/base/Loading';
import HeaderSearch from '../layouts/HeaderSearch';
import {useLoadOnScroll} from '../../hooks/useLoadOnScroll';

const SuggestionScreen = ({navigation}) => {
  const [allSuggestions, setSuggestions] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const {
    getNewItems,
    handleScroll,

    params,
    reload,
    refreshing,
    isLoadMore,
  } = useLoadOnScroll(getAll, [searchText]);

  const setRequestApi = async user_id => {
    try {
      setRequestFriend({user_id});
    } catch (error) {
      console.log('request: ', error);
    }
  };
  async function getAll() {
    try {
      const {data} = await getSuggestionFriend(params);

      if (params.index == '0') setSuggestions(data.data);
      else {
        const newItems = getNewItems(data.data, allSuggestions);

        setSuggestions(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <HeaderSearch title={'Gợi ý'} onBack={navigation.goBack} />

      <FlatList
        data={allSuggestions}
        ListHeaderComponent={
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
        }
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => (
          <AddFriendRequest
            key={item.id}
            mainText="Thêm bạn bè"
            subText="Gỡ"
            onClickMain={() => setRequestApi(item.id)}
            onClickSub={() => {}}
            data={item}
            textOnReject="Đã gỡ gợi ý"
            textOnAccept="Đã gửi yêu cầu"
          />
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={reload}
          />
        }
        // onEndReached={loadMore}
        onScroll={handleScroll}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
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
