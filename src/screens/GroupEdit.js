import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { colors } from '../assets/style';
import Requests from '../api';

export default ({ navigation }) => {
    const isLoading = useSelector(state => state.user.isFetching === true);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
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

    return (
        <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center' }}>
            {groupId
                ? <Text>{JSON.stringify(group)}</Text>
                : <Text>create group</Text>
            }
        </View>
    )
}