import { Input } from 'react-native-elements';
import { colors } from '../../assets/style';

function typeHandle(type, value) {
    switch (type) {
        case 'NUMBER':
            return value.replace(/[^0-9]/g, '');
        default:
            return value;
    }

}

export default function ({ onChangeText, value, placeholder, margin, secureTextEntry, type }) {
    function onChangeTextWrapper(value) {
        const newVal = typeHandle(type, value);
        onChangeText(newVal);
    }

    return (
        <Input
            onChangeText={onChangeTextWrapper}
            inputStyle={{ 'color': colors.plain, backgroundColor: colors.gray, borderRadius: 10, paddingLeft: 10 }}
            containerStyle={{ marginBottom: -25 + margin, marginTop: margin }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    )
}