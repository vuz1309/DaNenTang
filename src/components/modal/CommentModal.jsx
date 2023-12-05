/* eslint-disable @typescript-eslint/no-unused-vars */
import {forwardRef, useRef, useState} from 'react';
import {Button, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AlertMessage from '../base/AlertMessage';
import ModalizeManager from './ModalizeManager';
import {logger} from '../../utils/helper';
import React, {ReactElement} from 'react';
import { Modalize } from 'react-native-modalize';
import { useCombinedRefs } from '../../utils/use-combined-refs';
import { getStringAsyncData } from '../../utils/authenticate/LocalStorage';
import { Colors } from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';

export const CommentModal = ({isOpen}) => {
    return (
      <Modal
      animationType='fade'
      transparent = {true}
      visible= {isOpen}
      >
        <View style = {styles.wrapper}>
                <VectorIcon
                    name="arrow-back"
                    type="Ionicons"
                    color={Colors.black}
                    size={20}
                    onPress={() => {
                      // setVisible(false);
                    }}
                  />
                  <View
                style={{
                marginTop: '5%',
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          <Text> Hello!!</Text>
        </View>
      </Modal>) 
  } 
// }
;
const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    // width: 200,
    backgroundColor: 'white',
  },
});
