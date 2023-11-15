import React from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';

interface CustomModalizeProps extends ModalizeProps{
    isCenter?: boolean;
}

const ModalizeManager = () => {
    const modalRef = React.createRef<any>();
    const show = (id: any, element: any, props: CustomModalizeProps) => {
    }
}