import { useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { View, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { unSeted } from "../../reducers/intro/introSlice";
import { useTheme } from "react-native-paper";
import Slide from "../../components/intro/Slide";
import Button from "../../components/intro/Button";
import welcomeGif from "../../assets/intro/welcome.gif";
import quickGif from "../../assets/intro/quick.gif";
import freeGif from "../../assets/intro/free.gif";
import startGif from "../../assets/intro/start.gif";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Introduction = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { bottom } = useSafeAreaInsets();
    const slides = [
        {
            key: "one",
            animation: welcomeGif,
            title: t("intro.welcome"),
            text: t("intro.welcomeDesc")
        },

        {
            key: "two",
            animation: quickGif,
            title: t("intro.quick"),
            text: t("intro.quickDesc")
        },
        {
            key: "three",
            animation: freeGif,
            title: t("intro.free"),
            text: t("intro.freeDesc")
        },
        {
            key: "four",
            animation: startGif,
            title: t("intro.start"),
            text: t("intro.startDesc")
        }
    ];
    const handleSnapToItem = index => {
        setCurrentIndex(ref.current.getCurrentIndex());
        if (index === 0 && activeIndex === 0) {
            ref.current.scrollTo(1);
        } else if (
            index === slides.length - 1 &&
            activeIndex === slides.length - 1
        ) {
            ref.current.scrollTo(slides.length - 2);
        } else {
            setActiveIndex(index);
        }
    };
    const { width, height } = Dimensions.get("window");
    const handleStart = async () => {
        await AsyncStorage.setItem("logged", "true");
        dispatch(unSeted());
    };
    return (
        <View
            style={{
                width,
                height: "100%",
                backgroundColor: colors.background
            }}
        >
            <Carousel
                ref={ref}
                data={slides}
                width={width}
                height={height}
                style={{ height: "100%" }}
                renderItem={Slide}
                loop={false}
                scrollAnimationDuration={0}
                onSnapToItem={handleSnapToItem}
            />
            {currentIndex >= 0 && currentIndex < slides.length - 1 && (
                <Button
                    onPress={() => {
                        ref.current?.next();
                    }}
                    body={t("const.nextButton")}
                    buttonStyle={{
                        position: "absolute",
                        bottom: bottom + 15,
                        right: 10
                    }}
                />
            )}
            {currentIndex > 0 && (
                <Button
                    onPress={() => ref.current?.prev()}
                    body={t("const.prevButton")}
                    buttonStyle={{
                        position: "absolute",
                        bottom: bottom + 15,
                        left: 10
                    }}
                />
            )}
            {currentIndex >= slides.length - 1 && (
                <Button
                    onPress={handleStart}
                    body={t("const.doneButton")}
                    buttonStyle={{
                        position: "absolute",
                        bottom: bottom + 15,
                        right: 10,
                        backgroundColor: "#71d975"
                    }}
                />
            )}
        </View>
    );
};

export default Introduction;
