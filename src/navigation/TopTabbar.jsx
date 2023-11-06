import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {TabData} from '../data/TabData';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();

const TopTabBar = () => {
  const [currentTab, setCurrentTab] = useState('Home');
  return (
    <>
      {currentTab === 'Home' && <Header />}
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grey,
        })}>
        {TabData.map(tab => (
          <Tab.Screen
            key={tab.id}
            name={tab.name}
            component={tab.route}
            listeners={({route}) => ({
              tabPress: () => {
                // Cập nhật biến state khi người dùng chuyển tab
                setCurrentTab(route.name);
              },
            })}
            options={{
              tabBarIcon: ({color, focused}) => (
                <VectorIcon
                  type={focused ? tab.activeiconType : tab.inactiveIconType}
                  name={focused ? tab.activeIconName : tab.inactiveIconName}
                  size={focused ? tab.size : tab.unFocusSize}
                  color={color}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default TopTabBar;
