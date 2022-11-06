import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import { colors } from '../../assets/style';
import { Input, Button } from 'react-native-elements';
import { actions } from '../../store/user';

export default ({ navigation }) => {
    const isLoading = useSelector(state => state.user.isFetching === true);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const dispatch = useDispatch();

    const loginAction = () => {
        dispatch(actions.login({ email, password }));
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch]);

    if (isLoggedIn) {
        navigation.getParent()?.navigate('App');
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'ion-icons', name: 'mail', color: colors.plain }}
                onChangeText={setEmail}
                inputStyle={{'color': colors.plain}}
                value={email}
            />
            <Input
                placeholder='Password'
                secureTextEntry={true}
                leftIcon={{ type: 'ion-icons', name: 'lock', color: colors.plain }}
                onChangeText={setPassword}
                inputStyle={{'color': colors.plain}}
                value={password}
            />
            <Button
                title="Log in"
                buttonStyle={{
                    backgroundColor: colors.submit,
                    borderRadius: 10,
                    height: 45
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 18, color: colors.dark }}
                containerStyle={{
                    height: 50,
                    width: '95%',
                    marginVertical: 10,
                }}
                onPress={loginAction}
                loading={isLoading}
            />
        </View>
    )
}