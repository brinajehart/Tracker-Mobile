import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../components/Header';
import Invoices from '../screens/group/Invoices';
import Main from '../screens/group/Main';
import Members from '../screens/group/Members';
import ShoppingList from '../screens/group/ShoppingList';
import Statistics from '../screens/group/Statistics';

import { tabBarStyle } from '../assets/style';

const Tab = createBottomTabNavigator();

export default function GroupNavigator() {
    const routeIcons = {
        Main: 'layer-group',
        Members: 'users',
        ShoppingList: 'th-list',
        Invoices: 'file-invoice',
        Statistics: 'chart-area'
    }

    return (
        <Tab.Navigator initialRouteName="Main" screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return <FontAwesome5Icon name={routeIcons[route.name]} size={25} color={color} />
                },
                tabBarStyle
            })}
            tabBarOptions={{
                activeTintColor: '#eee',
                inactiveTintColor: '#999',
                showLabel: false
            }}
        >
            <Tab.Screen name="Main" component={Main} options={(props) => Header(props)} />
            <Tab.Screen name="Members" component={Members} options={(props) => Header(props)} />
            <Tab.Screen name="ShoppingList" component={ShoppingList} options={(props) => Header(props)} />
            <Tab.Screen name="Invoices" component={Invoices} options={(props) => Header(props)} />
            <Tab.Screen name="Statistics" component={Statistics} options={(props) => Header(props)} />
        </Tab.Navigator>
    );
}
