const {
  View,
  Image,
  TouchableHighlight,
  Text,
  RefreshControl,
} = require('react-native');
import React from 'react';
const {default: HeaderSearch} = require('../../screens/layouts/HeaderSearch');
import Modal from 'react-native-modal';
import {getListFeels} from '../../api/modules/comment.request';
import {Colors} from '../../utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import {feelConfigs} from '../posts/PostFooter';
import {useLoadOnScroll} from '../../hooks/useLoadOnScroll';
import Loading from '../base/Loading';
import ImageView from '../base/images/ImageView';
const nullAvatar = require('../../assets/images/avatar_null.jpg');
const ListReactions = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const {postId} = route.params;
  const [reactions, setReactions] = React.useState([]);

  const {params, handleScroll, reload, getNewItems, isLoadMore, refreshing} =
    useLoadOnScroll(getFeels);

  async function getFeels() {
    try {
      const {data} = await getListFeels({id: postId, ...params});
      if (params.index == 0) {
        setReactions(data.data);
      } else if (data.data.length > 0) {
        const newItems = getNewItems(data.data, reactions);
        setReactions([...reactions, ...newItems]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1}}>
      <HeaderSearch onBack={goBack} title="Người đã bày tỏ cảm xúc" />
      <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reload}
            colors={[Colors.primaryColor]}
          />
        }>
        {reactions.map(fe => (
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            style={{
              flexDirection: 'row',
              gap: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              alignItems: 'center',
              position: 'relative',
            }}
            onPress={() =>
              navigate(APP_ROUTE.USER_SCREEN, {userId: fe.feel.user.id})
            }
            key={fe.id}>
            <>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <ImageView uri={fe.feel.user.avatar} />
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.black,
                  fontSize: 18,
                  alignItems: 'center',
                }}>
                {fe.feel.user.name}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  bottom: 4,
                  left: 40,
                  zIndex: 10,
                  display: Number(fe.feel.type) > -1 ? 'flex' : 'none',
                  borderRadius: 20,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: Colors.white,
                  overflow: 'hidden',
                  height: 20,
                  width: 20,
                }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  source={feelConfigs[fe.feel.type].img}
                />
              </View>
            </>
          </TouchableHighlight>
        ))}
        {isLoadMore && <Loading />}
      </ScrollView>
    </View>
  );
};
export default ListReactions;
