import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import StyledTouchable from '../StyledTouchable';
import {Colors} from '../../../utils/Colors';

const DialogConfirm = ({
  title,
  content,
  mainBtn,
  subBtn,
  closeBtn,
  isVisible,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.7}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={100}
      onBackdropPress={closeBtn.onPress}
      style={styles.modal}>
      <View
        style={[
          styles.modalContent,
          {
            padding: 24,
            borderRadius: 4,
          },
        ]}>
        <Text
          style={{fontSize: 20, fontWeight: '700', color: Colors.textColor}}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            paddingVertical: 12,
            color: Colors.textColor,
          }}>
          {content}
        </Text>
        <View
          style={{justifyContent: 'flex-end', flexDirection: 'row', gap: 12}}>
          <Text
            onPress={mainBtn.onPress}
            style={{
              fontSize: 18,
              color: Colors.primaryColor,
              fontWeight: '500',
            }}>
            {mainBtn.text}
          </Text>
          {!!subBtn?.onPress && (
            <Text
              onPress={subBtn.onPress}
              style={{
                fontSize: 18,
                color: Colors.black,
                fontWeight: '500',
              }}>
              {subBtn.text}
            </Text>
          )}
          <StyledTouchable onPress={closeBtn.onPress}>
            <Text
              style={{fontSize: 18, color: Colors.black, fontWeight: '500'}}>
              {closeBtn.text}
            </Text>
          </StyledTouchable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.white,
    width: '100%',
    color: Colors.black,

    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DialogConfirm;
