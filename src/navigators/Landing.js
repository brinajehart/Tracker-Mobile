import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground, Text, View } from "react-native";
import { Button } from 'react-native-elements';

import { colors } from "../assets/style";
const image = require('../assets/landing.png');


export default function Landing({ navigation }) {
    const textStyle = { color: colors.primary, fontSize: 16, fontWeight: 'bold' };
    const move = AuthScreen => {
        navigation.navigate('Auth', { screen: AuthScreen });
        // StatusBar.setBackgroundColor(colors.primary);
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20 }}>
                    <Text style={{ ...textStyle, fontSize: 25, textAlign: 'center', color: '#ffebdb' }}>
                        {"Welcome to"}
                    </Text>
                    <Text style={{ ...textStyle, fontSize: 50, textAlign: 'center', marginBottom: 25, color: colors.primary }}>
                        {"Tracker"}
                    </Text>
                    <Button
                        title={"Login"}
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            borderColor: colors.primary,
                            borderWidth: 2,
                            borderRadius: 20
                        }}
                        containerStyle={{ width: '100%' }}
                        titleStyle={textStyle}
                        onPress={() => move('Login')}
                    />
                    <Button
                        title={"Register"}
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            borderColor: colors.primary,
                            borderWidth: 2,
                            marginTop: 15,
                            borderRadius: 20
                        }}
                        containerStyle={{ width: '100%' }}
                        titleStyle={textStyle}
                        onPress={() => move('Register')}
                    />
                </View>

            </ImageBackground>
        </View>
    );
}