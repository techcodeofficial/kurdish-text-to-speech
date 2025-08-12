import { Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
const DrawerCloseButton = ({ closeDrawer }) => {
    let { colors } = useTheme();
    return (
        <Pressable
            onPress={closeDrawer}
            style={{
                paddingHorizontal: 13,
                paddingVertical: 10,
                borderRadius: 50,

            }}
        >
            <FontAwesome
                name="close"
                style={{
                    fontSize: 25,
                    color: colors.onBackground
                }}
            ></FontAwesome>
        </Pressable>
    );
};

export default DrawerCloseButton;
