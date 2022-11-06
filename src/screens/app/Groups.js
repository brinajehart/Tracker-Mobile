import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, FlatList } from 'react-native';
import { colors } from '../../assets/style';
import { Button, ListItem } from "react-native-elements";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Requests from '../../api';
import Moment from 'moment';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => { loadGroups() }, []);
    async function loadGroups() {
        setLoading(true);
        const [status, response] = await Requests.GET('profile/groups', user.jwt);
        setLoading(false);
        if (status == 200) {
            setGroups(response);
        } else {
            // show toast
            console.log('Error occured while fetching groups!', status);
        }
    }

    function openGroup(id) {
        console.log("open group called...", id);
    }

    function renderItem(item) {
        return (
            <ListItem
                key={item.id}
                topDivider
                onPress={() => openGroup(item.id)}
                containerStyle={{ backgroundColor: colors.dark}}
            >
                <FontAwesome5Icon name={'layer-group'} size={25} color={colors.primary} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.plain, fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colors.plain }}>{Moment(item.created_at).format('DD.MM.YYYY')}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }

    return (
        <View style={{ backgroundColor: colors.dark, flex: 1}}>
            <FlatList
                data={groups}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderItem(item)}
                refreshing={loading}
                onRefresh={loadGroups}
            />
        </View>
        
    )
}