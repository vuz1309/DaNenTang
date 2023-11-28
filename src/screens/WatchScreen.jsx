import {StyleSheet, Text, View, RefreshControl, ScrollView} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {useScrollHanler} from '../hooks/useScrollHandler';
import {getListVideos} from '../api/modules/post';
import {useSelector} from 'react-redux';
import PostVideo from '../components/posts/PostVideo';
import PostHeader from '../components/posts/PostHeader';
import PostFooter from '../components/posts/PostFooter';

const WatchScreen = () => {
  const userLogged = useSelector(state => state.userInfo.user);
  const [posts, setPosts] = React.useState([]);
  const [lastId, setLastId] = React.useState('1');
  const reload = () => {
    if (refreshing) return;
    setRefreshing(true);
    setParams({
      in_campaign: '1',
      campaign_id: '1',
      latitude: '1.0',
      longitude: '1.0',
      last_id: '1',
      index: '0',
      count: '10',
    });
    setLastId('1');
  };
  const loadMore = () => {
    if (isLoadMore) return;
    setIsLoadMore(true);
    setParams(prev => ({
      ...prev,
      index: (Number(prev.index) + 1).toString(),
    }));
  };
  const [params, setParams] = React.useState({
    in_campaign: '1',
    campaign_id: '1',
    latitude: '1.0',
    longitude: '1.0',
    last_id: '6',
    index: '0',
    count: '10',
  });
  const getListVideosApi = async () => {
    try {
      const {data} = await getListVideos({
        ...params,
        user_id: userLogged.id,
        last_id: lastId,
      });

      if (JSON.parse(data.data.last_id)) {
        console.log('undif');
        setLastId(data.data.last_id);
      }
      if (params.index == '0') setPosts(data.data.post);
      else {
        const newItems = data.data.post.filter(
          p => !posts.find(op => op.id === p.id),
        );
        setPosts(prev => [...prev, ...newItems]);
      }
      console.log(data.data.post);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadMore(false);
      setRefreshing(false);
    }
  };
  React.useEffect(() => {
    getListVideosApi();
  }, [params]);
  const {refreshing, handleScroll, setRefreshing, isLoadMore, setIsLoadMore} =
    useScrollHanler(reload, loadMore);
  return (
    <ScrollView
      style={styles.container}
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
      {posts.map(po => (
        <View
          style={{backgroundColor: Colors.white, marginBottom: 12}}
          key={po.id}>
          <PostHeader data={po} />

          <PostVideo videoUrl={po.video.url} />

          <PostFooter data={po} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: '500',
  },
});

export default WatchScreen;
