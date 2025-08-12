import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
const CustomToast = ({ text1, text2, isRTL }) => {
    const { colors } = useTheme();
    return (
        <View
            style={[
                styles.toastContainer,
                isRTL ? styles.rtl : styles.ltr,
                { backgroundColor: colors.background }
            ]}
        >
            <Text
                style={[
                    styles.text1,
                    {
                        color: colors.onBackground,
                        textAlign: isRTL ? "right" : "left",
                        writingDirection: isRTL ? "rtl" : "ltr"
                    }
                ]}
            >
                {text1}
            </Text>
            {text2 ? (
                <Text
                    style={[
                        styles.text2,
                        {
                            color: colors.onBackground,
                            textAlign: isRTL ? "right" : "left",
                            writingDirection: isRTL ? "rtl" : "ltr"
                        }
                    ]}
                >
                    {text2}
                </Text>
            ) : null}
        </View>
    );
};
const styles = StyleSheet.create({
    toastContainer: {
        width: "90%",
        padding: 15,
        borderRadius: 8,
        shadowColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5
    },
    rtl: {
        flexDirection: "row-reverse"
    },
    ltr: {
        flexDirection: "row"
    },
    text1: {
        fontWeight: "bold",
        fontSize: 16,
        flex: 1
    },
    text2: {
        fontSize: 14,
        flex: 1
    }
});
export default CustomToast;
