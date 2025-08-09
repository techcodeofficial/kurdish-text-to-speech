import React, { useState, useEffect, useRef } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import { Image } from "expo-image";
import { createAudioPlayer, useAudioPlayer } from "expo-audio";
import Slider from "@react-native-community/slider";
import audioSource from "../../assets/music.mp3";
const { width } = Dimensions.get("window");
import equilizerGif from "../../assets/player/equilizer.gif";
export default function AudioPlayer() {
    const [speed, setSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const sliderRef = useRef({ triger: false });
    const animationRef = useRef(null);
    const player = useAudioPlayer(audioSource);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
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
            animationRef.current.startAnimating();
            await player.play();
            setIsPlaying(true);
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
        player.seekTo(value / 1000);
        player.play();
        animationRef.current.startAnimating();
        setIsPlaying(true);
    };
    return (
        <View style={styles.container}>
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
            <View style={styles.progressRow}>
                <Text style={styles.timeText}>{formatTime(current)}</Text>
                <Slider
                    style={styles.progressSlider}
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

            <View style={styles.controls}>
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
                                    ? styles.activeBtnText
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
                    <Text style={styles.playPauseText}>
                        {isPlaying ? "⏸" : "▶"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center"
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.85
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
    activeBtnText: { color: "#111" },
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
