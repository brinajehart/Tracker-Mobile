import React from 'react'
import { colors } from '../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const IconSettings = {
    size: 15,
    color: colors.dark
}

export default function ({ currency }) {
    switch (currency) {
        case 'USD':
            return <FontAwesomeIcon {...{...IconSettings, name: 'dollar'}}/>
        case 'GBP':
            return <FontAwesome5Icon {...{...IconSettings, name: 'pound-sign'}}/>
        case 'EUR':
        default:
            return <FontAwesome5Icon {...{...IconSettings, name: 'euro-sign'}}/>
    }
}