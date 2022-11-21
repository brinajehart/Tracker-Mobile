import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { colors } from '../../assets/style';
import GroupEdit from '../GroupEdit';

export default ({ navigation }) => {
    return (
        <GroupEdit navigation={navigation} />
    )
}