import BackdropInput from "./BackdropInput";
import NotesInput from "./NotesInput";
import SelectInput from "./SelectInput";
import { Picker } from "@react-native-picker/picker";

export const Form = {
    Text: BackdropInput,
    Notes: NotesInput,
    Select: SelectInput,
    SelectItem: Picker.Item
};