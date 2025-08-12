import { useState, useEffect, useRef } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import { useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { useAudioPlayer } from "expo-audio";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";
import useStyleDirection from "../../hooks/useStyleDirection";
const { width } = Dimensions.get("window");
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import equilizerGif from "../../assets/player/equilizer.gif";
import Toast from "react-native-toast-message"
import { useTranslation } from "react-i18next";
const AudioPlayer = ({ uri }) => {
    const [speed, setSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const sliderRef = useRef({ triger: false });
    const animationRef = useRef(null);
    const player = useAudioPlayer({ uri });
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    const { colors } = useTheme();
    let { t } = useTranslation();
    const isRTL = useStyleDirection();
    player.addListener("playbackStatusUpdate", status => {
        if (status.didJustFinish) {
            setIsPlaying(false);
            animationRef.current.stopAnimating();
        }
        if (!sliderRef.triger) {
            setCurrent(status.currentTime * 1000);
        }
    });
    useEffect(() => {
        setDuration(player.currentStatus.duration * 1000);
    }, [player.currentStatus.duration]);
    const formatTime = ms => {
        const totalSec = Math.floor(ms / 1000);
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        return `${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };
    const togglePlayPause = async () => {
        if (isPlaying) {
            await player.pause();
            animationRef.current.stopAnimating();
            setIsPlaying(false);
        } else {
            if (player.currentStatus.isLoaded) {
                animationRef.current.startAnimating();
                if (current >= duration) {
                    player.seekTo(0);
                }
                await player.play();
                setIsPlaying(true);
            }
        }
    };

    const changeSpeed = async newSpeed => {
        let speed = newSpeed;
        switch (speed) {
            case 1:
                speed = 1;
                break;
            case 2:
                speed = 2 * 0.7;
                break;
            default:
                speed = 1 * 0.75;
                break;
        }
        player.setPlaybackRate(speed);
        setSpeed(newSpeed);
    };

    const onSliderValueChange = value => {
        if (sliderRef.triger) {
            setCurrent(value);
        }
    };

    const onSlidingStart = () => {
        sliderRef.triger = true;
    };

    const onSlidingComplete = async value => {
        sliderRef.triger = false;
        if (player.currentStatus.isLoaded) {
            player.seekTo(value / 1000);
            player.play();
            animationRef.current.startAnimating();
            setIsPlaying(true);
        }
    };

    const downloadAndShare = async () => {
        try {
            if (!(await Sharing.isAvailableAsync())) {
                Toast.show({
                    type: "custom_toast",
                    text1: t("errors.title"),
                    text2: t("errors.shareError"),
                    props: { isRTL },
                    position: "top",
                    visibilityTime: 3000
                });
            }
            const fileUri = FileSystem.cacheDirectory + "music.mp3";

            const { uri: fileUriSystem } = await FileSystem.downloadAsync(
                uri,
                fileUri
            );
            await Sharing.shareAsync(fileUriSystem);
            await FileSystem.deleteAsync(fileUriSystem, { idempotent: true });
        } catch (error) {
            Toast.show({
                    type: "custom_toast",
                    text1: t("errors.title"),
                    text2: t("errors.shareError"),
                    props: { isRTL },
                    position: "top",
                    visibilityTime: 3000
                });
        }
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background
                }
            ]}
        >
            <Image
                contentFit="cover"
                autoplay={false}
                ref={animationRef}
                source={equilizerGif}
                style={{
                    width: "85%",
                    height: 100
                }}
            />
            <View
                style={[
                    styles.progressRow,
                    { flexDirection: isRTL ? "row-reverse" : "row" }
                ]}
            >
                <Text style={styles.timeText}>{formatTime(current)}</Text>
                <Slider
                    style={[styles.progressSlider, isRTL && styles.rtlSlider]}
                    minimumValue={0}
                    maximumValue={duration}
                    value={current}
                    onValueChange={onSliderValueChange}
                    onSlidingStart={onSlidingStart}
                    onSlidingComplete={onSlidingComplete}
                    minimumTrackTintColor="#4cafef"
                    maximumTrackTintColor="#333"
                    thumbTintColor="#4cafef"
                />
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            <View
                style={[
                    styles.controls,
                    { flexDirection: isRTL ? "row-reverse" : "row" }
                ]}
            >
                {[0.5, 1, 2].map(s => (
                    <TouchableOpacity
                        key={s}
                        style={[
                            styles.btn,
                            speed === s ? styles.activeBtn : styles.inactiveBtn
                        ]}
                        onPress={() => changeSpeed(s)}
                    >
                        <Text
                            style={[
                                styles.btnText,
                                speed === s
                                    ? { color: colors.onBackground }
                                    : styles.inactiveBtnText
                            ]}
                        >
                            {s}x
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.playPauseBtn}
                    onPress={togglePlayPause}
                >
                    <Text style={{ color: colors.onBackground }}>
                        {isPlaying ? (
                            <Icon name="pause" size={30} />
                        ) : (
                            <Icon name="play" size={30} />
                        )}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[
                    styles.btn,
                    styles.activeBtn,
                    {
                        position: "absolute",
                        bottom: 20
                    }
                ]}
                onPress={downloadAndShare}
            >
                <Icon
                    style={{ color: colors.onBackground }}
                    name="share"
                    size={30}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        position: "relative"
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.85
    },
    rtlSlider: {
        transform: [{ rotate: "180deg" }]
    },
    timeText: {
        color: "#4cafef",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 12
    },
    progressSlider: { flex: 1, height: 40, marginHorizontal: 8 },
    controls: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#4cafef"
    },
    activeBtn: { backgroundColor: "#4cafef" },
    inactiveBtn: { backgroundColor: "transparent" },
    btnText: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
    inactiveBtnText: { color: "#4cafef" },
    playPauseBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#4cafef",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        elevation: 5
    },
    playPauseText: { color: "#111", fontSize: 30, fontWeight: "bold" }
});

export default AudioPlayer;
