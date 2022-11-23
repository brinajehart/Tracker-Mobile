import React from 'react'
import { Button } from 'react-native-elements';
import { colors } from '../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function({ onPress, title, loading, bottomOffset, backgroundColor }) {
    return (
        <Button
            title={title || "Submit"}
            buttonStyle={{
                width: 200,
                borderRadius: 20,
                backgroundColor: backgroundColor || colors.submit,
            }}
            containerStyle={{
                position: 'absolute',
                bottom: bottomOffset || 75,
                right: 15,
                elevation: 10
            }}
            onPress={onPress}
            loading={loading || false}
        />
    )
}