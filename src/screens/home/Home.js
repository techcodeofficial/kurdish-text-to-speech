import { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import TextAreaInput from "../../components/utils/TextAreaInput";
import Equalizer from "../../components/utils/Equalizer";
import axios from "axios";
import loadingGif from "../../assets/player/loading.gif";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Home = () => {
    let { t } = useTranslation();
    const { colors } = useTheme();
    const { bottom } = useSafeAreaInsets();
    let [text, setText] = useState();
    let [url, setUrl] = useState();
    let [loading, setLoading] = useState(false);
    const toSpeechHandler = async () => {
        if (!text) {
            //show toast
            return;
        }
        setUrl(false);
        setLoading(true);
        const data = {
            sentences: text,
            format: "mp3"
        };
        try {
            let response = await axios.post(
                "https://tts.bla.iq/text-to-speech-krmanji",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "User-Agent":
                            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
                        Referer: "https://asosoft.com/"
                    }
                }
            );
            setLoading(false);
            setUrl(response.data);
        } catch (e) {
            setLoading(false);
            //show toast
        }
    };
    return (
        <View style={[styles.container, { paddingBottom: bottom }]}>
            <View style={styles.inputContainer}>
                <TextAreaInput
                    value={text}
                    maxLength={500}
                    onChangeText={text => setText(text)}
                    placeholder={t("tts.textAreaPlaceholder")}
                />
                <TouchableOpacity
                    onPress={toSpeechHandler}
                    style={styles.button}
                >
                    <Text style={{ color: colors.onBackground }}>
                        {t("tts.convertButton")}
                    </Text>
                </TouchableOpacity>
            </View>
            {url && <Equalizer uri={url} />}
            {loading && (
                <View
                    style={[
                        styles.loadingContainer,
                        { backgroundColor: colors.background }
                    ]}
                >
                    <Image
                        contentFit="cover"
                        autoplay={true}
                        source={loadingGif}
                        style={styles.loadingImage}
                    />
                    <Text
                        style={[
                            styles.loadingText,
                            { color: colors.onBackground }
                        ]}
                    >
                        {t("const.loadingText")}
                    </Text>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    inputContainer: { alignItems: "center" },

    button: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 10,
        fontSize: 20
    },
    loadingContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        borderRadius: 10
    },
    loadingImage: {
        width: "70%",
        height: "70%"
    },
    loadingText: {
        marginTop: -90,
        fontSize: 25,
        fontWeight: "bold"
    }
});

export default Home;
