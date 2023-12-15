import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
export const emotionList = [
  {name: 'hạnh phúc', emo: '🙂'},
  {name: 'có phúc', emo: '😇'},
  {name: 'đang yêu', emo: '😍'},
  {name: 'buồn', emo: '😔'},
  {name: 'đáng yêu', emo: '😊'},
  {name: 'biết ơn', emo: '🤗'},
  {name: 'hào hứng', emo: '😄'},
  {name: 'đang yêu', emo: '😘'},
  {name: 'điên', emo: '😡'},
  {name: 'cảm kích', emo: '😙'},
  {name: 'sung sướng', emo: '😄'},
  {name: 'tuyệt vời', emo: '😆'},
  {name: 'ngu ngốc', emo: '😬'},
  {name: 'vui vẻ', emo: '😆'},
  {name: 'bình thường', emo: '😑'},
  {name: 'phong cách', emo: '😎'},
];
const EmotionList = ({close, setStatus}) => {
  // const [emo, setEmo] = React.useState({});
  // const handleStatus= (stt) =>{
  //     setStatus(stt);
  // }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*header*/}
        <View style={styles.header1}>
          <TouchableOpacity onPress={close}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={22}
              color={Colors.grey}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Bạn đang cảm thấy thế nào?</Text>
        </View>
      </View>

      <FlatList
        data={emotionList}
        numColumns={2}
        renderItem={e => {
          return (
            <TouchableOpacity
              onPress={() => setStatus(e.item)}
              style={styles.item}>
              <Text style={styles.headerText}>{e.item.name}</Text>
              <Text style={styles.headerText}>{e.item.emo}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'relative',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  header1: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  item: {
    borderColor: Colors.lightgrey,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default React.memo(EmotionList, (prev, next) => true);
