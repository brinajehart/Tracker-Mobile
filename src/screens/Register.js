import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { colors } from '../assets/style';
import { Input, Button } from 'react-native-elements';

export default ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                placeholder='Full name'
                leftIcon={{ type: 'ion-icons', name: 'person', color: colors.plain }}
                
            />
            <Input
                placeholder='Email'
                leftIcon={{ type: 'ion-icons', name: 'mail', color: colors.plain }}
                
            />
            <Input
                placeholder='Password'
                secureTextEntry={true}
                leftIcon={{ type: 'ion-icons', name: 'lock', color: colors.plain }}
            />
            <Button
                title="Register"
                buttonStyle={{
                    backgroundColor: colors.submit,
                    borderRadius: 5
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 16, color: colors.dark }}
                containerStyle={{
                    height: 40,
                    width: '95%',
                    marginVertical: 10,
                }}
            />
        </View>
    )
}