import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { colors } from '../../assets/style';
import { includesLower, useDebounce, formatAmount } from '../../util';
import { actions as editActions } from '../../store/edit';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import Requests from '../../api';
import Moment from 'moment';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [allInvoices, setAllInvoices] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => { loadInvoices() }, []);
    async function loadInvoices() {
        setLoading(true);
        const [status, response] = await Requests.GET('profile/invoices', user.jwt);
        setLoading(false);
        if (status == 200) {
            setAllInvoices(response);
        } else {
            Toast.show("Failed to load invoices!");
            console.log('Error occured while fetching invoices!', status);
        }
    }

    useEffect(() => {
        setInvoices(allInvoices.filter(invoice => {
            if (!search) return true;
            return includesLower(invoice.group_name, search) || `${invoice.amount}`.includes(search);
        }))
    }, [debouncedSearch, allInvoices]);

    function oepnInvoice(id) {
        dispatch(editActions.setId('InvoiceEdit', id));
        navigation.getParent()?.navigate('InvoiceEdit');
    }

    function renderItem(item) {
        return (
            <ListItem
                key={item.id}
                topDivider
                onPress={() => oepnInvoice(item.id)}
                containerStyle={{ backgroundColor: colors.dark }}
            >
                <FontAwesome5Icon name={'file-invoice'} size={25} color={colors.primary} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.plain, fontWeight: 'bold' }}>{`${item.group_name} - ${formatAmount(item.amount)}`}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colors.plain }}>{Moment(item.date).format('DD.MM.YYYY')}</ListItem.Subtitle>
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
                data={invoices}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderItem(item)}
                refreshing={loading}
                onRefresh={loadInvoices}
            />
        </View>
    )
}