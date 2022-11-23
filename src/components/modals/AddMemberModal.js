import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
import { colors } from '../../assets/style';
import Requests from '../../api';
import Toast from 'react-native-simple-toast';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

export default function ({ visible, setVisible, groupId, reloadMembers }) {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState(null);
    const jwt = useSelector(state => state.user.jwt);

    useEffect(() => {
        // when opening modal reload potential members
        if (visible) {
            loadPotentialMembers();
        }
    }, [visible]);

    async function loadPotentialMembers() {
        const [status, membersResponse] = await Requests.potentialMembers(groupId);
        if (status !== 200) {
            Toast.show('Failed to load members');
            return;
        }

        if (membersResponse?.length) {
            setNewMember(membersResponse[0].id);
        }

        setMembers(membersResponse);
    }

    async function handleAddMember() {
        if (!newMember) return;

        const [status, _] = await Requests.addMember(jwt, newMember, groupId);
        if (status === 200) {
            reloadMembers();
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
            <Picker
                selectedValue={newMember}
                style={{ color: colors.plain }}
                onValueChange={(itemValue, _) => setNewMember(itemValue)}>
                {members.map(member => <Picker.Item key={member.id} label={member.fullname} value={member.id} />)}
            </Picker>
            <Button
                titleStyle={{ color: colors.dark }}
                buttonStyle={{ backgroundColor: colors.submit }}
                onPress={handleAddMember} title={'Add member'} />
        </Overlay>
    )
}