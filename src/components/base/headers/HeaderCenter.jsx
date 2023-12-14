const {View, TouchableOpacity, StyleSheet, Text} = require('react-native');
const {Colors} = require('../../../utils/Colors');
const {default: VectorIcon} = require('../../../utils/VectorIcon');

const HeaderCenter = ({
  goBack,
  text,
  bgColor = Colors.white,
  textColor = Colors.black,
}) => {
  return (
    <View style={[styles.header, {backgroundColor: bgColor}]}>
      <TouchableOpacity onPress={goBack}>
        <VectorIcon
          name="arrowleft"
          type="AntDesign"
          size={22}
          color={textColor}
        />
      </TouchableOpacity>
      <Text style={[styles.headerText, {color: textColor}]}>{text}</Text>
      <TouchableOpacity>
        <VectorIcon
          name="search1"
          type="AntDesign"
          size={22}
          color={textColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    color: Colors.black,
  },
});
export default HeaderCenter;
