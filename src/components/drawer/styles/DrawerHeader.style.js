import {StyleSheet} from "react-native"
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10
    },
    coin: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 3
    },
    coinBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 50
    },
    image: {
        width: 25,
        height: 25
    }
});
export default styles