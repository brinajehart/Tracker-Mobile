import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
import { colors } from '../../assets/style';
import { useSelector } from 'react-redux';
import Requests from '../../api';
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;

export default function ({ visible, setVisible, groupId, reloadShoppingItem }) {
    const jwt = useSelector(state => state.user.jwt);
    const [item, setItem] = useState('');

    async function handleAddItem() {
        if (!item) return;

        const [status, _] = await Requests.addShoppingItem(jwt, item, groupId);
        if (status === 200) {
            reloadShoppingItem();
            setItem('');
            setVisible(false);
        } else {
            Toast.show("Failed to add shopping item");
        }
    }

    return (
        <Overlay
            overlayStyle={{
                backgroundColor: colors.dark2,
                width: windowWidth * .9
            }}
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}>
            <Input
                onChangeText={setItem}
                inputStyle={{ 'color': colors.plain }}
                containerStyle={{ marginBottom: -15 }}
                value={item}
                placeholder='Shopping item'
            />
            <Button
                titleStyle={{ color: colors.dark }}
                buttonStyle={{ backgroundColor: colors.submit }}
                onPress={handleAddItem} title={'Add shopping item'} />
        </Overlay>
    )
}