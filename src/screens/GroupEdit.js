import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { colors, formTitleStyle } from '../assets/style';
import Requests from '../api';
import FloatingButtonSubmit from '../components/FloatingButtonSubmit';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const groupId = useSelector(state => state.edit?.Group);

    const [group, setGroup] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (groupId) {
            loadGroup();
        }
    }, []);

    async function loadGroup() {
        setLoading(true);
        const [status, response] = await Requests.GET(`group?id=${groupId}`, user.jwt);
        setLoading(false);
        if (status == 200) {
            delete response['members']; // remove members from object
            setGroup(response);
        } else {
            Toast.show("Failed to load group!");
            console.log('Error occured while fetching group data!', status);
        }
    }

    async function handleSubmit() {
        if (groupId) {
            setLoading(true);
            const [status, _] = await Requests.updateGroup(user.jwt, groupId, group.name);
            setLoading(false);
            if (status === 200) {
                Toast.show('Group update success!');
            } else {
                Toast.show('Failed to update group!');
            }
        } else {
            setLoading(true);
            const [status, _] = await Requests.createGroup(user.jwt, group.name);
            setLoading(false);
            if (status === 200) {
                Toast.show('New group was created!');
            } else {
                Toast.show('Failed to create group!');
            }
        }
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15 }}>
                <View style={{ backgroundColor: colors.dark2, borderRadius: 10, width: '100%', padding: 10 }}>
                    <Text style={formTitleStyle}>
                        Group name
                    </Text>
                    <Input
                        onChangeText={(groupName) => setGroup({ ...group, name: groupName })}
                        inputStyle={{ 'color': colors.plain }}
                        containerStyle={{ marginBottom: -15 }}
                        value={group?.name}
                        placeholder='Group name'
                    />
                </View>
            </View>
            <FloatingButtonSubmit onPress={handleSubmit} title={(groupId ? 'Update' : 'Create') + " group"} loading={loading} />
        </>
    )
}