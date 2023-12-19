import {View, Text, StyleSheet, RefreshControl, FlatList} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

import AddFriendRequest from '../../components/friends/AddFriendRequest';
import {
  getSuggestionFriend,
  searchUsersRequest,
  setRequestFriend,
} from '../../api/modules/friends.request';
import Loading from '../../components/base/Loading';
import HeaderSearch from '../layouts/HeaderSearch';
import {useLoadOnScroll} from '../../hooks/useLoadOnScroll';
import {TextInput} from 'react-native-gesture-handler';

const SuggestionScreen = ({navigation}) => {
  const [allSuggestions, setSuggestions] = React.useState([]);

  const {
    getNewItems,
    handleScroll,

    params,
    reload,
    refreshing,
    isLoadMore,
    searchText,
    setSearchText,
    handleSubmitSearch,
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
      const {data} = await searchUsersRequest({
        ...params,
        keyword: searchText || ' ',
      });

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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
          paddingBottom: 8,
        }}>
        <TextInput
          value={searchText}
          onChangeText={text => setSearchText(text)}
          style={styles.searchInput}
          placeholderTextColor={Colors.textGrey}
          placeholder={'Tìm kiếm bạn bè'}
          onSubmitEditing={handleSubmitSearch}
        />
      </View>
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
  searchInput: {
    backgroundColor: Colors.lightgrey,
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 14,
    width: '90%',
    color: Colors.black,
    alignItems: 'center',
    height: 40,
  },
});

export default SuggestionScreen;
