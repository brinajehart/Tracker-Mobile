
import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../assets/style';

export default function headerWithIcon({ navigation }) {
    return {
        headerTitle: props => <Text {...props} />,
        headerStyle: {
            backgroundColor: colors.primary,
            height: 40
        },
        headerTitleStyle: {
            color: colors.dark,
            fontWeight: 'bold',
            fontSize: 20
        },
        headerRight: () => (
            <Ionicons
                name={'home'} size={25} color={colors.dark} style={{ marginHorizontal: 15 }}
                onPress={() => navigation.getParent()?.navigate('Landing')}
            />
        ),
    }
}