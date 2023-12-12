import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AlertMessage from '../base/AlertMessage';
import VectorIcon from '../../utils/VectorIcon';
import {SingleSavedItem} from '../search/SingleSavedItem';
import {Colors} from '../../utils/Colors';
import useSearch from '../../hooks/useSearch';
import {
  deleteSearchHistory,
  getSavedSearchRequest,
} from '../../api/modules/search';
import {logger} from '../../utils/helper';
import PostBody from '../posts/PostBody';

const HistoryItem = ({item, onCompleteDeleteSearch}) => {
  const onDeleteHistorySearch = async () => {
    try {
      const response = await deleteSearchHistory({
        search_id: item.id,
        all: '0',
      });
      if (response.status === 200) {
        onCompleteDeleteSearch(item.id);
      }
    } catch (err) {}
  };
  return (
    <View style={{flexDirection: 'row', paddingTop: 16}}>
      <VectorIcon
        name="search-circle"
        type="Ionicons"
        size={70}
        color={Colors.blue}
      />
      <View style={[styles.userSection]}>
        <Text style={[styles.titleItem]} onPress={() => {}}>
          Bạn đã tìm kiếm trên Facebook{' '}
        </Text>
        <Text style={[styles.subTitleItem]}>"{item.keyword}"</Text>
        <View
          style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <VectorIcon
            style={{marginTop: 0}}
            name="lock"
            type="FontAwesome6"
            color="gray"
            size={20}
          />
          <Text style ={{color: 'gray', fontSize: 12}}>Chỉ mình tôi</Text>
          <VectorIcon
            style={{marginTop: 0}}
            name="dot-single"
            type="Entypo"
            color="gray"
            size={20}
          />
          <Text style ={{color: 'gray', fontSize: 12}}>Đã ẩn khỏi dòng thời gian</Text>
        </View>
      </View>
      <VectorIcon
        style={{marginLeft: 15}}
        name="close"
        type="Ionicons"
        color="gray"
        size={30}
        onPress={() => {
          onDeleteHistorySearch();
        }}
      />
    </View>
  );
};
export default function HistorySearchModal({historySearch, onCloseModal}) {
  const [savedData, setSavedData] = useState(historySearch);
  const onCompleteDeleteSearch = deletedId => {
    setSavedData(savedData => savedData.filter(item => item.id !== deletedId));
  };
  const handleDeleteAll = async () => {
      try{
        const response = await deleteSearchHistory({all: "1"});
        if(response.status === 200){
          AlertMessage('Xoá lịch sử tìm kiếm thành công');
          setSavedData([]);
        }
      }catch(err){

      }
  }
  const requestClose = () => {
    onCloseModal(savedData);
  }
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={true}
      presentationStyle="fullScreen"
      onRequestClose={() => {
        AlertMessage('Modal has been closed.');
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'white',
        }}>
        <View style={styles.searchHeader}>
          <View style={styles.row}>
            <VectorIcon
              name="chevron-back"
              type="Ionicons"
              color={Colors.black}
              size={20}
              onPress={() => {
                requestClose();
              }}
            />
            <Text style={styles.title}> Nhật ký hoạt động</Text>
          </View>
          <View
              style={{
                marginTop: '4%',
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          <View style={styles.middle}>
            <Text
              onPress={() => {
                handleDeleteAll();
                //TODO : MODAL
              }}
              style={styles.blueTitle}>
              Xoá các tìm kiếm
            </Text>
          </View>
          <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
        </View>
        <ScrollView>
          <View style={{marginBottom: 12}}>
            {savedData.map(item => (
              <HistoryItem
                key = {item.id}
                item={item}
                onCompleteDeleteSearch={onCompleteDeleteSearch}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  middle: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: '10%',
  },
  blueTitle: {
    fontSize: 18,
    color: 'blue',
    fontWeight: '400',
    marginLeft: '10%',
  },
  titleItem: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  subTitleItem: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '400',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userSection: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 7,
  },
  postTopSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postHeaderContainer: {
    padding: 16,
  },
  searchHeader: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginLeft: 10,
    paddingRight: 10,
    height: '15%',
  },
  row: {
    flexDirection: 'row',
  },
  biggerText: {
    marginTop: '3%',
    marginLeft: '3%',
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});
