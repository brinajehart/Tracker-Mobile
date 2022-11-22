import React, { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from "../store/user";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CurrencyPickerModal from "../components/modals/CurrencyPickerModal";

import { colors } from "../assets/style";
const image = require('../assets/landing.png');


export default function Landing({ navigation }) {
    const textStyle = { color: colors.primary, fontSize: 16, fontWeight: 'bold' };
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    const move = AuthScreen => {
        navigation.navigate('Auth', { screen: AuthScreen });
    }

    function logOut() {
        dispatch(actions.logOut());
        move('Login');
    }

    function AnyonymousActions() {
        return (
            <>
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
                <View style={{ height: 20 }} />
                <Button
                    title={"Register"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.primary,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%' }}
                    titleStyle={textStyle}
                    onPress={() => move('Register')}
                />
            </>
        )
    }

    function UserActions() {
        return (
            <>
                <Button
                    title={"Browse"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.primary,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%' }}
                    titleStyle={textStyle}
                    onPress={() => navigation.navigate('App')}
                />
                <Button
                    title={"Log out"}
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
                    onPress={logOut}
                />
            </>
        )
    }

    function CurrencyPicker() {
        return (
            <View style={{ alignItems: 'flex-end', width: '100%' }}>
                <Button
                    icon={
                        <MaterialIcon
                            name="attach-money"
                            size={35}
                            color={colors.dark}
                        />
                    }
                    title=""
                    buttonStyle={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        backgroundColor: colors.primary,
                        margin: 15
                    }}
                    onPress={() => setModalVisible(true)}
                />
            </View>
        )
    }

    return (
        <>
            <CurrencyPickerModal visible={modalVisible} setVisible={setModalVisible} />
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20 }}>
                        <Text style={{ ...textStyle, fontSize: 50, textAlign: 'center', color: colors.primary }}>
                            {"Tracker"}
                        </Text>
                        <CurrencyPicker />
                        {isLoggedIn ? <UserActions /> : <AnyonymousActions />}
                    </View>

                </ImageBackground>
            </View>
        </>
    );
}