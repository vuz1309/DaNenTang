import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
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
  const [params, setParams] = React.useState({
    index: '0',
    count: '20',
  });
  const [total, setTotal] = React.useState('0');

  const getAllFriendsRequest = async () => {
    try {
      setIsLoadMore(true);
      const {data} = await getAllFriends({...params, user_id: user.id});

      setTotal(data.data.total);
      setFriends(data.data.friends);
    } catch (error) {
      AlertMessage('Vui lòng kiểm tra lại mạng!');
    } finally {
      setIsLoadMore(false);
    }
  };
  const {handleScroll, onRefresh, isLoadMore, refreshing, setIsLoadMore} =
    useScrollHanler(reload, loadMore);
  const reload = () => {
    if (refreshing) return;
    setParams({
      index: '0',
      count: '20',
    });
  };
  const loadMore = () => {
    if (isLoadMore) return;
    setParams({
      index: (Number(params.index) + 1).toString(),
      count: '20',
    });
  };
  React.useEffect(() => {
    getAllFriendsRequest();
  }, [params, user]);

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <HeaderSearch
        title={isOwner ? 'Bạn bè' : user.username}
        onBack={goBack}
      />
      <ScrollView
        onScroll={handleScroll}
        style={styles.container}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
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
          {allFriends.length > 0 && (
            <Text style={styles.titleText}>{total} bạn bè</Text>
          )}
          {/* <TouchableHighlight>
            <Text style={{color: Colors.primaryColor, fontSize: 16}}>
              Sắp xếp
            </Text>
          </TouchableHighlight> */}
        </View>
        {allFriends.length > 0 ? (
          allFriends.map(fr => (
            <FriendCard reload={reload} key={fr.id} fr={fr} />
          ))
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, paddingHorizontal: 16}}>
              Không có bạn bè nào, hãy kết bạn nhé.
            </Text>
          </View>
        )}
        {isLoadMore && <Loading />}
      </ScrollView>
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
