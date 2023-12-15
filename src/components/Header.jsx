import {Image, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import FacebookLogo from '../assets/images/fblogo.png';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {useState} from 'react';
import SearchModal from './modal/SearchModal';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const onPressSearch = async () => {
    setModalVisible(true);
  };
  const onCloseSearchModal = () => {
    setModalVisible(false);
  };
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
        {/* <View style={styles.searchBg}>
          <VectorIcon
            name="messenger"
            type="Fontisto"
            size={22}
            color={Colors.grey}
          />
        </View> */}
      </View>
      {modalVisible && <SearchModal onCloseModal={onCloseSearchModal} />}
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
  },
});

export default Header;
