import {
  Image,
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import FacebookLogo from '../assets/images/fblogo.png';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {logger} from '../utils/helper';
import {useState} from 'react';
import {getSavedSearchRequest, searchRequest} from '../api/modules/search';
import useSearch from '../hooks/useSearch';
import {SingleSavedItem} from './search/SingleSavedItem';

const Item = ({listItem}) => {
  if (listItem.length == 0) {
    return;
  }
  return (
    <View>
      {listItem.map(item => (
        <View key={item.id} style={styles.postHeaderContainer}>
          <View style={styles.postTopSec}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => logger('pressed on: ', true, item.keyword)}>
              <Image
                source={{uri: item.author.avatar}}
                style={styles.userProfile}
              />
              <View style={styles.userSection}>
                <Text style={[styles.title]}>{item.author.name}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.row}>
              <VectorIcon
                name="dots-three-horizontal"
                type="Entypo"
                size={25}
                color={Colors.headerIconGrey}
                style={styles.headerIcons}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const Header = () => {
  const [selectedId, setSelectedId] = useState();
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const onPressSearch = () => {
    logger('Opening search modal ...');
    setModalVisible(true);
  };
  const handleChangeText = text => {
    setText(text);
  };

  const onCompleteSearch = data => {
    logger('completed search! Data: ', data);
    setSearchData(data);
  };
  const fetchSearchData = () =>
    useSearch({onComplete: onCompleteSearch, keyword: text});

  React.useEffect(() => {
    // const  fetchSearchData = ()  => useSearch({onComplete: onCompleteSearch, keyword:text});
    // fetchSearchData();

    const fetchSavedSearchData = async () => {
      try {
        const response = await getSavedSearchRequest({index: 0, count: 20});
        setSavedData(response.data.data);
      } catch (err) {
        logger('err api: ', true, err);
        setSavedData([]);
      }
    };
    fetchSavedSearchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={FacebookLogo} style={styles.fbLogoStyle} />
      <View style={styles.headerIcons}>
        <View style={styles.searchBg}>
          <VectorIcon
            name="search"
            type="FontAwesome5"
            size={19}
            color={Colors.grey}
            onPress={onPressSearch}
          />
        </View>
        <View style={styles.searchBg}>
          <VectorIcon
            name="messenger"
            type="Fontisto"
            size={22}
            color={Colors.grey}
          />
        </View>
      </View>

      {modalVisible ? (
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            AlertMessage('Modal has been closed.');
            setModalVisible(false);
          }}>
          <View>
            <View style={styles.searchHeader}>
              <View style={styles.marginTopHalf}>
                <VectorIcon
                  name="arrow-back"
                  type="Ionicons"
                  color={Colors.black}
                  size={20}
                  onPress={() => {
                    setModalVisible(false);
                    setText('');
                  }}
                />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder={'Tìm kiếm trên Facebook'}
                onFocus={() => setSearchData([])}
                onChangeText={text => handleChangeText(text)}
                onSubmitEditing={fetchSearchData}></TextInput>
            </View>

            <View
              style={{
                marginTop: '5%',
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {text === '' ? (
              <View>
                <View style={[styles.rowBetween, {alignItems: 'center'}]}>
                  <Text style={styles.biggerText}>Tìm kiếm gần đây</Text>
                  <TouchableOpacity>
                    <Text style={styles.biggerText}>CHỈNH SỬA</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginTop: '5%',
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <ScrollView>
                  {/* <SavedItem listItem={savedData} /> */}
                  <View style={{paddingBottom: 12}}>
                    {savedData.map(item => (
                      <SingleSavedItem
                        id={item.id}
                        key={item.id}
                        keyword={item.keyword}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
            ) : (
              <ScrollView>
                <Item listItem={searchData} />
              </ScrollView>
            )}
          </View>
        </Modal>
      ) : (
        logger('not open modal')
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fbLogoStyle: {
    height: 25,
    width: 130,
  },
  searchBg: {
    backgroundColor: Colors.lightgrey,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  subContainer: {
    backgroundColor: Colors.black,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 20,
    color: 'black',
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
    marginLeft: 26,
  },
  postTopSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postHeaderContainer: {
    padding: 16,
  },
  searchHeader: {
    flexDirection: 'row',
    marginLeft: 10,
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#DDDDDD',
    borderRadius: 18,
    marginLeft: '5%',
    width: '88%',
    height: 40,
    padding: 10,
    paddingLeft: 15,
  },
  marginTopHalf: {
    marginTop: '3%',
  },
  biggerText: {
    marginTop: '3%',
    marginLeft: '3%',
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});

export default Header;
