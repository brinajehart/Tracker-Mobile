import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, FlatList } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { colors } from '../../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDebounce, includesLower } from '../../util';
import Requests from '../../api';
import Moment from 'moment';
import FloatingButton from '../../components/FloatingButton';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const groupId = useSelector(state => state.edit?.groupId);

    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => { loadMembers() }, []);
    async function loadMembers() {
        setLoading(true);
        const [status, response] = await Requests.GET(`group/members?id=${groupId}`, user.jwt);
        setLoading(false);
        if (status == 200) {
            setAllMembers(response);
        } else {
            Toast.show("Failed to load members!");
            console.log('Error occured while fetching members!', status);
        }
    }

    function openMemberDetail(id) {
        console.log("member detail", id);
    }

    useEffect(() => {
        setMembers(allMembers.filter(member => !search || includesLower(member.fullname, search)));
    }, [debouncedSearch, allMembers]);

    function renderItem(item) {
        return (
            <ListItem
                key={item.id}
                topDivider
                onPress={() => openMemberDetail(item.id)}
                containerStyle={{ backgroundColor: colors.dark }}
            >
                <FontAwesome5Icon name={'user'} size={25} color={colors.primary} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.plain, fontWeight: 'bold' }}>{item.fullname}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colors.plain }}>Joined: {Moment(item.joined_at).format('DD.MM.YYYY')}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }

    return (
        <>
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
                    data={members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderItem(item)}
                    refreshing={loading}
                    onRefresh={loadMembers}
                />
            </View>
            <FloatingButton onPress={() => console.log("add member")} />
        </>
    )
}