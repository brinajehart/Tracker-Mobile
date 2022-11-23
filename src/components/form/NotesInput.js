import { Input } from 'react-native-elements';
import { colors } from '../../assets/style';

export default function ({ onChangeText, value, placeholder, margin }) {
    return (
        <Input
            textAlignVertical={'top'}
            numberOfLines={3}
            onChangeText={onChangeText}
            inputStyle={{ 'color': colors.plain, backgroundColor: colors.gray, borderRadius: 10, paddingLeft: 10 }}
            containerStyle={{ marginBottom: -25 + margin, marginTop: margin }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            value={value}
            placeholder={placeholder}
        />
    )
}