import React from 'react'
import { Button } from 'react-native-elements';
import { colors } from '../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function({ onPress, title }) {
    return (
        <Button
            title={title || "Submit"}
            buttonStyle={{
                width: 200,
                borderRadius: 20,
                backgroundColor: colors.submit,
            }}
            containerStyle={{
                position: 'absolute',
                bottom: 75,
                right: 15,
                elevation: 10
            }}
            onPress={onPress}
        />
    )
}