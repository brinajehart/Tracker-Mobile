import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { Input, ListItem, Button } from 'react-native-elements';
import { colors } from '../../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDebounce, includesLower } from '../../util';
import Requests from '../../api';
import FloatingButton from '../../components/FloatingButton';
import Toast from 'react-native-simple-toast';
import Moment from 'moment';
import AddShoppingItemModal from '../../components/modals/AddShoppingItemModal';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const groupId = useSelector(state => state.edit?.Group);

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shoppingItems, setShoppingItems] = useState([]);
    const [allShoppingItems, setAllShoppingItems] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);

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

    async function deleteShoppingItem(id) {
        setLoading(true);
        const [status, response] = await Requests.deleteShoppingItem(id, user.jwt);
        if (status != 200) {
            Toast.show("Failed to delete shopping item!");
            console.log('Error while deleting shopping item');
        } else {
            Toast.show("Succesfully deleted shopping list item!");
            loadShoppingItems();
        }
    }

    useEffect(() => {
        setShoppingItems(allShoppingItems.filter(item => !search || includesLower(item.name, search)));
    }, [debouncedSearch, allShoppingItems]);

    function renderItem(item) {
        return (
            <ListItem.Swipeable
                key={item.id}
                topDivider
                containerStyle={{ backgroundColor: colors.dark }}
                rightContent={
                    <Button
                        title=""
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        onPress={() => deleteShoppingItem(item.id)}
                    />
                }
            >
                <FontAwesome5Icon name={'th-list'} size={25} color={colors.primary} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.plain, fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colors.plain }}>Added by: {item.fullname} - {Moment(item.created_at).format('DD.MM.YYYY')}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem.Swipeable>
        )
    }

    return (
        <>
            <AddShoppingItemModal visible={modalVisible} setVisible={setModalVisible} groupId={groupId} reloadShoppingItem={loadShoppingItems} />
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
            <FloatingButton onPress={() => setModalVisible(true)} />
        </>
    )
}