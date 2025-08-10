import Textarea from "react-native-textarea";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
const TextAreaInput = props => {
    let { colors } = useTheme();
    return (
        <Textarea
            containerStyle={[
                styles.textareaContainer,
                { backgroundColor: colors.background },
                props.containerStyle
            ]}
            style={[
                styles.textarea,
                {
                    backgroundColor: colors.background,
                    color: colors.onBackground
                },
                props.style
            ]}
            onChangeText={props.onChangeText ? props.onChangeText : () => null}
            defaultValue={props.value}
            maxLength={props.maxLength?props.maxLength:200}
            placeholder={props.placeholder}
            placeholderTextColor={
                props.placeholderTextColor
                    ? props.placeholderTextColor
                    : "#c7c7c7"
            }
            underlineColorAndroid={
                props.underlineColorAndroid
                    ? props.underlineColorAndroid
                    : "transparent"
            }
        />
    );
};
const styles = StyleSheet.create({
    textareaContainer: {
        height: 180,
        backgroundColor: "#F5FCFF",
        padding: 10,
        borderRadius: 10
    },
    textarea: {
        textAlignVertical: "top",
        height: 170,
        fontSize: 14,
        color: "#333"
    }
});

export default TextAreaInput;
