import TextAreaInput from "../../components/utils/TextAreaInput";
import Equalizer from "../../components/utils/Equalizer";
import { View, StyleSheet } from "react-native";
const Home = () => {
    return (
        <View style={styles.container}>
            <TextAreaInput placeholder="سلاو" />
            <Equalizer />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});

export default Home;
