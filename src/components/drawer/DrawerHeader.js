import React from "react";
import { View, Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ToggleLang from "../intro/ToggleLang";
import { useTheme } from "@react-navigation/native";
import styles from "./styles/DrawerHeader.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLanguage } from "../../reducers/lang/languageSlice";
import useStyleDirection from "../../hooks/useStyleDirection";
const DrawerHeader = props => {
    let { colors } = useTheme();
    let isRTL = useStyleDirection();
    let { top } = useSafeAreaInsets();
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.card,
                paddingTop: top + 5,
                flexDirection: isRTL ? "row-reverse" : "row"
            }}
        >
            <View style={[styles.toggle]}>
                <Pressable onPress={props.navigation.openDrawer}>
                    <FontAwesome
                        name="bars"
                        style={{
                            fontSize: 30,
                            color: colors.text
                        }}
                    />
                </Pressable>
            </View>
            <View style={[styles.toggle]}>
                <ToggleLang
                    onPress={props.toggleLanguage}
                    styles={{
                        position: "relative",
                        left: 0,
                        right: 0,
                        top: 0,
                        width: 50,
                        height: 50
                    }}
                    imageStyle={{
                        width: "120%",
                        height: "120%"
                    }}
                />
            </View>
        </View>
    );
};
export default DrawerHeader;
