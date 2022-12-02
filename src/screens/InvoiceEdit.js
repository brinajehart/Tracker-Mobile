import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View, Text, Image, PermissionsAndroid, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { colors, formTitleStyle } from '../assets/style';
import Requests from '../api';
import FloatingButtonSubmit from '../components/FloatingButtonSubmit';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { launchCamera } from 'react-native-image-picker';
import { Form } from '../components/form';
import { useImageAspectRatio, fromCurrencyToEuro } from '../util';

export default ({ navigation }) => {
    const invoiceId = useSelector(state => state.edit?.InvoiceEdit);
    const currency = useSelector(state => state.currency.currency);
    const groupId = useSelector(state => state.edit?.Group);
    const user = useSelector(state => state.user);

    const [invoice, setInvoice] = useState({
        amount: 0,
        group_id: groupId
    });
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState([]);
    const aspectRatio = useImageAspectRatio(invoice?.image);

    useEffect(() => {
        if (invoiceId) {
            loadInvoice();
        }
    }, [invoiceId]);

    useEffect(() => {
        getStores();
    }, []);

    async function loadInvoice() {
        setLoading(true);
        const [status, response] = await Requests.GET(`invoice?id=${invoiceId}`, user.jwt);
        setLoading(false);
        if (status == 200) {
            setInvoice({
                ...invoice,
                ...response,
                image: response?.image ?? '/'
            });
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
        const invoiceData = {
            ...invoice, 
            amount: fromCurrencyToEuro(invoice.amount, currency),
            image: invoice?.image
        };

        if (invoiceId) {
            const [status, _] = await Requests.updateInvoice(user.jwt, invoiceData);
            if (status === 200) {
                Toast.show('Invoice update success!');
            } else {
                Toast.show('Failed to update invoice!');
            }
        } else {
            const [status, _] = await Requests.createInvoice(user.jwt, invoiceData);
            if (status === 200) {
                Toast.show('New invoice was created!');
            } else {
                Toast.show('Failed to create invoice!');
            }
        }
        
        setLoading(false);
    }

    async function getImage() {
        const isCameraPermitted = await requestCameraPermission();
        const isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            const options = {
                maxHeight: 300,
                maxWidth: 300,
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: true,
            };

            const result = await launchCamera(options);
            if (result.assets?.[0]?.base64) {
                return 'data:image/png;base64,' + result.assets[0].base64;
            } else {
                Toast.show('Error image not found!');
                return null;
            }
        } else {
            Toast.show('Error missing permissions!');
            return null;
        }
    }

    async function openCamera() {
        const image = await getImage();
        console.log(image);
        if (image) {
            setInvoice({ ...invoice, image });
        }
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
                    <View style={{
                        width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 20, paddingRight: 10
                    }}>
                        <Text style={formTitleStyle}>
                            Invoice image
                        </Text>
                        <Button
                            icon={
                                <FontAwesome5Icon
                                    name="camera"
                                    size={25}
                                    color={colors.dark}
                                />
                            }
                            title=""
                            buttonStyle={{
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                                backgroundColor: colors.primary,
                            }}
                            containerStyle={{
                                elevation: 10,
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                            }}
                            onPress={openCamera}
                        />
                    </View>
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

const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: 'Camera Permission',
                message: 'App needs camera permission',
            });

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            Toast.show(
                'Invalid permissions!',
                Toast.SHORT
            );
            return false;
        }
    } else return true;
};

const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
            });

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            Toast.show(
                'Invalid permissions!',
                Toast.SHORT
            );
        }
        return false;
    } else return true;
};