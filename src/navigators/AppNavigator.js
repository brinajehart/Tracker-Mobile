import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';
import Login from '../screens/Login';
import { tabBarStyle } from '../assets/style';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const routeIcons = {
        'Login': 'key'
    }

    return (
        <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={routeIcons[route.name]} size={35} color={color} />
            },
            tabBarStyle
        })}
            tabBarOptions={{
                activeTintColor: '#333',
                inactiveTintColor: '#999',
                showLabel: false
            }}

        >
            <Tab.Screen name="Login" component={Login} options={(props) => Header(props)} />
        </Tab.Navigator>
    );
}
