/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { ReactElement } from 'react';
import {Modalize, ModalizeProps} from 'react-native-modalize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleProp, View, ViewStyle} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import {Themes} from '../../assets/themes';
import {logger, wait} from '../../utils/helper';
import ModalizeCenterComponent from './ModalizeCenterComponent';

interface CustomModalizeProps extends ModalizeProps {
  isCenter?: boolean;
  avoidKeyboard?: boolean;
  containerStyleCenter?: StyleProp<ViewStyle>;
}
let modalControl: any[] = [];

const ModalizeManager = () => {
  const modalRef = React.createRef<any>();

  const show = (id: any, element: ReactElement, props: CustomModalizeProps) => {
    logger("Modalize manager: ",true,`id: ${id}, element: ${element.props}, props: ${props}`);
    logger("Mdl manager: ", true, modalRef);
    const Wrapper = props?.avoidKeyboard ? KeyboardAwareScrollView : View;
    if (!modalControl.find(e => e.id === id)) {
      const sibling = new RootSiblings(
        (
          <Modalize
            ref={modalRef}
            onClosed={() => dismiss(id)}
            withHandle={false}
            scrollViewProps={{
              scrollEnabled: false,
              keyboardShouldPersistTaps: 'handled',
            }}
            avoidKeyboardLikeIOS={true}
            adjustToContentHeight={true}
            disableScrollIfPossible={false}
            {...props}
            modalStyle={{
              minHeight: props?.isCenter ? '100%' : 0,
              backgroundColor: props?.isCenter
                ? 'transparent'
                : Themes.COLORS.white,
            }}>
            <Wrapper>
              {props?.isCenter ? (
                <ModalizeCenterComponent
                  customContainerStyle={props?.containerStyleCenter}
                  handleDismiss={() => dismiss(id)}>
                  {element}
                </ModalizeCenterComponent>
              ) : (
                element
              )}
            </Wrapper>
          </Modalize>
        ),
        () => {
          modalRef?.current?.open();
          const newRef = { ...modalRef };
          modalControl.push({
            id,
            ref: newRef,
            element: sibling,
            props,
          });
        },
      );
    } else {
      wait(200).then(() => {
        modalRef?.current?.open();
      });
    }
  };
  const dismiss = (id: any) => {
    const item = modalControl.find(e => e.id === id);
    if (item) {
      const {ref, element} = item;
      ref?.current?.close();
      // destroy id
      const arrFilter = modalControl.filter(e => e.id !== id);
      modalControl = [...arrFilter];
      wait(200).then(() => {
        element.destroy();
      });
    }
  };

  const update = (id: any, component: any, props: any) => {
    const item = modalControl.find(e => e.id === id);
    if (item) {
      item.element.update(
        <Modalize
          ref={modalRef}
          onClosed={() => dismiss(id)}
          withHandle={false}
          {...item.props}
          {...props}>
          {component}
        </Modalize>,
      );
    }
  };
  const dismissAll = () => {
    modalControl.forEach(item => {
      const {element} = item;
      element?.destroy();
    });
  };
  const destroySpecificId = (id: any) => {
    const item = modalControl.find(e => e.id === id);
    if (item) {
      const { element } = item;
      element?.destroy();
      // destroy id
      const arrFilter = modalControl.filter(e => e.id !== id);
      modalControl = [...arrFilter];
    }
  };
  return { show, dismissAll, dismiss, update, destroySpecificId };
};
export default ModalizeManager;

