import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { Input, ListItem, Button } from 'react-native-elements';
import { colors } from '../../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDebounce, includesLower } from '../../util';
import Requests from '../../api';
import FloatingButton from '../../components/FloatingButton';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const groupId = useSelector(state => state.edit?.groupId);

    const [loading, setLoading] = useState(false);
    const [shoppingItems, setShoppingItems] = useState([]);
    const [allShoppingItems, setAllShoppingItems] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => { loadShoppingItems() }, []);
    async function loadShoppingItems() {
        setLoading(true);
        const [status, response] = await Requests.GET(`group/shopping-items?id=${groupId}`, user.jwt);
        setLoading(false);
        if (status == 200) {
            setAllShoppingItems(response);
        } else {
            Toast.show("Failed to load shoppingItems!");
            console.log('Error occured while fetching shoppingItems!', status);
        }
    }

    function openMemberDetail(id) {
        console.log("member detail", id);
    }

    useEffect(() => {
        setShoppingItems(allShoppingItems.filter(item => !search || includesLower(item.name, search)));
    }, [debouncedSearch, allShoppingItems]);

    function renderItem(item) {
        return (
            <ListItem
                key={item.id}
                topDivider
                onPress={() => openMemberDetail(item.id)}
                containerStyle={{ backgroundColor: colors.dark }}
            >
                <FontAwesome5Icon name={'th-list'} size={25} color={colors.primary} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.plain, fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colors.plain }}>Added by: {item.fullname}</ListItem.Subtitle>
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
                    data={shoppingItems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderItem(item)}
                    refreshing={loading}
                    onRefresh={loadShoppingItems}
                />
            </View>
            <FloatingButton onPress={() => console.log("add shopping item")} />
        </>
    )
}