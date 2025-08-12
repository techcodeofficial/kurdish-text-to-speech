import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import asoSoftImage from "../../assets/about/AsoSoft.png";
import githubDark from "../../assets/about/github.png";
const About = () => {
    let { bottom } = useSafeAreaInsets();
    let { colors } = useTheme();

    const asosoftOpener = async () => {
        let url = "https://asosoft.github.io";
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };
    const githubUrlOpener = async () => {
        let url = "https://github.com/techcodeofficial";
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };

    return (
        <View style={[styles.container, { paddingBottom: bottom + 10 }]}>
            <View
                style={[
                    styles.aboutBox,
                    { backgroundColor: colors.background }
                ]}
            >
                <TouchableOpacity onPress={asosoftOpener}>
                    <Image
                        source={asoSoftImage}
                        width={100}
                        height={100}
                        contentFit="contain"
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: colors.onBackground,
                        fontSize: 10,
                        textAlign: "center"
                    }}
                >
                    ASOSOFT SOFTWARE
                </Text>
            </View>
            <View
                style={[
                    styles.aboutBox,
                    {
                        backgroundColor: colors.background
                    }
                ]}
            >
                <TouchableOpacity onPress={githubUrlOpener}>
                    <Image
                        source={githubDark}
                        width={100}
                        height={100}
                        contentFit="contain"
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: colors.onBackground,
                        fontSize: 10,
                        textAlign: "center"
                    }}
                >
                    DEVELOPER GITHUB
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "space-around"
    },
    aboutBox: {
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
        padding: 100,
        width: "90%",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default About;
