import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles/Buttons.style";
const Button = props => {
    return (
        <TouchableOpacity {...props} style={[styles.button, props.buttonStyle]}>
            <Text style={styles.buttonText}>{props.body}</Text>
        </TouchableOpacity>
    );
};

export default Button;
