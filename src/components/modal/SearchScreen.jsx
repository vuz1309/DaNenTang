import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import AlertMessage from '../base/AlertMessage';
import VectorIcon from '../../utils/VectorIcon';
import {SingleSavedItem} from '../search/SingleSavedItem';
import {Colors} from '../../utils/Colors';
import useSearch from '../../hooks/useSearch';
import {getSavedSearchRequest} from '../../api/modules/search';
import {logger} from '../../utils/helper';
import PostDisplay from '../posts/PostDisplay';
import HistorySearchModal from './HistorySearchModal';
import { APP_ROUTE } from '../../navigation/config/routes';

const SearchScreen = ({route, navigation}) => {
  const initialKeyword = route?.params?.initialKeyword || '';
  const [keyword, setKeyword] = useState(initialKeyword);
  const [savedData, setSavedData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const [openHistory, setOpenHistory] = useState(false);
  const onCloseHistory = newSavedSearch => {
    setOpenHistory(false);
    setSavedData(newSavedSearch);
  };

  React.useEffect(() => {
    const fetchSavedSearch = async () => {
      try {
        const response = await getSavedSearchRequest({index: 0, count: 20});
        setSavedData(response.data.data);
      } catch (err) {
        setSavedData([]);
      }
    };
    fetchSavedSearch();
  }, [searchData]);

  const onPressSavedItem = async text => {
    setKeyword(text);
    useSearch({onComplete: onCompleteSearch, keyword: text});
  };

  const onCompleteSearch = data => {
    setSearchData(data);
  };
  const fetchSearchData = () => {
    if (keyword === '' || keyword === undefined || keyword === null) {
      return;
    }
    useSearch({onComplete: onCompleteSearch, keyword: keyword});
  };
  return (
      <View>
        <View style={styles.searchHeader}>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            style={{padding: 4, borderRadius: 20}}
            onPress={() => {
              setKeyword('');
              navigation.navigate(APP_ROUTE.HOME_TAB);
            }}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={24}
              color={Colors.black}
            />
          </TouchableHighlight>
          <TextInput
            value={keyword}
            style={styles.searchInput}
            placeholder={'Tìm kiếm trên Facebook'}
            placeholderTextColor={Colors.textGrey}
            onFocus={() => setSearchData([])}
            onChangeText={text => setKeyword(text)}
            onSubmitEditing={fetchSearchData}
          />
        </View>

        <View
          style={{
            marginTop: '5%',
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        {openHistory && (
          <HistorySearchModal
            historySearch={savedData}
            onCloseModal={onCloseHistory}
          />
        )}
        {keyword === '' ? (
          <View>
            <View style={[styles.rowBetween]}>
              <Text style={styles.biggerText}>Tìm kiếm gần đây</Text>
              <TouchableOpacity>
                <Text
                  style={styles.biggerText}
                  onPress={() => setOpenHistory(true)}>
                  CHỈNH SỬA
                </Text>
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
              <View style={{paddingBottom: 12}}>
                {savedData.map(item => (
                  <SingleSavedItem
                    id={item.id}
                    key={item.id}
                    keyword={item.keyword}
                    onPressItem={onPressSavedItem}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <ScrollView>
              <View
                style={{
                  marginBottom: 12,
                  backgroundColor: Colors.background,
                  gap: 4,
                }}>
                {searchData.map(item => (
                  <PostDisplay key={item.id} item={item} />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    color: Colors.black,
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
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    backgroundColor: Colors.lightgrey,
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
    alignItems: 'center',
    color: Colors.black,
    flex: 1,
    height: 42,
  },
  biggerText: {
    marginTop: '3%',
    marginLeft: '3%',
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});
export default SearchScreen;