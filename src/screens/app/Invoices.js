import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { colors } from '../../assets/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Requests from '../../api';
import Moment from 'moment';

export default ({ navigation }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => { loadInvoices() }, []);
    async function loadInvoices() {
        setLoading(true);
        const [status, response] = await Requests.GET('profile/invoices', user.jwt);
        setLoading(false);
        if (status == 200) {
            setInvoices(response);
        } else {
            // show toast
            console.log('Error occured while fetching invoices!', status);
        }
    }

    function oepnInvoice(id) {
        console.log("open invoice called...", id);
    }

    function renderItem(item) {
        return (
            <ListItem
                key={item.id}
                topDivider
                onPress={() => oepnInvoice(item.id)}
                containerStyle={{ backgroundColor: colors.dark}}
            >
                <FontAwesome5Icon name={'file-invoice'} size={25} color={colors.primary} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.plain, fontWeight: 'bold' }}>{`${item.group_name} - ${item.amount} EUR`}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colors.plain }}>{Moment(item.date).format('DD.MM.YYYY')}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }

    return (
        <View style={{ backgroundColor: colors.dark, flex: 1}}>
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