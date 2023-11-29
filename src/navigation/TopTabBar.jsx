import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {TabData} from '../data/TabData';
import Header from '../components/Header';
import {Themes} from '../assets/themes';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const TopTabBar = () => {
  const [isShowHeader, setisShowHeader] = React.useState(true);
  const notis = useSelector(state => state.notiInfo.newNotiOfTabs);
  console.log('notis', notis);
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
                  <View style={{position: 'relative'}}>
                    <VectorIcon
                      type={focused ? tab.activeiconType : tab.inactiveIconType}
                      name={focused ? tab.activeIconName : tab.inactiveIconName}
                      size={focused ? tab.size : tab.unFocusSize}
                      color={color}
                    />
                    {!!notis[tab.name] && (
                      <View
                        style={{
                          backgroundColor: Themes.COLORS.red,
                          padding: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'absolute',
                          borderRadius: 20,
                          top: -8,
                          right: -14,
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: 20,
                          }}>
                          {notis[tab.name] > 9 ? '9+' : notis[tab.name]}
                        </Text>
                      </View>
                    )}
                  </View>
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
