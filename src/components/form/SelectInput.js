import { Picker } from "@react-native-picker/picker"
import { View } from "react-native"
import { colors } from "../../assets/style"

export default function ({ value, onValueChange, options, margin }) {
    return (
        <View style={{ borderRadius: 10, overflow: 'hidden', marginHorizontal: 10, marginVertical: margin }}>
            <Picker
                selectedValue={value}
                style={{ color: colors.plain, backgroundColor: colors.gray }}
                onValueChange={onValueChange}>
                {options}
            </Picker>
        </View>
    )
}