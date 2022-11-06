import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { colors } from '../../assets/style';

export default ({ navigation }) => {
    const isLoading = useSelector(state => state.user.isFetching === true);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{JSON.stringify(user)}</Text>
        </View>
    )
}