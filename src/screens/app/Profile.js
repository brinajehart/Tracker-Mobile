import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground, ToastAndroid } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { colors, formTitleStyle } from '../../assets/style';
import FloatingButtonSubmit from '../../components/FloatingButtonSubmit';
import { actions } from '../../store/user';
import Requests from '../../api';
import Toast from 'react-native-simple-toast';
import { Form } from '../../components/form';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const mergedUser = { ...profile, ...user };
        if (!profile?.old_email) {
            mergedUser['old_email'] = user?.email;
        }

        setProfile({ ...mergedUser });
    }, [user]);

    function TogglePassword() {
        return (
            <Button
                icon={<FeatherIcon name={!visiblePassword ? 'eye-off' : 'eye'} size={25} color={colors.primary} />}
                title=""
                buttonStyle={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    backgroundColor: colors.dark2,
                }}
                containerStyle={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    margin: 15,
                    position: 'absolute',
                    bottom: 120,
                    right: 15,
                    elevation: 10
                }}
                onPress={togglePasswordVisiblity}
            />
        )
    }

    async function handleSubmit() {
        setLoading(true);
        console.log(profile);
        Toast.show("TODO");
        debugger
        //const [status, _] = Requests.updateProfile(user.jwt, profile);
        //if (status === 200) {
        //    dispatch(actions.updateProfile(profile));
        //    Toast.show('Successfuly updated profile!')
        //} else {
        //    Toast.show('Failed to update profile!');
        //}
        setLoading(false);
    }

    function togglePasswordVisiblity() {
        setVisiblePassword(!visiblePassword);
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15 }}>
                <View style={{ backgroundColor: colors.dark, borderRadius: 10, width: '100%', padding: 10 }}>
                    <Text style={formTitleStyle}>
                        Profile data
                    </Text>
                    <Form.Text
                        onChangeText={(fullname) => setProfile({ ...profile, fullname })}
                        value={profile?.fullname}
                        placeholder='Fullname'
                        margin={5}
                    />
                    <Form.Text
                        onChangeText={(email) => setProfile({ ...profile, email })}
                        value={profile?.email}
                        placeholder='Email'
                        margin={5}
                    />
                    <Form.Text
                        onChangeText={(password) => setProfile({ ...profile, password })}
                        value={profile?.password}
                        placeholder='Password'
                        secureTextEntry={!visiblePassword}
                        margin={5}
                    />
                </View>
                <View style={{ backgroundColor: colors.dark, borderRadius: 10, width: '100%', padding: 10, marginTop: 15 }}>
                    <Text style={formTitleStyle}>
                        Old credentials
                    </Text>
                    <Form.Text
                        onChangeText={(old_email) => setProfile({ ...profile, old_email })}
                        value={profile?.old_email}
                        placeholder='Email'
                        margin={5}
                    />
                    <Form.Text
                        onChangeText={(old_password) => setProfile({ ...profile, old_password })}
                        value={profile?.old_password}
                        secureTextEntry={!visiblePassword}
                        placeholder='Password'
                        margin={5}
                    />
                </View>
            </View>
            <TogglePassword />
            <FloatingButtonSubmit onPress={handleSubmit} title={'Update profile'} loading={loading} />
        </>
    )
}