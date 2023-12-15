import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {FacebookRootState} from '../../state-management/redux/store';

import {useSelector} from 'react-redux';
import VectorIcon from '../../utils/VectorIcon';
import AlertMessage from '../../components/base/AlertMessage';
import {getAllFriends} from '../../api/modules/friends.request';
import {useScrollHanler} from '../../hooks/useScrollHandler';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import Loading from '../../components/base/Loading';
import FriendCard from '../../components/friends/FriendCard';
import HeaderSearch from '../layouts/HeaderSearch';
import {useLoadOnScroll} from '../../hooks/useLoadOnScroll';

const AllFriendsScreen = ({route}) => {
  const {goBack} = useNavigation();
  const {user} = route.params;
  const userLogged = useSelector(
    /**
     *
     * @param {FacebookRootState} state
     * @returns
     */
    state => state.userInfo.user,
  );
  const isOwner = React.useMemo(
    () => user.id === userLogged.id,
    [user, userLogged],
  );

  const [allFriends, setFriends] = React.useState([]);

  const [total, setTotal] = React.useState('0');
  const {
    handleScroll,

    reload,
    getNewItems,
    params,
    refreshing,
    isLoadMore,
  } = useLoadOnScroll(getAllFriendsRequest, [user?.id]);

  async function getAllFriendsRequest() {
    try {
      const {data} = await getAllFriends({...params, user_id: user.id});

      setTotal(data.data.total);

      if (params.index == '0') setFriends(data.data.friends);
      else {
        const newItems = getNewItems(data.data.friends, allFriends);

        setFriends(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.log('All friend:', error);
    }
  }

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <HeaderSearch
        title={isOwner ? 'Bạn bè' : user.username}
        onBack={goBack}
      />

      <FlatList
        data={allFriends}
        onScroll={handleScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12,
              marginTop: 12,
            }}>
            {allFriends.length > 0 && (
              <Text style={styles.titleText}>{total} bạn bè</Text>
            )}
          </View>
        }
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => (
          <FriendCard reload={reload} key={item.id} fr={item} />
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
    padding: 4,
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
