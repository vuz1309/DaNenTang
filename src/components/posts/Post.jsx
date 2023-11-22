import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {PostData} from '../../data/PostData';
import PostBody from './PostBody';
import {getListPost} from '../../api/modules/post';
import {useSelector} from 'react-redux';

const Post = () => {
  const [listPost, setListPost] = React.useState([]);
  const userLogged = useSelector(state => state.userInfo.user);
  const [params, setParams] = React.useState({
    user_id: '',
    in_campaign: '1',
    campaign_id: '1',
    latitude: '1.0',
    longitude: '1.0',
    last_id: '6',
    index: '0',
    count: '20',
  });
  const getListPostsApi = async () => {
    params.user_id = userLogged.id;
    try {
      const {data} = await getListPost();
      setParams(prev => ({
        ...prev,
        last_id: data.data.last_id,
      }));

      setListPost(data.data.post);
      console.log(listPost);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  React.useEffect(() => {
    getListPostsApi();
  }, []);

  return (
    <View style={styles.postContainer}>
      {listPost.map(item => (
        <PostBody key={item.id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.background,
    marginTop: 8,
  },
});

export default Post;
