import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { colors } from '../../assets/style';
import { ListItem, Input } from "react-native-elements";
import { actions as editActions } from '../../store/edit';
import { includesLower, useDebounce } from '../../util';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import Requests from '../../api';
import Moment from 'moment';


export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => { loadGroups() }, []);
    async function loadGroups() {
        setLoading(true);
        const [status, response] = await Requests.GET('profile/groups', user.jwt);
        setLoading(false);
        if (status == 200) {
            setAllGroups(response);
        } else {
            Toast.show("Failed to load groups!");
            console.log('Error occured while fetching groups!', status);
        }
    }

    useEffect(() => {
        setGroups(allGroups.filter(group => !search || includesLower(group.name, search)));
    }, [debouncedSearch, allGroups]);

    function openGroup(id) {
        dispatch(editActions.setId('groupId', id));
        navigation.getParent()?.navigate('Group');
    }

    function renderItem(item) {
        return (
            <ListItem
                key={item.id}
                topDivider
                onPress={() => openGroup(item.id)}
                containerStyle={{ backgroundColor: colors.dark }}
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
        <View style={{ backgroundColor: colors.dark, flex: 1 }}>
            <Input
                placeholder='Search'
                leftIcon={{ type: 'ion-icons', name: 'search', color: colors.plain }}
                onChangeText={setSearch}
                inputStyle={{ 'color': colors.plain }}
                containerStyle={{ marginBottom: -15 }}
                value={search}
            />
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