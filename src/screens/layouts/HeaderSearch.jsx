import {View, TouchableHighlight, StyleSheet, Text} from 'react-native';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';

const HeaderSearch = ({title, onBack, haveSearch = true}) => {
  return (
    <View style={styles.header}>
      <View style={{gap: 12, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableHighlight
          underlayColor={Colors.lightgrey}
          style={{borderRadius: 48, padding: 8}}
          onPress={onBack}>
          <VectorIcon
            name="arrowleft"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
        </TouchableHighlight>
        <Text style={{fontSize: 18, fontWeight: '600', color: Colors.black}}>
          {title}
        </Text>
      </View>
      {haveSearch && (
        <TouchableHighlight style={{borderRadius: 48, padding: 8}}>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
        </TouchableHighlight>
      )}
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
export default HeaderSearch;
