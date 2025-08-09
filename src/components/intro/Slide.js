import { View } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";
import styles from "./styles/Slide.style";
const Slide = ({ item }) => {
    return (
        <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Image
            
                source={item.animation}
                contentFit="contain"
                style={styles.image}
            />
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );
};
export default Slide;
