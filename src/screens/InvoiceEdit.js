import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { colors, formTitleStyle } from '../assets/style';
import Requests from '../api';
import FloatingButtonSubmit from '../components/FloatingButtonSubmit';
import { Form } from '../components/form';

export default ({ navigation }) => {
    const invoiceId = useSelector(state => state.edit?.InvoiceEdit);
    const currency = useSelector(state => state.currency.currency);
    const isLoading = useSelector(state => state.user.isFetching === true);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [invoice, setInvoice] = useState({});
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        if (invoiceId) {
            loadInvoice();
            getStores();
        }
    }, []);

    async function loadInvoice() {
        setLoading(true);
        const [status, response] = await Requests.GET(`invoice?id=${invoiceId}`, user.jwt);
        setLoading(false);
        if (status == 200) {
            console.log(response);
            setInvoice(response);
        } else {
            Toast.show("Failed to load invoice!");
            console.log('Error occured while fetching invoice data!', status);
        }
    }

    async function getStores() {
        const [status, storesResponse] = await Requests.GET('stores');
        if (status !== 200) {
            Toast.show("Error fetching stores!");
            return;
        }

        setStores(storesResponse);
    }

    async function handleSubmit() {
        setLoading(true);
    }

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: colors.dark }}>
                <View style={{ backgroundColor: colors.dark, borderRadius: 10, width: '100%', padding: 10, marginTop: 15 }}>
                    <Text style={formTitleStyle}>
                        Invoice data -
                        <Text style={{ color: colors.primary}}>{` ${currency}`}</Text>
                    </Text>43
                    <View style={{ paddingVertical: 10 }}>
                        <Form.Text
                            onChangeText={(amount) => setInvoice({ ...invoice, amount })}
                            value={invoice?.amount + ''}
                            placeholder='Amount'
                            type={'NUMBER'}
                            margin={5}
                        />
                        <Form.Select
                            value={invoice?.store_id}
                            onValueChange={(store_id) => setInvoice({ ...invoice, store_id })}
                            options={stores.map(store => <Form.SelectItem key={store.id} label={store.name} value={store.id} />)}
                            margin={5}
                        />
                        <Form.Notes
                            onChangeText={(notes) => setInvoice({ ...invoice, notes })}
                            value={invoice?.notes}
                            placeholder='Notes'
                            margin={5}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: colors.dark, borderRadius: 10, width: '100%', padding: 10, marginTop: 15 }}>
                    <Text style={formTitleStyle}>
                        Invoice image
                    </Text>
                </View>
            </ScrollView>
            <FloatingButtonSubmit onPress={handleSubmit} title={'Update invoice'} loading={loading} bottomOffset={20} />
        </>

    )
}