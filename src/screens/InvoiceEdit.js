import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View, Text, Image } from 'react-native';
import Toast from 'react-native-simple-toast';
import { colors, formTitleStyle } from '../assets/style';
import Requests from '../api';
import FloatingButtonSubmit from '../components/FloatingButtonSubmit';
import { Form } from '../components/form';
import { useImageAspectRatio } from '../util';

export default ({ navigation }) => {
    const invoiceId = useSelector(state => state.edit?.InvoiceEdit);
    const currency = useSelector(state => state.currency.currency);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const [invoice, setInvoice] = useState({ amount: 0 });
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const aspectRatio = useImageAspectRatio(invoice?.image);

    useEffect(() => {
        if (invoiceId) {
            loadInvoice();
            getStores();
        }
    }, [invoiceId]);

    async function loadInvoice() {
        setLoading(true);
        const [status, response] = await Requests.GET(`invoice?id=${invoiceId}`, user.jwt);
        setLoading(false);
        if (status == 200) {
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
                        <Text style={{ color: colors.primary }}>{` ${currency}`}</Text>
                    </Text>
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
                    <View style={{ marginHorizontal: 10, marginBottom: 100 }}>
                    {invoice?.image && invoice.image !== '/'
                        ? <Image
                            style={{
                                borderRadius: 10,
                                width: '100%',
                                aspectRatio
                            }}
                            source={{ uri: invoice.image }}
                        />
                        : null}
                    </View>
                    
                </View>
            </ScrollView>
            <FloatingButtonSubmit onPress={handleSubmit} title={`${invoiceId ? 'Update' : 'Create'} invoice`} loading={loading} bottomOffset={20} />
        </>

    )
}