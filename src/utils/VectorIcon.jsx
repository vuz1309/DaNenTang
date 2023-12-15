import React from 'react';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';

/**
 * @param {object} props name, size, color, type, onPress, style
 * @returns {JSX.Element}
 */
const VectorIcon = props => {
  const {name, size, color, type, onPress, style} = props;

  // Define a mapping object for icon components
  const iconComponents = {
    MaterialCommunityIcons,
    FontAwesome,
    FontAwesome5,
    Feather,
    AntDesign,
    Entypo,
    Ionicons,
    EvilIcons,
    Octicons,
    Fontisto,
    MaterialIcons,
  };

  // Check if the specified type exists in the mapping
  const IconComponent = iconComponents[type] || MaterialIcons;

  return (
    <View style={style}>
      <IconComponent onPress={onPress} name={name} size={size} color={color} />
    </View>
  );
};

export default VectorIcon;
