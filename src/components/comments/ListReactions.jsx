const {View, Image, TouchableHighlight, Text} = require('react-native');
import React from 'react';
const {default: HeaderSearch} = require('../../screens/layouts/HeaderSearch');
import Modal from 'react-native-modal';
import {getListFeels} from '../../api/modules/comment.request';
import {Colors} from '../../utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import VectorIcon from '../../utils/VectorIcon';
import {feelConfigs} from '../posts/PostFooter';
const nullAvatar = require('../../assets/images/avatar_null.jpg');
const ListReactions = ({onClose, postId}) => {
  const {navigate} = useNavigation();
  const [reactions, setReactions] = React.useState([]);
  const [params, setParams] = React.useState({
    index: '0',
    count: '10',
  });

  const getFeels = async () => {
    try {
      console.log('postId', postId);
      const {data} = await getListFeels({id: postId, ...params});
      console.log('comments:', data.data);
      setReactions(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getFeels();
  }, [params]);
  return (
    <Modal
      isVisible={true}
      style={{
        margin: 0,
        backgroundColor: Colors.white,
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <View>
        <HeaderSearch onBack={onClose} title="Người đã bày tỏ cảm xúc" />
        <ScrollView>
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
                  {fe.feel.user.avatar ? (
                    <Image
                      style={{
                        resizeMode: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                      source={{uri: fe.feel.user.avatar}}
                      defaultSource={nullAvatar}
                    />
                  ) : (
                    <Image
                      style={{
                        resizeMode: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                      source={nullAvatar}
                    />
                  )}
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
                  {/* <VectorIcon
                    name={feelConfigs[fe.feel.type].icon}
                    type="AntDesign"
                    size={20}
                    color={feelConfigs[fe.feel.type].color}
                  /> */}
                </View>
              </>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
export default ListReactions;
