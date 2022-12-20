import React, { useState } from "react";
import { Image, Text, View, ImageBackground } from "react-native";
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from "../store/user";
import CurrencyPickerModal from "../components/modals/CurrencyPickerModal";
import CurrencyIcon from "../components/CurrencyIcon";

import { colors } from "../assets/style";
const logo = require('../assets/logo.png');
const landingImage = require('../assets/landing_v2.png');


export default function Landing({ navigation }) {
    const textStyle = { color: colors.submit, fontSize: 16, fontWeight: 'bold' };
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const currency = useSelector(state => state.currency.currency);
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
                        borderColor: colors.submit,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%', borderRadius: 20 }}
                    titleStyle={textStyle}
                    onPress={() => move('Login')}
                />
                <View style={{ height: 20 }} />
                <Button
                    title={"Register"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.submit,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%', borderRadius: 20 }}
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
                        borderColor: colors.submit,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%', borderRadius: 20 }}
                    titleStyle={textStyle}
                    onPress={() => navigation.navigate('App')}
                />
                <View style={{ height: 20 }} />
                <Button
                    title={"Log out"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.submit,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%', borderRadius: 20 }}
                    titleStyle={textStyle}
                    onPress={logOut}
                />
            </>
        )
    }

    function CurrencyPicker() {
        return (
            <Button
                icon={<CurrencyIcon currency={currency} />}
                title=""
                buttonStyle={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    backgroundColor: colors.submit,
                }}
                containerStyle={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    margin: 15
                }}
                onPress={() => setModalVisible(true)}
            />
        )
    }

    return (
        <>
            <CurrencyPickerModal visible={modalVisible} setVisible={setModalVisible} />
            <ImageBackground source={landingImage} resizeMode="cover" style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <Image source={logo} style={{ height: 250, width: 330, marginTop: 100 }} />
                <View style={{ flex: 1, justifyContent: "center", width: '100%' }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <CurrencyPicker />
                        </View>


                        {isLoggedIn ? <UserActions /> : <AnyonymousActions />}
                    </View>

                </View>
            </ImageBackground>
        </>
    );
}