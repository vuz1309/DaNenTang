import {View, FlatList} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {getListVideos} from '../api/modules/post.request';

import PostVideo from '../components/posts/PostVideo';
import PostHeader from '../components/posts/PostHeader';
import PostFooter from '../components/posts/PostFooter';

import Loading from '../components/base/Loading';
import {useLoadOnScroll} from '../hooks/useLoadOnScroll';
import HeaderCenter from '../components/base/headers/HeaderCenter';

const VideoItem = React.memo(({item, isViewable}) => (
  <View style={{backgroundColor: Colors.grey, marginBottom: 12}}>
    <PostHeader
      textStyles={{color: Colors.white}}
      data={item}
      isShowRemove={false}
    />
    <PostVideo videoUrl={item.video.url} autoPlay={isViewable} />
    <PostFooter textStyles={{color: Colors.white}} data={item} />
  </View>
));

const WatchNightScreen = ({navigation, route}) => {
  const {post} = route.params;

  const [posts, setPosts] = React.useState([post]);
  const [lastId, setLastId] = React.useState('19999');

  const {params, isLoadMore, handleScroll, getNewItems} =
    useLoadOnScroll(getListVideosApi);

  async function getListVideosApi() {
    try {
      const {data} = await getListVideos({
        ...params,
        in_campaign: '1',
        campaign_id: '1',
        latitude: '1.0',
        longitude: '1.0',
        last_id: lastId,
      });

      if (data.data.last_id !== 'undefined') {
        setLastId(data.data.last_id);
      }

      const newItems = getNewItems(data.data.post, posts);

      setPosts([...posts, ...newItems]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.darkBackground}}>
      <HeaderCenter
        bgColor={Colors.greyBold}
        textColor={Colors.white}
        text={'Video khác'}
        goBack={navigation.goBack}
      />
      <FlatList
        data={posts}
        onScroll={handleScroll}
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item, index}) => (
          <VideoItem item={item} isViewable={index === 0} />
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
    </View>
  );
};

export default WatchNightScreen;
