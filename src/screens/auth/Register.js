import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text } from 'react-native';
import { colors } from '../../assets/style';
import { Input, Button } from 'react-native-elements';
import { actions } from '../../store/user';

export default ({ navigation }) => {
    const isLoading = useSelector(state => state.user.isFetching === true);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [fullname, setfullname] = useState("");
    const [password, setPassword] = useState("");

    function registerAction() {
        dispatch(actions.register({ email, fullname, password }));
    }

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
                placeholder='Full name'
                leftIcon={{ type: 'ion-icons', name: 'person', color: colors.plain }}
                onChangeText={setfullname}
                inputStyle={{'color': colors.plain}}
            />
            <Input
                placeholder='Email'
                leftIcon={{ type: 'ion-icons', name: 'mail', color: colors.plain }}
                onChangeText={setEmail}
                inputStyle={{'color': colors.plain}}
            />
            <Input
                placeholder='Password'
                secureTextEntry={true}
                leftIcon={{ type: 'ion-icons', name: 'lock', color: colors.plain }}
                onChangeText={setPassword}
                inputStyle={{'color': colors.plain}}
            />
            <Button
                title="Register"
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
                onPress={registerAction}
                loading={isLoading}
            />
        </View>
    )
}