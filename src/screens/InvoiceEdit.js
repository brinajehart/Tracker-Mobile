import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { colors } from '../assets/style';
import Requests from '../api';

export default ({ navigation }) => {
    const invoiceId = useSelector(state => state.edit?.InvoiceEdit);
    const isLoading = useSelector(state => state.user.isFetching === true);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [invoice, setInvoice] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (invoiceId) {
            loadInvoice();
        }
    }, []);
    
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

    return (
        <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center' }}>
            {invoiceId
                ? <Text>{JSON.stringify(invoice)}</Text>
                : <Text>create invoice</Text>
            }
        </View>
    )
}