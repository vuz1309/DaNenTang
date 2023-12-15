import React, {useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

const NewModalizeManager = () => {
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const show = (content: any) => {
    setModalContent(content);
    setVisible(true);
    return (
      <Modal visible={visible} onRequestClose={hide} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{modalContent}</View>
        </View>
      </Modal>
    );
  };

  const hide = () => {
    setModalContent(null);
    setVisible(false);
  };

  <Modal visible={visible} onRequestClose={hide} transparent>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>{modalContent}</View>
    </View>
  </Modal>;
  return {show};
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 8,
  },
});
export default NewModalizeManager;
