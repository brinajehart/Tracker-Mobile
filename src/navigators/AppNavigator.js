import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../components/Header';
import Profile from '../screens/app/Profile';
import { tabBarStyle } from '../assets/style';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const routeIcons = {
        Profile: 'user-cog',
        Groups: 'layer-group',
        Users: 'users'
    }

    return (
        <Tab.Navigator initialRouteName="Profile" screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return <FontAwesome5Icon name={routeIcons[route.name]} size={25} color={color} />
                },
                tabBarStyle
            })}
            tabBarOptions={{
                activeTintColor: '#333',
                inactiveTintColor: '#999',
                showLabel: false
            }}
        >
            <Tab.Screen name="Profile" component={Profile} options={(props) => Header(props)} />
            <Tab.Screen name="Users" component={Profile} options={(props) => Header(props)} />
            <Tab.Screen name="Groups" component={Profile} options={(props) => Header(props)} />
        </Tab.Navigator>
    );
}
