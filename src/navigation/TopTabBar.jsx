import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {TabData} from '../data/TabData';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();

const TopTabBar = () => {
  const [isShowHeader, setisShowHeader] = React.useState(true);

  return (
    <>
      {isShowHeader && <Header />}
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grey,
        })}
        screenListeners={{
          state: e => {
            setisShowHeader(e.data.state.index === 0);
          },
        }}>
        {TabData.map(tab => (
          <Tab.Screen
            key={tab.id}
            name={tab.name}
            component={tab.route}
            options={{
              tabBarIcon: ({color, focused}) => {
                return (
                  <VectorIcon
                    type={focused ? tab.activeiconType : tab.inactiveIconType}
                    name={focused ? tab.activeIconName : tab.inactiveIconName}
                    size={focused ? tab.size : tab.unFocusSize}
                    color={color}
                  />
                );
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};
export default TopTabBar;
