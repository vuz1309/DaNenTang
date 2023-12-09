import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';

const HeaderTitle = ({
  title,
  icons = [],
  containerStyle = {backgroundColor: Colors.white},
}) => {
  return (
    <View style={[styles.header, containerStyle]}>
      <Text style={styles.menu}>{title}</Text>
      <View style={styles.menuIcon}>
        {icons.map(ic => (
          <TouchableHighlight style={styles.searchBg} onPress={ic.onPress}>
            <VectorIcon
              name={ic.name}
              type={ic.type}
              size={ic.size}
              color={Colors.black}
              style={styles.headerIcons}
            />
          </TouchableHighlight>
        ))}

        <TouchableHighlight style={styles.searchBg}>
          <VectorIcon
            name="search"
            type="Ionicons"
            size={25}
            color={Colors.black}
            style={styles.headerIcons}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 8,
  },

  menuIcon: {
    paddingVertical: 16,
    gap: 10,
    flexDirection: 'row',
  },
  menu: {
    flex: 8,
    fontSize: 24,
    paddingVertical: 16,
    paddingHorizontal: 8,
    color: Colors.black,
    fontWeight: '700',
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
});
export default HeaderTitle;
