import React from 'react'
import { Button } from 'react-native-elements';
import { colors } from '../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function({ onPress }) {
    return (
        <Button
            icon={
                <FontAwesome5Icon
                    name="plus"
                    size={15}
                    color={colors.dark}
                />
            }
            title=""
            buttonStyle={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: colors.submit,
            }}
            containerStyle={{
                position: 'absolute',
                bottom: 75,
                right: 15,
                elevation: 10,
                width: 50,
                height: 50,
                borderRadius: 100
            }}
            onPress={onPress}
        />
    )
}