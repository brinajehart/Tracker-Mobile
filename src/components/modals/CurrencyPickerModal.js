import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { colors } from '../../assets/style';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { CURRENCY_CONVERSIONS } from '../../util';
import { actions } from '../../store/currency';

const windowWidth = Dimensions.get('window').width;
const currencyOptions = Object.keys(CURRENCY_CONVERSIONS);

export default function ({ visible, setVisible }) {
    const [currency, setCurrency] = useState('');
    const dispatch = useDispatch();
    const currencyFromStorage = useSelector(state => state.currency.currency);

    useEffect(() => {
        setCurrency(currencyFromStorage);
    }, [currencyFromStorage]);

    async function handleSetCurrency() {
        dispatch(actions.setCurrency(currency));
        setVisible(false);
    }

    return (
        <Overlay
            overlayStyle={{
                backgroundColor: colors.dark2,
                width: windowWidth * .9
            }}
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}>
            <Picker
                selectedValue={currency}
                onValueChange={(itemValue, _) => setCurrency(itemValue)}>
                {currencyOptions.map(currency => <Picker.Item key={currency} label={currency} value={currency} />)}
            </Picker>
            <Button
                titleStyle={{ color: colors.dark }}
                buttonStyle={{ backgroundColor: colors.submit }}
                onPress={handleSetCurrency} title={'Set currency'} />
        </Overlay>
    )
}